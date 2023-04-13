'use strict';

// import express and initialise router
import express from 'express';
const router = express.Router();

// import controllers
import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import tanda from './controllers/tango-playlist.js';
import accounts from './controllers/accounts.js';


// connect routes to controllers
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);

router.get('/tanda/:id', tanda.index);
router.get('/tanda/:id/deletemelody/:melodyid', tanda.deleteMelody);
router.post('/tanda/:id/addtangomelody', tanda.addMelody);
router.post('/tandas/:id/updatemelody/:melodyid', tanda.updateMelody);

router.get('/dashboard/deletetanda/:id', dashboard.deleteTanda);
router.post('/dashboard/addtanda', dashboard.addTanda);

// export router module
export default  router;

