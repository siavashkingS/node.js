const http = require('http');
const qs = require('querystring');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const connection = require('./connection');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/signin.css') {
        const filePath = path.join(__dirname, 'public', 'signin.css');
        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.writeHead(500);
            return res.end('Error loading CSS');
          }
          res.writeHead(200, { 'Content-Type': 'text/css' });
          res.end(data);
        });
        return;
      }
    if (req.method === 'GET' && req.url === '/signin.css') {
  const filePath = path.join(__dirname, 'public', 'signin.css');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading CSS');
    }
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end(data);
  });
  return;
}
  if (req.method === 'GET') {
    // Show sign in form
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <head><link rel="stylesheet" href="/signin.css" /></head>
      <h2>Sign In</h2>
      <form method="POST" action="/">
        Email or Username: <input type="text" name="identifier" required /><br><br>
        Password: <input type="password" name="password" required /><br><br>
        <input type="submit" value="Sign In" />
      </form>
    `);
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      const { identifier, password } = qs.parse(body);

      if (!identifier || !password) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('Missing email/username or password');
      }

      // Check user in database by email or username
      const sql = 'SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ? LIMIT 1';
      connection.query(sql, [identifier, identifier, password], (err, results) => {
        if (err) {
          console.error('Query error:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Server error');
        }

        if (results.length === 1) {
          const user = results[0];
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`<h3> Welcome back, ${user.username}!</h3>`);
        } else {
          res.writeHead(401, { 'Content-Type': 'text/html' });
          res.end(`<h3> Invalid credentials. Try again.</h3><a href="/">Back to Sign In</a>`);
        }
      });
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3001, () => {
  console.log('Sign In server running at http://localhost:3001');
});