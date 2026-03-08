import worldState from '../world-state.json' assert { type: 'json' };

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'no-cache');
    return res.status(200).json(worldState);
  }
  res.status(405).end();
}
