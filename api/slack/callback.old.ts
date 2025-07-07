import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Slack event subscription verification
  if (req.method === 'POST' && req.body?.type === 'url_verification') {
    const challenge = req.body.challenge;
    return res.status(200).json({ challenge });
  }

  // Optional: fallback if other request types come in
  return res.status(200).send('Slack callback received.');
}
