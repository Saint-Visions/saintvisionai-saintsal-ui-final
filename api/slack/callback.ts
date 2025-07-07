// api/slack/callback.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

      // Handle Slack Event Subscription challenge
      if (body?.type === 'url_verification') {
        return res.status(200).json({ challenge: body.challenge });
      }

      // Optionally handle other Slack events here later...

      return res.status(200).send('OK');
    } catch (err) {
      console.error('Slack verification failed:', err);
      return res.status(500).send('Verification error');
    }
  }

  return res.status(405).send('Method Not Allowed');
}
