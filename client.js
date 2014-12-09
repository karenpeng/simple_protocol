var Cutter = require('cutter');
var net = require('net');

/**
 * must return length of head + body
 */
function packetLength(data) {
  return 8 + data.readInt32BE(0);
}

var cutter = new Cutter(4, packetLength);
cutter.on('packet', function (packet) {
  var serverMsg = parsePacket(packet);
  console.log(serverMsg.error, serverMsg.content);
  // if (serverMsg.error === "1") {
  //   console.log('error (ಥ_ಥ)');
  // } else {
  //   console.log('got server message: ', serverMsg.content);
  // }
});

var client = net.connect({
  port: 12345
});
client.on('data', function (data) {
  cutter.emit('data', data);
});

client.on('end', function () {
  console.log('client disconnected');
});

var clientPacket = createPacket('index.html');
client.write(clientPacket);
// var clientPacket = createPacket('hello server');
// client.write(clientPacket);

// var clientPacket = createPacket('hello server again');
// client.write(clientPacket);

// var clientPacket = createPacket('hello server and again');
// client.write(clientPacket);

// var clientPacket = createPacket('hello server over and over again');
// client.write(clientPacket);

//---------------helpers------------------//

function createPacket(dir) {
  //four is because body.length is an integer so takes up 4 bytes
  var head = new Buffer(4);
  var body = new Buffer(dir);
  // write body's length into head
  head.writeInt32BE(body.length, 0);
  // concat head and body
  return Buffer.concat([head, body]);
}

function parsePacket(packet) {
  var head = packet.slice(0, 4);
  var error = packet.slice(4, 8);
  console.log(error.toString());
  var body = packet.slice(8, packet.length);
  var response = {
    "error": error.toString(),
    "content": body.toString()
  };
  return response;
}