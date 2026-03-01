import axios from 'axios';

export default async function handler(req, res) {
  try {
    const path = req.query.path;

    if (!path) {
      return res.status(400).json({ error: 'Missing path parameter' });
    }

    const targetUrl =
      'https://myvue.com/api/microservice/' +
      path.replace(/^\/+/, '');

    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'application/json'
      },
      timeout: 30000,
      validateStatus: () => true
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message });
  }
}
