'use strict';

// import all required modules
import logger from '../utils/logger.js';
import tandaStore from '../models/playlist-tango-store.js';
import accounts from './accounts.js';

// create start object
const start = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    const loggedInUser = accounts.getCurrentRkUser(request);
      // display confirmation message in log
    logger.info('start rendering');
    
    if(loggedInUser){   
    // app statistics calculations
    const tandas = tandaStore.getAllTandas();
    let numTandas = tandas.length;
    let numMelodies = 0;
    for (let item of tandas) {
        numMelodies += item.melodies.length;
    }  
      
       let average = 0;
   if (numTandas > 0) {
    average = numMelodies / numTandas;
    average = average.toFixed(2);
   }
   
     
    let currentLargest = 0;
    let largestTandaTitle = "";
    for (let tanda of tandas) {
      if (tanda.melodies.length > currentLargest) {
        currentLargest = tanda.melodies.length;
      }
      
      
    }
    for (let tanda of tandas) {
      if (tanda.melodies.length === currentLargest) {
        largestTandaTitle += tanda.title + ", ";
      }
    }
    
    let currentSmallest = 1;
      if (numTandas > 0) {
      currentSmallest = tandas[0].melodies.length;
    } 
    let smallestTandaTitle = "";

    for (let tanda of tandas) {
      if (tanda.melodies.length < currentSmallest) {
        currentSmallest = tanda.melodies.length;
      }
    }
    for (let tanda of tandas) {
      if (tanda.melodies.length === currentSmallest) {
        smallestTandaTitle += tanda.title + ", ";
      }
    }  
      
    
      
      // create view data object (contains data to be sent to the view e.g. page title)
    const viewDataRk = {
        title: 'Welcome to the Tanda App!',
        totalTandas: numTandas,
        totalMelodies: numMelodies,
        average: average,
        largest: largestTandaTitle,
        smallest: smallestTandaTitle,      
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName + ' - ' + loggedInUser.nickname,
        nonickname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture
    };
    // render the start view and pass through the data
    response.render('start', viewDataRk);
    }
    else response.redirect('/');
  },
};

// export the start module
export default start;