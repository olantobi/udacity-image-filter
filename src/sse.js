const express = require('express');
const compression = require('compression');

const app = express();
const PORT = 9000;


//compress responses
app.use(compression())

// Server-sent event stream
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  // send a ping approx every 2 seconds
  const timer = setInterval(() => {
    res.write('data: ping\n\n');

    // !!! this is the important part
    res.flush();
  }, 2000);

  res.on('close', () => clearInterval(timer));
});

 // Root URI call
 app.get("/", async (req, res) => {
  res.send("This is the landing page");
});

 // Root URI call
 app.get("/public", async (req, res) => {
  res.json({message: "This is another public page" });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));