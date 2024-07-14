import express from 'express';
import cookieParse from 'cookie-parser';
import { randomUUID as uuid } from 'node:crypto';

const app = express();
const port = 3009;

app.use(cookieParse());

app.use(function (req, res, next) {
  res.header('Access-control-Allow-Origin', req.header('Origin'));
  res.header('Access-control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accepet');
  req.header('Access-control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
  next();
});

app.get('/api', (_, res) => {
  res.end(`Hello! ${uuid()}`);
});

app.get('/api/set-cookie', (_, res) => {
  res.cookie('session', uuid(), {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60, // ms
    sameSite: 'none',
    domain: 'cookies-http-only.vercel.app',
  });
  res.end('cookie set');
});

app.get('/api/get-cookie', (req, res) => {
  res.end(`Session cookie! ${req.cookies.session}`);
});

app.listen(port, () => {
  console.log(`run in http://127.0.0.1:${port}/api`);
});

export default app;

/* 
create file.crx

You need to pack the app using the following command line:
<path-to-dev-channel-chrome>\chrome.exe --enable-apps --pack-
extension=<path\to\app\folder>

https://groups.google.com/a/chromium.org/g/chromium-apps/c/F4W0bCmYryw
*/
