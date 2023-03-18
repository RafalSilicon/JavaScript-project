'use strict';

const logger= require('../utils/logger');
const uuid = require('uuid');
const tangoPlaylistStore = require('../models/playlist-tango-store');

const tangoPlaylist = {
  index(request, response) {
    const tangoPlaylistId = request.params.id;
    logger.debug('Tango Playlist id = ' + tangoPlaylistId);
    const viewData = {
      title: 'Tango Playlist',
      tangoPlaylist: tangoPlaylistStore.getTangoPlaylist(tangoPlaylistId),
    };
    logger.info('about to render', viewData.tangoPlaylist);
    response.render('tangoPlaylist', viewData);
  },
    deleteMelody(request, response) {
    const tangoPlaylistId = request.params.id;
    const melodyId = request.params.melodyid;
    logger.debug(`Deleting Tango ${melodyId} from Tango Playlist ${tangoPlaylistId}`);
    tangoPlaylistStore.removeMelody(tangoPlaylistId, melodyId);
    response.redirect('/tangoPlaylist/' + tangoPlaylistId);
  },
    addTangoMelody(request, response) {
    const tangoPlaylistId = request.params.id;
    const tangoPlaylist = tangoPlaylistStore.getTangoPlaylist(tangoPlaylistId);
    const newMelody = {
      id: uuid(),
      title: request.body.title,
      artist: request.body.artist,
      genre: request.body.genre,
      duration: request.body.duration
    };
    tangoPlaylistStore.addTangoMelody(tangoPlaylistId, newMelody);
    response.redirect('/tangoPlaylist/' + tangoPlaylistId);
  },
  updateMelody(request, response) {
    const tangoPlaylistId = request.params.id;
    const melodyId = request.params.melodyid;
    logger.debug("updating melody " + melodyId);
    const updatedMelody = {
      title: request.body.title,
      artist: request.body.artist,
      genre: request.body.genre,
      duration: request.body.duration
    };
    tangoPlaylistStore.editMelody(tangoPlaylistId, melodyId, updatedMelody);
    response.redirect('/tangoPlaylist/' + tangoPlaylistId);
  }
};

module.exports = tangoPlaylist;