export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { type, challenge } = req.body;

      if (type === 'url_verification' && challenge) {
        // ✅ Exactly what Slack expects
        return res.status(200).send(challenge);
      }

      return res.status(200).send('OK');
    } catch (err) {
      console.error('Slack challenge handler error:', err);
      return res.status(400).send('Invalid request');
    }
  } else {
    return res.status(405).send('Method Not Allowed');
  }
}
