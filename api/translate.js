export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { q, source, target } = req.body;

  if (!q || !source || !target) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // If you have an API key, you can pass it here:
        // 'Authorization': 'Bearer YOUR_KEY'
      },
      body: JSON.stringify({
        q,
        source,
        target,
        format: 'text'
      })
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("LibreTranslate error:", errorDetails);
      return res.status(500).json({ error: 'LibreTranslate API error' });
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error("Server crashed:", error.message);
    res.status(500).json({ error: 'Server crashed during translation' });
  }
}
