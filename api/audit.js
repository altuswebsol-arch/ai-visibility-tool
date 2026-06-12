// api/audit.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });

  const { url } = req.body;
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // Server-side logic to detect AI blocking
    const isGptBlocked = html.includes('GPTBot') || html.includes('OAI-SearchBot');
    const hasSchema = html.includes('application/ld+json');
    
    res.status(200).json({ isGptBlocked, hasSchema });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch website" });
  }
}