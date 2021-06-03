const net = require("net");
const fs = require('fs');
let client;

const handleRequest = function(request) {
  const fileName = request.split(": ")[1];

  fs.readFile(`./${fileName}`, 'utf8' , (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    client.write(data);
    console.log("Request Handled");
  });
};

const serverStart = function() {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();
  stdin.on("data", (key) => {
    if (key === '\u0003') {
      console.log("Quitting");
      process.exit();
    }
  });

  const server = net.createServer();

  server.listen(3000, () => {
    console.log("SERVER LISTENING...");
  });

  server.on("connection", (x) => {
    console.log("user connected");
    client = x;
    x.setEncoding('utf8');
    x.on("data", handleRequest);
  });
};

serverStart();