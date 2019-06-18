import * as Router from 'koa-router';
import controller = require('./controller/photo-controller');

const router = new Router();

// GENERAL ROUTES
router.get('/photos', controller.default.getPhotoList);


export { router };