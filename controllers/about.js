'use strict';

// import all required modules
import logger from '../utils/logger.js';
import developerRkStore from'../models/developer-tango-store.js';
import accounts from './accounts.js';
// create about object
const about = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    const loggedInUser = accounts.getCurrentRkUser(request);
    // display confirmation message in log
    logger.info('about rendering');
    
    // create view data object (contains data to be sent to the view e.g. page title)
   if (loggedInUser) {
    const viewDataRk = {
      title: 'About the Tanda App',
      rk_Developers: developerRkStore.getAllRkDevelopers(),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName + ' - ' + loggedInUser.nickname,
      picture: loggedInUser.picture
    };
    
    // render the about view and pass through the data
    response.render('about', viewDataRk);
      }
   else response.redirect('/'); 
  },
};

// export the about module
export default about;