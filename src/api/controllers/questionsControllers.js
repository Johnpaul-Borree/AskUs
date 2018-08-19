import Joi from 'joi';

import { questions } from '../models/questionsModels';

function validateQuestion(question) {
  const schema = {
    questionBy: Joi.string().min(3).required(),
    AddedOn: Joi.string().isoDate().required(),
    question: Joi.string().min(5).required(),
    Topics: Joi.array().items(Joi.string().required()),
  };

  return Joi.validate(question, schema);
}

function validateAnswer(question) {
  const schema = {
    answeredBy: Joi.string().min(3).required(),
    AddedOn: Joi.string().isoDate().required(),
    Answer: Joi.string().min(5).required(),
  };

  return Joi.validate(question, schema);
}


exports.getAllQuestions = (req, res) => {
  res.status(200).send(questions);
};

exports.getQuestionById = (req, res) => {
  const question = questions.find(g => g.id === parseInt(req.params.questionId));
  if (!question) return res.status(404).send('There is no question with the given id');
  res.send(question);
};

exports.createQuestion = (req, res) => {
  const { error } = validateQuestion(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const question = {
    id: questions.length + 1,
    questionBy: req.body.questionBy,
    AddedOn: req.body.AddedOn,
    question: req.body.question,
    answers: '0 answers',
    Topics: req.body.Topics,
    answersGiven: [],
  };

  questions.push(question);

  res.send(question);
};

exports.answerQuestion = (req, res) => {

  const question = questions.find(g => g.id === parseInt(req.params.questionId));
  if (!question) return res.status(404).send('There is no question with the given id');

  const { error } = validateAnswer(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const answer = {
    id: question.answersGiven.length + 1,
    answeredBy: req.body.answeredBy,
    AddedOn: req.body.AddedOn,
    Answer: req.body.Answer,
  };

  question.answersGiven.push(answer);

  res.send(question);
};
