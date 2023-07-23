const AuthRout = require("../app/auth/auth_rout");


const mountRoutes = (app) => {
    app.use('/api/v1/auth', AuthRout)
};

module.exports = mountRoutes;
