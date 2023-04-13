'use strict';

import logger from '../utils/logger.js';
import userRkStore from '../models/user-rk-store.js';
import { v4 as uuidv4 } from 'uuid';

//create an accounts object
const accounts = {

  //index function to render index page
  index(request, response) {
    const viewDataRk = {
      title: 'Login or Signup',
    };
    response.render('index', viewDataRk);
  },

  //login function to render login page
  login(request, response) {
    const viewDataRk = {
      title: 'Login to the Tango Service',
    };
    response.render('login', viewDataRk);
  },

  //logout function to render logout page
  logout(request, response) {
    response.cookie('tanda', '');
    response.redirect('/');
  },

 //signup function to render signup page
  signup(request, response) {
    const viewDataRk = {
      title: 'Login to the Tango Service',
    };
    response.render('signup', viewDataRk);
  },

 //register function to render the registration page for adding a new user
  register(request, response) {
     const user = request.body;
    logger.info(request.body)
    logger.info("HERE")
    logger.info(request)
    user.picture= request.files.picture;
    user.id = uuidv4();
    
    
    userRkStore.addRkUser(user, function() {
        logger.info('registering ' + user.email);
        response.cookie('tanda', user.email);
        response.redirect("/start");
      });
  },
  

  //authenticate function to check user credentials and either render the login page again or the start page.
  authenticate(request, response) {
    const user = userRkStore.getUserByRkEmail(request.body.email);
    if (user) {
      response.cookie('tanda', user.email);
      logger.info('logging in' + user.email);
      response.redirect('/start');
    } else {
      response.redirect('/login');
    }
  },


 //utility function getCurrentRkUser to check who is currently logged in
  getCurrentRkUser (request) {
    const userRkEmail = request.cookies.tanda;
    return userRkStore.getUserByRkEmail(userRkEmail);
  }
}

export default accounts;
