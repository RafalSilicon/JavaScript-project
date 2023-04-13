'use strict';

import logger from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';
import tandaStore from '../models/playlist-tango-store.js';
import accounts from './accounts.js';

const tanda = {
  index(request, response) {
    const tandaId = request.params.id;
    logger.debug('Tanda id = ' + tandaId);
    const loggedInUser = accounts.getCurrentRkUser(request);

    let tanda = tandaStore.getTanda(tandaId)
    let totDuration = 0;
    for (let melody of tanda.melodies) {
        totDuration += parseFloat(melody.duration)
    }
    
    const viewDataRk = {
      title: 'Tanda',
      tanda: tanda,
      Duration: totDuration,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName + ' - ' + loggedInUser.nickname,
      picture: loggedInUser.picture
    };
  
    response.render('tanda', viewDataRk);
  },
  
    deleteMelody(request, response) {
    const tandaId = request.params.id;
    const melodyId = request.params.melodyid;
    logger.debug(`Deleting Tango ${melodyId} from Tanda ${tandaId}`);
    tandaStore.removeMelody(tandaId, melodyId);
    response.redirect('/tanda/' + tandaId);
  },
    addMelody(request, response) {
    const tandaId = request.params.id;
    const tanda = tandaStore.getTanda(tandaId);
    const newMelody = {
      id: uuidv4(),
      title: request.body.title,
      artist: request.body.artist,
      genre: request.body.genre,
      duration: request.body.duration
    };
    tandaStore.addMelody(tandaId, newMelody);
    response.redirect('/tanda/' + tandaId);
    },
  updateMelody(request, response) {
    const tandaId = request.params.id;
    const melodyId = request.params.melodyid;
    logger.debug("updating melody " + melodyId);
    const updatedMelody = {
      id: melodyId,
      title: request.body.title,
      artist: request.body.artist,
      genre: request.body.genre,
      duration: request.body.duration,
      
    };
    tandaStore.editMelody(tandaId, melodyId, updatedMelody);
    response.redirect('/tanda/' + tandaId);
  }
};

export default tanda;