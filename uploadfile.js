const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.method.toLowerCase() === 'get') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h2>Upload a File</h2>
      <form action="/" method="post" enctype="multipart/form-data">
        <input type="file" name="fileupload"><br><br>
        <input type="submit" value="Upload">
      </form>
    `);
  } else if (req.method.toLowerCase() === 'post') {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(__dirname, 'uploads'),
      keepExtensions: true,
      multiples: false,  // Ensure only one file can be uploaded
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Parse error:", err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Error during file upload');
      }

      console.log("FILES:", files);
      console.log("FIELDS:", fields);

      // Get the uploaded file from the fileupload array (Formidable v3+)
      const fileArray = files.fileupload;
      const file = Array.isArray(fileArray) ? fileArray[0] : fileArray;

      // Check if the file is uploaded properly
      if (!file || !file.filepath) {
        console.log("NO FILE DETECTED:", file);
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('No file uploaded or file missing');
      }

      // Renaming the uploaded file to avoid conflicts
      const oldPath = file.filepath;
      const originalName = file.originalFilename || file.newFilename || 'uploaded_file';
      const newPath = path.join(__dirname, 'uploads', originalName);

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error("Rename error:", err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Error saving file');
        }

        // Respond with the success message
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<h3>✅ File uploaded as: ${originalName}</h3>`);
      });
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});