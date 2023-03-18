'use strict';

const developerStore = {

  developers: require('./developer-tango-store.json').developers,

  getAllDevelopers() {
    return this.developers;
  },

};

module.exports = developerStore;