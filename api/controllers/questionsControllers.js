const questions = [
  {
    id: 1,
    questionBy: 'Mikel Newmann',
    AddedOn: new Date('December 17, 2016 03:24:00'),
    question: 'How do I add External Javascript to html',
    answers: '1820 Answers',
    Topics: ['html', 'javascript'],
  },

  {
    id: 2,
    questionBy: 'John Cena',
    AddedOn: new Date('January 17, 2018 03:24:00'),
    question: 'How to use Modal in javascript',
    answers: '120 Answers',
    Topics: ['html', 'javascript', 'css3'],
  },

  {
    id: 3,
    questionBy: 'Linda Ifechinyere',
    AddedOn: new Date('March 07, 2018 03:24:00'),
    question: 'How can I reset password on XAMPP',
    answers: '90 Answers',
    Topics: ['PHP', 'MySql', 'XAMPP'],
  },

  {
    id: 4,
    questionBy: 'Mr. Jude',
    AddedOn: new Date('December 19, 2017 03:24:00'),
    question: 'How to create pointer border with css3',
    answers: '182 Answers',
    Topics: ['html5', 'css3'],
  },

  {
    id: 5,
    questionBy: 'Vivian Agbo',
    AddedOn: new Date('December 21, 2016 03:24:00'),
    question: 'How do I use stored procedures in code first ASP.Net',
    answers: '420 Answers',
    Topics: ['ASP,Net MVC5', 'Entity Framework', 'Code First'],
  },

];

exports.getAllQuestions = (req, res) => {
  res.status(400).send(questions);
};
