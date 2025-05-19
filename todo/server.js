const http = require('http');
const qs = require('querystring');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const connection = require('./connection');
connection.query(`
CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE
)`);
function renderHTML(todos) {
  const list = todos.map(todo => `
    <li>
      <span class="${todo.completed ? 'completed' : ''}">${todo.title}</span>
      <div class="actions">
        <a href="/complete?id=${todo.id}" class="btn complete">Complete</a>
        <a href="/delete?id=${todo.id}" class="btn delete">Delete</a>
      </div>
    </li>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
  <title>Todo List</title>
  <link rel="stylesheet" href="/style.css" />
</head>
    <body>
      <h2> My Todo List</h2>
      <form method="POST" action="/add">
        <input type="text" name="title" placeholder="Enter task" required />
        <input type="submit" value="Add" />
      </form>
      <ul>${list}</ul>
    </body>
    </html>
  `;
}
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/style.css') {
    const filePath = path.join(__dirname, 'public', 'style.css');
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
  if (req.method === 'GET' && req.url === '/') {
    connection.query('SELECT * FROM todos', (err, results) => {
      if (err) {
        res.writeHead(500);
        return res.end('Database error');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(renderHTML(results));
    });

  } else if (req.method === 'POST' && req.url === '/add') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      const { title } = qs.parse(body);
      connection.query('INSERT INTO todos (title) VALUES (?)', [title], (err) => {
        if (err) {
          res.writeHead(500);
          return res.end('Insert error');
        }
        res.writeHead(302, { Location: '/' });
        res.end();
      });
    });

  } else if (req.method === 'GET' && req.url.startsWith('/complete')) {
    const id = new URL(req.url, `http://${req.headers.host}`).searchParams.get('id');
    connection.query('UPDATE todos SET completed = 1 WHERE id = ?', [id], (err) => {
      res.writeHead(302, { Location: '/' });
      res.end();
    });

  } else if (req.method === 'GET' && req.url.startsWith('/delete')) {
    const id = new URL(req.url, `http://${req.headers.host}`).searchParams.get('id');
    connection.query('DELETE FROM todos WHERE id = ?', [id], (err) => {
      res.writeHead(302, { Location: '/' });
      res.end();
    });

  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Todo server running at http://localhost:3000');
});