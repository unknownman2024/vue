export default async function handler(req, res) {
  try {
    const targetPath = req.query.path;

    if (!targetPath) {
      return res.status(400).json({ error: 'Missing path parameter' });
    }

    const url = `https://myvue.com/api/microservice/${targetPath}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'application/json'
      }
    });

    const text = await response.text();

    res.status(response.status);
    res.setHeader('Content-Type', 'application/json');
    res.send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
