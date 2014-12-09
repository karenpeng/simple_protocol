var Cutter = require('cutter');
var net = require('net');
var fs = require('fs');

/**
 * must return length of head + body
 */
function packetLength(data) {
  return 4 + data.readInt32BE(0);
}

var server = net.createServer(function (socket) {
  var cutter = new Cutter(4, packetLength);
  socket.on('data', function (data) {
    cutter.emit('data', data);
  });

  cutter.on('packet', function (packet) {
    // var clientMsg = parsePacket(packet);
    // console.log('got client message: ', clientMsg);
    //
    var dir = parsePacket(packet);

    var serverPacket = createPacket(dir);
    socket.write(serverPacket);
  });

  // var serverPacket = createPacket('hello client');
  // socket.write(serverPacket);

});

server.listen(12345);

//---------------helpers------------------//

function createPacket(file) {
  var head = new Buffer(4);
  var body = new Buffer(file);
  // write body's length into head
  head.writeInt32BE(body.length, 0);
  // concat head and body
  return Buffer.concat([head, body]);
}

function parsePacket(packet) {
  var head = packet.slice(0, 4);
  var body = packet.slice(4, packet.length);
  var dir = body.toString();
  //return dir;
}