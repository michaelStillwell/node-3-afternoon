let 
    users = require(`${__dirname}/../models/users`),
    id    = 1;

module.exports = {
    login: (req, res, next)    => {
        const { username, password } = req.body;
        const User = users.find(x => x.username === username && x.password === password);

        if ( User ) {
            req.session.user.username = User.username;
            res.status(200).json({ user: req.session.user.username })
        } else {
            res.status(500).json({ messgae: 'Failed' });    
        }
    },

    register: (req, res, next) => {
        const { username, password } = req.body;

        users.push({id, username, password});
        id++;

        req.session.user.username = username;

        res.status(200).json(req.session.user);
    },

    signout: (req, res, next)  => {
        req.session.destroy();
        res.status(200).json(req.session);
    },

    getUser: (req, res, next)  => {
        res.status(200).json(req.session.user);
    },
}
