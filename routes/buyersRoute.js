const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const buyer = require('../models/buyerSchema');
const config = require('config');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  console.log(buyer);
  console.log(req.body);
  try {
    const user = await buyer.findOne({ name: req.body.name });
    const salt = await bcrypt.genSalt(10);
    // const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    const data = {
      name: req.body.name,
      aadhar: req.body.aadhar,
      phone: req.body.phone,
      email: req.body.email,
    };
    const newuser = new buyer(data);
    console.log(data, newuser);
    await newuser.save();
    console.log(newuser);
    const token = jwt.sign({ id: newuser._id }, config.get('jwtPrivateKey'));
    res
      .header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token')
      .send(newuser);
  } catch (e) {
    console.log(e);
  }
});

router.get('/', (req, res) => {
  res.render('buyerregister')
})

module.exports = router;
