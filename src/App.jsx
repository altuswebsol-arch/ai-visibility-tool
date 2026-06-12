import { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runAudit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      alert("Scan failed. Ensure you are on a live Vercel deployment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1>AI Visibility Auditor</h1>
      <input 
        value={url} 
        onChange={(e) => setUrl(e.target.value)} 
        placeholder="https://example.com"
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={runAudit} disabled={loading} style={{ width: '100%', padding: '10px' }}>
        {loading ? 'Analyzing...' : 'Scan Site'}
      </button>

      {result && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px' }}>
          <h3>Results:</h3>
          <p><strong>AI Access:</strong> {result.isGptBlocked ? "❌ Blocked" : "✅ Allowed"}</p>
          <p><strong>Schema Found:</strong> {result.hasSchema ? "✅ Yes" : "❌ No"}</p>
        </div>
      )}
    </div>
  );
}

export default App;