define(function (require) {
  // Load any app-specific modules
  // with a relative require call,
  // like:

  //code below returns a function
  var messages = require('./messages');

  // Load library/vendor modules using
  // full IDs, like:
  var print = require('print');

  print(messages.getHello());

  // 使用
  // require(["eventproxy"], function (EventProxy) {
  //   // TODO
  //   var ep = new EventProxy();

  // });
  var EventProxy = require('eventproxy');
});