import express from 'express';
import { randomBytes } from 'crypto';
import { contentSecurityPolicy } from 'helmet';
import exphbs from 'express-handlebars';

const app = express();

// Handlebars setup
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Nonce middleware
function nonceMiddleware(_, res, next) {
  res.locals.nonce = randomBytes(16).toString('base64');
  next();
}

app.use(nonceMiddleware);

// CSP setup with helmet
app.use(
  contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", (_, res) => `'nonce-${res.locals.nonce}'`],
      // Add other directives as needed
    },
  }),
);

// Example route
app.get('/', (_, res) => {
  res.render('page', { nonce: res.locals.nonce });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
