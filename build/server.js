'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _questions = require('./api/routes/questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));
app.use('/api/v1/', _questions2.default);

app.set('json spaces', 40);

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('listening on port ' + port);
});

exports.default = app;
//# sourceMappingURL=server.js.map