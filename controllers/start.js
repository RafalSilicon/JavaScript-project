'use strict';

// import all required modules
const logger = require('../utils/logger');
const tangoPlaylistStore = require('../models/playlist-tango-store.js');

// create start object
const start = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    // app statistics calculations

    const tangoPlaylists = tangoPlaylistStore.getAllTangoPlaylists();

    let numTangoPlaylists = tangoPlaylists.length;

    let numMelodys = 0;

    for (let item of tangoPlaylists) {
        numMelodys += item.melodys.length;
    }
    
    // display confirmation message in log
    logger.info('start rendering');
    
    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
        title: 'Welcome to the Tango Playlist App!',
        totalTangoPlaylists: numTangoPlaylists,
        totalMelodys: numMelodys,
    };
    
    // render the start view and pass through the data
    response.render('start', viewData);
  },
};

// export the start module
module.exports = start;