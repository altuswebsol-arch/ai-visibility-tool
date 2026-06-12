// api/audit.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const response = await fetch(url);
    const html = await response.text();

    // The logic to check for AI visibility
    const results = {
      isGptBlocked: html.includes('GPTBot') || html.includes('OAI-SearchBot'),
      hasSchema: html.includes('application/ld+json')
    };

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch website content." });
  }
}