import React, { useState } from 'react';

export default function Urlshortner() {
  const [originalurl, setOriginalurl] = useState('');
  const [shorturl, setShorturl] = useState('');
  const [error, setError] = useState('');

  const handleShortUrl = async () => {
    setError('');
    setShorturl('');
    if (!originalurl) {
      setError('Please enter a URL');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/shortener', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalurl }),
      });
      const data = await res.json();
      if (res.ok) {
        setShorturl(data.shorturl);
      } else {
        setError(data.error || 'Failed to shorten the URL');
      }
    } catch {
      setError('You are having error');
    }
  };

  return (
    <div style={{maxWidth: 400, margin: '50px auto', fontFamily: 'Arial, sans-serif' , border:"2px solid white", padding:50,backgroundColor:"lightskyblue",borderRadius:30,color:"white",textAlign:'center'
    }}>
      <h2>URL Shortener</h2>
      <input
        type="text"
        placeholder="Enter URL here"
        value={originalurl}
        onChange={(e) => setOriginalurl(e.target.value)}
        style={{ width: '100%', padding: '8px', fontSize: '1rem' }}
      />
      <button onClick={handleShortUrl} style={{ marginTop: 15, padding: '8px 12px' , backgroundColor:"green", color:"white",borderRadius:30}}>
        Shorten URL
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {shorturl && (
        <p>
          Short URL:{' '}
          <a href={shorturl} target="_blank" rel="noopener noreferrer">
            {shorturl}
          </a>
        </p>
      )}
    </div>
  );
}



