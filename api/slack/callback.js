export default function handler(req, res) {
  if (req.body?.type === 'url_verification') {
    return res.status(200).send(req.body.challenge); // 🔥 EXACTLY what Slack needs
  }

  return res.status(200).send('OK');
}
