import { questions } from '../models/questionsModels';


exports.getAllQuestions = (req, res) => {
  res.status(200).send(questions);
};

exports.getQuestionById = (req, res) => {
  const question = questions.find(g => g.id === parseInt(req.params.questionId));
  if (!question) return res.status(404).send('There is no question with the given id');
  res.send(question);
};
