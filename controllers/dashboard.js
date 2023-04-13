'use strict';

// import all required modules
import logger from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';
import tandaStore from '../models/playlist-tango-store.js';
import accounts from './accounts.js';


// create dashboard object
const dashboard = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {   
    // display confirmation message in log
    logger.info('dashboard rendering');    
    const loggedInUser = accounts.getCurrentRkUser(request);
    if (loggedInUser) {       
    // create view data object (contains data to be sent to the view e.g. page title)
    const viewDataRk = {
      title: 'Tanda App Dashboard',
      tandas: tandaStore.getAllTandas(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName + ' - ' + loggedInUser.nickname,
      picture: loggedInUser.picture
    }; 
    // render the dashboard view and pass through the data
    logger.info('about to render', viewDataRk.tandas);
    response.render('dashboard', viewDataRk);
    }
    else response.redirect('/');
  },
  
  deleteTanda(request, response) {
    const tandaId = request.params.id;
    logger.debug(`Deleting Tanda ${tandaId}`);
    tandaStore.removeTanda(tandaId);
    response.redirect('/dashboard');
  },
  
  addTanda(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentRkUser(request);
    const newTanda = {
      id: uuidv4(),
      userid: loggedInUser.id,
      title: request.body.title,
      //duration: request.body.duration,
      picture: request.files.picture,
      date: date,
      melodies: [],
    };
    logger.debug('Creating a new Tanda' + newTanda);
    tandaStore.addTanda(newTanda, function() {

    response.redirect('/dashboard');
    });
  },
};

  // export the dashboard module
export default dashboard;