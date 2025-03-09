export default function cors(req, res, next) {
  return new Promise((resolve, reject) => {
    const allowedOrigins = [
      'https://flama.ir',
      'http://flama.ir',
      'http://localhost:3000'
    ];
    
    const origin = (req.headers.origin || req.headers.referer || '').trim();

    console.log('Request Origin:', origin);

    if (origin && allowedOrigins.some(allowedOrigin => origin.startsWith(allowedOrigin))) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-secret-key');

      if (req.method === 'OPTIONS') {
        res.status(200).end();
        resolve();
      } else {
        resolve(next());
      }
    } else {
      console.log('Forbidden Origin:', origin);
      res.status(403).json({ error: 'Forbidden' });
      reject(new Error('Forbidden Origin'));
    }
  });
}
