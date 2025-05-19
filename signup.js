const http = require('http');
const qs = require('querystring');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const connection = require('./connection');
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/signup.css') {
    const filePath = path.join(__dirname, 'public', 'signup.css');
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
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <head><link rel="stylesheet" href="/signup.css" /></head>
      <h2>Signup Form</h2>
      <form method="POST" action="/">
        Username: <input type="text" name="username" required /><br><br>
        Email: <input type="email" name="email" required /><br><br>
        Password: <input type="password" name="password" required /><br><br>
        <input type="submit" value="Sign Up" />
      </form>
    `);
  } else if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const parsed = qs.parse(body);
      const username = parsed.username;
      const email = parsed.email;
      const password = parsed.password;

      if (!username || !email || !password) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('Missing username, email, or password');
      }

      const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      connection.query(sql, [username, email, password], (err, result) => {
        if (err) {
          console.error('Insert error:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Error saving user');
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<h3> Signup successful for user: ${username}</h3>`);
      });
    });
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});