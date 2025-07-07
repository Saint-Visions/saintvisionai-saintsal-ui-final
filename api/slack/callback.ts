import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 🔁 Respond to Slack URL verification (event subscription challenge)
  if (req.method === 'POST' && req.body?.type === 'url_verification') {
    return res.status(200).json({ challenge: req.body.challenge });
  }

  // 👇 You can expand this later to handle actual events like message.created
  return res.status(200).send('Slack callback received.');
}
