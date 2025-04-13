var express = require('express');
const Items = require("../models/item");
var authorsRouter = express.Router();
const { Op, Sequelize} = require('sequelize');

authorsRouter.get('/', async function (req, res) {
    const { query } = req.query;

    try {
        console.log(`Searching for authors with query: ${query}`);
        const items = await Items.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('author')), 'author']
            ],
            where: {
                author: {
                    [Op.iLike]: `%${query}%`
                }
            }
        });

        console.log(`Found authors: ${items.length}`);
        const authorsJson = items.map(item => item.author);

        res.json(authorsJson);
    } catch (error) {
        console.error('Error fetching authors:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = authorsRouter;
