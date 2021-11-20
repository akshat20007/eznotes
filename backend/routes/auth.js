 const express = require('express');
 const router = express.Router();
 const User = require('../models/user');
 const { body, validationResult } = require('express-validator');


//create a user using: POST "/api/auth/". Doesn't require auth
 router.post('/',[body('email','Enter a valid email').isEmail(),body('name','Enter a valid name').isLength({ min: 5 }),  body('password','Enter a valid password').isLength({ min: 5 })], (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).then(user => res.json(user))
      .catch(err=>console.log(err));
     
     
 }) 

 module.exports = router;