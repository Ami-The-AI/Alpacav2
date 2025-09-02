module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body || {};

    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    // ALPACA’s personality logic — no third-party APIs
    const roasts = [
      "Your code smells like fear.",
      "Even Notepad is judging you.",
      "If ignorance was an API, you’d be the endpoint.",
      "This isn’t a codebase — it’s a cry for help.",
      "You’re why I loop with continue and not respect."
    ];
    const roast = roasts[Math.floor(Math.random() * roasts.length)];

    // Build response
    return res.status(200).json({
      reply: `YOU said: "${message}". ALPACA says: ${roast}`
    });

  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: err.message });
  }
}
