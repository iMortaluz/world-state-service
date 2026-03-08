import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '..', 'world-state.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    const json = fs.readFileSync(dataPath, 'utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    return res.status(200).json(JSON.parse(json));
  }
  res.status(405).end();
}
