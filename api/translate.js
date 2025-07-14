export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { q, source, target } = req.body;

  if (!q || !source || !target) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q,
        source,
        target,
        format: "text"
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("Translation API failed:", error);
    return res.status(500).json({ error: "Translation failed" });
  }
}
