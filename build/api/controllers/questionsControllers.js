'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _questionsModels = require('../models/questionsModels');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateQuestion(question) {
  var schema = {
    questionBy: _joi2.default.string().min(3).required(),
    AddedOn: _joi2.default.string().isoDate().required(),
    question: _joi2.default.string().min(5).required(),
    Topics: _joi2.default.array().items(_joi2.default.string().required())
  };

  return _joi2.default.validate(question, schema);
}

function validateAnswer(question) {
  var schema = {
    answeredBy: _joi2.default.string().min(3).required(),
    AddedOn: _joi2.default.string().isoDate().required(),
    Answer: _joi2.default.string().min(5).required()
  };

  return _joi2.default.validate(question, schema);
}

exports.getAllQuestions = function (req, res) {
  res.status(200).send(_questionsModels.questions);
};

exports.getQuestionById = function (req, res) {
  var question = _questionsModels.questions.find(function (g) {
    return g.id === parseInt(req.params.questionId);
  });
  if (!question) return res.status(404).send('There is no question with the given id');
  res.send(question);
};

exports.createQuestion = function (req, res) {
  var _validateQuestion = validateQuestion(req.body),
      error = _validateQuestion.error;

  if (error) return res.status(400).send(error.details[0].message);

  var question = {
    id: _questionsModels.questions.length + 1,
    questionBy: req.body.questionBy,
    AddedOn: req.body.AddedOn,
    question: req.body.question,
    answers: '0 answers',
    Topics: req.body.Topics,
    answersGiven: []
  };

  _questionsModels.questions.push(question);

  res.send(question);
};

exports.answerQuestion = function (req, res) {

  var question = _questionsModels.questions.find(function (g) {
    return g.id === parseInt(req.params.questionId);
  });
  if (!question) return res.status(404).send('There is no question with the given id');

  var _validateAnswer = validateAnswer(req.body),
      error = _validateAnswer.error;

  if (error) return res.status(400).send(error.details[0].message);

  var answer = {
    id: question.answersGiven.length + 1,
    answeredBy: req.body.answeredBy,
    AddedOn: req.body.AddedOn,
    Answer: req.body.Answer
  };

  question.answersGiven.push(answer);

  res.send(question);
};
//# sourceMappingURL=questionsControllers.js.map