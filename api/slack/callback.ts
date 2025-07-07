// api/slack/callback.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST' && req.headers['content-type']?.includes('application/json')) {
    try {
      const body = req.body;

      // ✅ Handle Slack Event Subscription Challenge
      if (body?.type === 'url_verification' && body.challenge) {
        return res.status(200).json({ challenge: body.challenge });
      }

      // 🧠 Log any incoming events for now
      console.log('🧠 Slack Event Received:', JSON.stringify(body, null, 2));

      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error('❌ Error handling Slack event:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Handle Slack OAuth (fallback for GET)
  const { code, state, error } = req.query;

  if (error) {
    console.error('Slack OAuth Error:', error);
    return res.status(400).send('Slack OAuth Error: Access denied.');
  }

  console.log('✅ Slack OAuth Success:', { code, state });

  return res.status(200).send(`
    <html style="background:black;color:white;">
      <body style="display:flex;align-items:center;justify-content:center;height:100vh;">
        <div>
          <h1>✅ SAINTSAL™ is Connected to Slack</h1>
          <p>You may now close this window.</p>
        </div>
      </body>
    </html>
  `);
}
