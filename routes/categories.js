const express = require('express');
const router = express.Router();

const Category = require('../models/Category');

router.get('/', async (req, res) => {
   try {
      const categories = await Category.find();
      res.json(categories);
   } catch (err) {
      res.send('Error ' + err);
   }
});

module.exports = router;
