'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _questionsControllers = require('../controllers/questionsControllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// GET /questions
router.get('/questions', _questionsControllers.getAllQuestions);

// GET /questions/<questionId>
router.get('/questions/:questionId', _questionsControllers.getQuestionById);

// POST /questions
router.post('/questions', _questionsControllers.createQuestion);

// POST /questions/<questionId>/answers
router.post('/questions/:questionId/answers', _questionsControllers.answerQuestion);

exports.default = router;
//# sourceMappingURL=questions.js.map