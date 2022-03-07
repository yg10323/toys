const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 4043 });


const clients = [];


wss.on('connection', function connection(ws) {
  clients.push(ws);
  // 监听客户端信息
  ws.on('message', function message(data) {
    console.log('received: %s', data);
    let _data = JSON.parse(data)
    clients.forEach(client => {
      client.send(JSON.stringify(_data));
    })
  });
});