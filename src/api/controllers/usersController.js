import express from 'express';
import jwt from 'jsonwebtoken';
import validator from '../../middleware/validations/validator';
import User from '../models/users';


const router = express.Router();

// signup route
router.post('/signup', validator.singUp, (req, res) => {
  const errors = validator.validationResult(req);

  if (errors.isEmpty()) {
    const user = new User();
    user.checkUserExistBefore(req.body)
      .then((emailExists) => {
        if (!emailExists) { // Email doesn't exist so signup user;
          user.signup()
            .then((userId) => {
              const payload = { userId };
              const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1hr' });
              res.status(200).json(
                {
                  status: 'success',
                  token,
                  message: 'Account created Successfully',
                },
              );
            })
            .catch(() => {
              res.status(500).json({ status: 'failed', message: 'Problem signing up' });
            });
        } else {
          res.status(422).json({ status: 'failed', message: 'email exist', email: emailExists.email });
        }
      });
  } else {
    res.status(400).json({ status: 'failed', message: errors.array()[0].msg });
  }
});


// login route
router.post('/login', validator.login, (req, res) => {
  const errors = validator.validationResult(req);
  if (errors.isEmpty()) {
    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.login()
      .then((result) => {
        switch (result.code) {
          case 2:
            {
              const payload = {
                userId: result.id,
              };
              const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1hr' });
              res.status(200).json({ status: 'success', message: 'You are logged in!', token });
            }
            break;
          default:
            res.status(401).json({ status: 'failed', message: 'invalid Email or Password' });
        }
      })
      .catch(() => {
        res.status(500).json({ status: 'failed', message: 'internal server error' });
      });
  } else {
    res.status(400).json({ status: 'failed', message: errors.array()[0].msg });
  }
});

// Update account
router.put('/users/:userId', (req, res) => {
  const user = new User();
  user.updateUser(req.params.userId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ status: 'failed', message: 'There is no user with the given id' });
      }
      return res.status(200).json({ status: 'success', message: 'account updated successfully', result });
    })
    .catch(() => {
      res.status(500).json({ status: 'failed', message: 'internal server error' });
    });
});

export default router;
