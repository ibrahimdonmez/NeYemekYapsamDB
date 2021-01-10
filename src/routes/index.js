
import AuthRouter from './auth/auth.router';
import config from '../config';
import FoodsRouter from './Foods/Foods.router';
import FoodMaterialRouter from './FoodMaterial/FoodMaterial.router';
import feedBackRouter from './feedBack/feedBack.router';
import usersRouter from './users/users.router';
import CommentsRouter from './Comments/Comments.router';

const jwtMiddleware = require('express-jwt-middleware');

var jwtCheck = jwtMiddleware(config.jwtSecret);

const AppRoutes = (app) => {
    app.use(AuthRouter.routePrefix, AuthRouter.route());
    app.use(FoodsRouter.routePrefix, FoodsRouter.route());
    app.use(FoodMaterialRouter.routePrefix, FoodMaterialRouter.route());
    app.use(feedBackRouter.routePrefix, feedBackRouter.route());
    app.use(usersRouter.routePrefix, usersRouter.route());
    app.use(CommentsRouter.routePrefix, CommentsRouter.route());
}

export default AppRoutes;