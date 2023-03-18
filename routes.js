'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const tangoPlaylist = require('./controllers/tango-playlist.js');

// connect routes to controllers
router.get('/', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);

router.get('/tangoPlaylist/:id', tangoPlaylist.index);

router.get('/tangoPlaylist/:id/deleteMelody/:melodyid', tangoPlaylist.deleteMelody);
router.post('/tangoPlaylist/:id/addtangomelody', tangoPlaylist.addTangoMelody);
router.post('/tangoPlaylist/:id/updatemelody/:melodyid', tangoPlaylist.updateMelody);

router.get('/dashboard/deletetangoplaylist/:id', dashboard.deleteTangoPlaylist);
router.post('/dashboard/addtangoplaylist', dashboard.addTangoPlaylist);

// export router module
module.exports = router;

