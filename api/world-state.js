import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const json = fs.readFileSync(path.join(process.cwd(), 'world-state.json'), 'utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    return res.status(200).json(JSON.parse(json));
  }
  res.status(405).end();
}
