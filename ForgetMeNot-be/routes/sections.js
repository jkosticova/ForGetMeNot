var express = require('express');
const Section = require("../models/section");
var sectionsRouter = express.Router();

/* GET users listing. */

sectionsRouter.get('/', async function (req, res) {
    try {
        const sections = await Section.findAll();
        const sectionsJson = sections.map(section => section.toJSON()).map(section => ({
            section_name: section.section_name,
            section_type: section.section_type
        }));

        res.json(sectionsJson);
    } catch (error) {
        console.error('Error fetching sections:', error);
        res.status(500).send('Internal Server Error');
    }
});

sectionsRouter.post('/', async function (req, res) {
    const {oldRecord, newRecord} = req.body;
    console.log(oldRecord, newRecord)

    if (!oldRecord || !newRecord) {
        return res.status(400).send('Old record and new record are required');
    }

    try {
        console.log(oldRecord, newRecord)

        const section = await Section.findOne({where: {section_name: oldRecord.name}});

        if (!section) {
            return res.status(404).send('Section not found');
        }

        section.section_name = newRecord.name;
        section.section_type = newRecord.section_type;
        await section.save();

        res.json({});
    } catch (error) {
        console.error('Error updating section:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = sectionsRouter;
