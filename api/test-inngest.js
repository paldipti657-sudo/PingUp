export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Inngest route working',
    method: req.method,
    path: req.url,
    timestamp: new Date().toISOString()
  });
}
