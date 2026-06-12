// api/audit.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });

  const { url } = req.body;
  try {
    const response = await fetch(url);
    const html = await response.text();

    // Define the AI Engines/Bots we want to track
    const bots = [
      { name: "OpenAI (GPTBot)", id: "GPTBot" },
      { name: "OpenAI (ChatGPT-User)", id: "ChatGPT-User" },
      { name: "Anthropic (Claude)", id: "ClaudeBot" },
      { name: "Google (Gemini)", id: "Google-Extended" },
      { name: "Perplexity", id: "PerplexityBot" },
      { name: "Common Crawl", id: "CCBot" }
    ];

    // Check which ones are found in the HTML/Robots instructions
    const scanResults = bots.map(bot => ({
      name: bot.name,
      // If the bot ID is present, it's blocked (assuming typical robots.txt patterns)
      isBlocked: html.includes(bot.id)
    }));

    res.status(200).json({ scanResults });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch website content." });
  }
}