'use strict';

import logger from '../utils/logger.js';
import JsonTangoStore from './json-tango-store.js';


import cloudinary from 'cloudinary';

import { createRequire } from "module";
const require = createRequire(import.meta.url);

try {
  const env = require("../.data/.env.json");
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}



const userRkStore = {

  store: new JsonTangoStore('./models/user-rk-store.json', { users: [] }),
  collection: 'users',

  getAllRkUsers() {
    return this.store.findRkAll(this.collection);
  },
  getNumUsers(){
    return this.store.findRkAll(this.collection).length;
  },

  getUserByRkId(id) {
    return this.store.findOneRkBy(this.collection, (user => user.id === id));
  },

  getUserByRkEmail(email) {
    return this.store.findOneRkBy(this.collection, (user => user.email === email));
  },

  addRkUser(user) {
    this.store.addRkCollection(this.collection, user);
  },

  async addRkUser(user, response) {
  function uploader(){
    return new Promise(function(resolve, reject) {  
      cloudinary.uploader.upload(user.picture.tempFilePath,function(result,err){
        if(err){console.log(err);}
        resolve(result);
      });
    });
  }
  let result = await uploader();
  logger.info('cloudinary result', result);
  user.picture = result.url;

  this.store.addRkCollection(this.collection, user);
  response();
},

  
  
  
  
  
};

export default userRkStore;
