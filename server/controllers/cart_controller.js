const swag = require('../models/swag');

module.exports = {
    add: (req, res, next)      => {
        const { id } = req.query;

        const index = req.session.user.cart.findIndex( swag => swag.id == id );
    
        if ( index === -1 ) {
          const selectedSwag = swag.find( swag => swag.id == id );
    
          req.session.user.cart.push( selectedSwag );
          req.session.user.total += selectedSwag.price;
        }
    
        res.status(200).send( req.session.user );
      
    },

    destroy: (req, res, next)  => {
        const { id } = req.query;
        const item = swag.find(x => x.id == id);

        if ( req.session.user.cart.find(x => x == item) ) {
            res.status(200).json({ messgae: 'Not in cart' });
        } else {
            let index = req.session.user.cart.findIndex(x => x.id == id);
            req.session.user.total -= item.price;
            req.session.user.cart.splice(index, 1);
            res.status(200).json(req.session.user);
        }
    },

    checkout: (req, res, next) => {
        req.session.user.cart = [];
        req.session.user.total = 0;
        res.status(200).json(req.session.user);
    }
}