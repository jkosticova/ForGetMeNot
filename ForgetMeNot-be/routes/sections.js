var express = require('express');
const Section = require("../models/section");
var sectionsRouter = express.Router();

/* GET users listing. */

sectionsRouter.get('/', async function(req, res) {
  try {
    const sections = await Section.findAll();
    const sectionsJson = sections.map(section => section.toJSON()).map(section => section.section_name);

    res.json(sectionsJson);
  } catch (error) {
    console.error('Error fetching sections:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = sectionsRouter;
