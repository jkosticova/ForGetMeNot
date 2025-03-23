var express = require('express');
const Tag = require("../models/tag");
var tagsRouter = express.Router();

/* GET users listing. */

tagsRouter.get('/', async function(req, res) {
  try {
    const tags = await Tag.findAll();
    const tagsJson = tags.map(tags => tags.toJSON()).map(tags => tags.tag_name);

    res.json(tagsJson);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = tagsRouter;
