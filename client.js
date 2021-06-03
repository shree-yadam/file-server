const net = require("net");
const readline = require('readline');

let fileName = "file1.txt";
const clientStart = function() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Which file you want to request? ', (answer) => {
    fileName = answer;
    const conn = net.createConnection({ port: 3000, host: 'localhost' }, () => {
      console.log("connected to server");
    });
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
    conn.setEncoding('utf8');

    conn.on('connect', () => {
      conn.write(`Get: ${fileName}`);
    });

    conn.on('data', (data) => {
      console.log("Data Received: ");
      console.log(data);
      conn.end();
      process.exit;
    });

    rl.close();
  });
};

clientStart();