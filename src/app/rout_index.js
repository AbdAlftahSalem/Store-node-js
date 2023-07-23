const AuthRout = require("../app/auth/auth_rout");
const CategoryRout = require("../app/category/category_rout");

const mountRoutes = (app) => {
    app.use('/api/v1/auth', AuthRout)
    app.use('/api/v1/categories', CategoryRout)
};

module.exports = mountRoutes;
