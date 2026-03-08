import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const dataPath = path.join(process.cwd(), 'world-state.json');

  if (req.method === 'GET') {
    const json = fs.readFileSync(dataPath, 'utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    return res.status(200).json(JSON.parse(json));
  }

  if (req.method === 'POST') {
    const state = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const { regionId, result, progress, goal } = req.body || {};
    if (!regionId || !result) return res.status(400).json({ ok: false });

    if (state.activeBattle?.regionId === regionId) {
      state.activeBattle.progress = progress ?? state.activeBattle.progress;
      state.activeBattle.goal = goal ?? state.activeBattle.goal;
      state.activeBattle.status = result === 'success' ? 'secured' : 'failed';
    }

    state.regions = state.regions.map((region) =>
      region.id === regionId
        ? { ...region, owner: result === 'success' ? 'watch' : 'red', status: state.activeBattle.status }
        : region
    );

    fs.writeFileSync(dataPath, JSON.stringify(state, null, 2), 'utf-8');
    return res.status(200).json({ ok: true });
  }

  res.status(405).end();
}
