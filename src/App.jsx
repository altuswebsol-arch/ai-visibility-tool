import { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runAudit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      alert("Scan failed.");
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

      {/* Unified Result Display */}
      {result && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px' }}>
          <h3>Audit Results:</h3>
          
          {/* Mapping through the new broader bot list */}
          {result.scanResults && result.scanResults.map((bot, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              <strong>{bot.name}:</strong> 
              <span style={{ marginLeft: '10px' }}>
                {bot.isBlocked ? "❌ Blocked" : "✅ Allowed"}
              </span>
            </div>
          ))}

          {/* Legacy fields (if your backend still returns these) */}
          {result.isGptBlocked !== undefined && (
            <p><strong>Legacy GPT Check:</strong> {result.isGptBlocked ? "❌ Blocked" : "✅ Allowed"}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;