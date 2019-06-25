import * as Router from 'koa-router';
import controller = require('./controller');

const router = new Router();

// GENERAL ROUTES
router.get('/', controller.general.helloWorld);
router.get('/jwt', controller.general.getJwtPayload);

// USER ROUTES
router.get('/users', controller.user.getUsers);
router.get('/saveUser', controller.user.saveUsers);
router.delete('/deleteUserId', controller.user.deleteUserId)


// photo
router.get('/photos', controller.photo.getPhotoList);

export { router };