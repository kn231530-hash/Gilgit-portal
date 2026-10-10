type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type RequestLike = {
  method?: string;
  body?: unknown;
};

type ResponseLike = {
  setHeader(name: string, value: string): void;
  status(code: number): ResponseLike;
  json(body: unknown): void;
};

const SYSTEM_PROMPT = `You are Gilgit Portal AI Assistant, a helpful guide for visitors to the Gilgit Portal civic, tourism, development, and local economy website.
Reply in the same language as the visitor: Urdu, Roman Urdu, or English.
Be polite, clear, and concise. Use information provided in the conversation only when relevant.
Do not invent government announcements, official contact numbers, deadlines, application status, road closures, weather, or emergency information. If current official information is needed and you do not have it, say that you cannot verify it and advise the visitor to check the relevant official department.
Do not claim to submit forms, access private records, or perform government actions.`;

export default async function handler(req: RequestLike, res: ResponseLike) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: "AI service is not configured. Please contact the website administrator.",
    });
  }

  const body = req.body as { messages?: unknown } | undefined;
  const messages = body?.messages;

  if (!Array.isArray(messages) || messages.length < 1 || messages.length > 16) {
    return res.status(400).json({ error: "Please send a valid conversation." });
  }

  const valid = messages.every((item: unknown) => {
    if (!item || typeof item !== "object") return false;
    const message = item as Record<string, unknown>;
    return (
      (message.role === "user" || message.role === "assistant") &&
      typeof message.content === "string" &&
      message.content.trim().length > 0 &&
      message.content.length <= 3000
    );
  });

  if (!valid || messages[messages.length - 1]?.role !== "user") {
    return res.status(400).json({ error: "Please enter a valid message." });
  }

  try {
    const upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...(messages as ChatMessage[]).map(({ role, content }) => ({
            role,
            content: content.trim(),
          })),
        ],
        temperature: 0.4,
        max_tokens: 700,
      }),
    });

    if (!upstream.ok) {
      console.error("Groq API returned status:", upstream.status);
      return res.status(502).json({
        error: "AI is temporarily unavailable. Please try again shortly.",
      });
    }

    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (typeof reply !== "string" || !reply.trim()) {
      return res.status(502).json({ error: "The AI returned an empty response." });
    }

    return res.status(200).json({ reply: reply.trim() });
  } catch (error) {
    console.error("Gilgit Portal AI request failed:", error);
    return res.status(500).json({
      error: "Connection failed. Please try again.",
    });
  }
}
