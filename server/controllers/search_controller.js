const swag = require('../models/swag');

module.exports = {
    search: (req, res, next) => {
        const { category } = req.query;

        const filter = swag.filter(x => x.category == category);

        if ( !category ) {
            res.status(200).json(swag);
        } else { 
            res.status(200).json(filter);
        }
        res.status(200).json();
    }
}