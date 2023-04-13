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

const tandaStore = {

  store: new JsonTangoStore('./models/playlist-tango-store.json', { tandaCollection: [] }),
  collection: 'tandaCollection',

  getAllTandas() {
    return this.store.findRkAll(this.collection);
  },

  getTanda(id) {
    return this.store.findOneRkBy(this.collection, (collection => collection.id === id));
  },

  removeMelody(id, melodyId) {
    const arrayMel = "melodies";
    this.store.removeRkItem(this.collection, id, arrayMel, melodyId);
  },
  
  removeTanda(id) {
    const tanda = this.getTanda(id);
    this.store.removeRkCollection(this.collection, tanda);
  },
 
  removeAllTandas() {
    this.store.removeRkAll(this.collection);
  },
  
  async addTanda(tanda, response) {
  function uploader(){
    return new Promise(function(resolve, reject) {  
      cloudinary.uploader.upload(tanda.picture.tempFilePath,function(result,err){
        if(err){console.log(err);}
        resolve(result);
      });
    });
  }
  let result = await uploader();
  logger.info('cloudinary result', result);
  tanda.picture = result.url;

  this.store.addRkCollection(this.collection, tanda);
  response();
},

  addMelody(id, melody) {
    const arrayMel = "melodies";
    this.store.addRkItem(this.collection, id, arrayMel, melody);
  },

  editMelody(id, melodyId, updatedMelody) {
    const arrayMel = "melodies";

    this.store.editRkItem(this.collection, id, melodyId, arrayMel, updatedMelody);
  },
  
  getUserPlaylists(userid) {
    return this.store.findRkBy(this.collection, (tanda => tanda.userid === userid));
  },
};

export default tandaStore;