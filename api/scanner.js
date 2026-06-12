// api/scanner.js
export default async function handler(req, res) {
  const { url } = req.body;
  
  try {
    // This runs on the server, NOT in the browser, so it ignores CORS
    const response = await fetch(url);
    const html = await response.text();
    
    // Perform your logic here
    const isGptBlocked = html.includes('GPTBot');
    
    res.status(200).json({ isGptBlocked });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
}