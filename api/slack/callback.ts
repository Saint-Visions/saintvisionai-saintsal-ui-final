// api/slack/callback.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle Slack event subscription challenge
  if (req.method === 'POST' && req.body?.type === 'url_verification') {
    return res.status(200).json({ challenge: req.body.challenge });
  }

  // Optional: Log normal OAuth flow or error fallback
  const { code, state, error } = req.query;

  if (error) {
    console.error("Slack OAuth Error:", error);
    return res.status(400).send("Slack OAuth Error: Access denied.");
  }

  console.log("✅ Slack OAuth Success:", { code, state });

  return res.status(200).send(`
    <html style="background:black;color:white;font-family:sans-serif;">
      <body style="display:flex;align-items:center;justify-content:center;height:100vh;text-align:center;">
        <div>
          <h1>✅ SAINTSAL™ is Connected to Slack</h1>
          <p>You may now close this window.</p>
        </div>
      </body>
    </html>
  `);
}
// api/slack/callback.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state, error } = req.query;

  if (error) {
    console.error("Slack OAuth Error:", error);
    return res.status(400).send("Slack OAuth Error: Access was denied.");
  }

  console.log("Slack OAuth Success:", { code, state });

  return res.status(200).send(`
    <html style="background:black;color:white;font-family:sans-serif;">
      <body style="display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;">
        <h1>✅ SAINTSAL™ is Connected to Slack</h1>
        <p>You may now close this window.</p>
      </body>
    </html>
  `);
}
