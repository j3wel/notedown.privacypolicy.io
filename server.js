const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
};

function resolveRequestPath(requestUrl) {
  const [pathname] = requestUrl.split('?');
  if (pathname === '/' || pathname === '') {
    return path.join(__dirname, 'index.html');
  }

  const decodedPathname = decodeURIComponent(pathname);
  const normalizedPath = path.normalize(decodedPathname).replace(/^([\\/])+/, '');
  const absolutePath = path.join(__dirname, normalizedPath);
  const baseDir = path.join(__dirname);

  if (!absolutePath.startsWith(baseDir)) {
    return null;
  }

  return absolutePath;
}

function sendError(res, statusCode, message) {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(message);
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    sendError(res, 405, 'Method Not Allowed');
    return;
  }

  const absolutePath = resolveRequestPath(req.url);
  if (!absolutePath) {
    sendError(res, 403, 'Forbidden');
    return;
  }

  fs.stat(absolutePath, (err, stats) => {
    if (err || !stats.isFile()) {
      sendError(res, 404, 'Not Found');
      return;
    }

    const ext = path.extname(absolutePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });

    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    const stream = fs.createReadStream(absolutePath);
    stream.pipe(res);
    stream.on('error', () => {
      sendError(res, 500, 'Internal Server Error');
    });
  });
});

if (require.main === module) {
  const port = Number(process.env.PORT) || 4173;
  server.listen(port, () => {
    console.log(`Privacy policy available at http://localhost:${port}`);
  });
}

module.exports = server;
