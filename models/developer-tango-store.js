'use strict';

import logger from '../utils/logger.js';
import JsonTangoStore from './json-tango-store.js';

const developerRkStore = {
  
  store: new JsonTangoStore('./models/developer-tango-store.json', { rk_Developers: [] }),
  collection: 'rk_Developers',

  getAllRkDevelopers() {  
    return this.store.findRkAll(this.collection);
  },
};
export default developerRkStore;