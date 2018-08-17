import questions from '../models/questionsModels';


exports.getAllQuestions = (req, res) => {
  res.status(200).send(questions);
};
