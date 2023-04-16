import { MongoClient } from 'mongodb'

import makeBuildMakeDb from './base-db-access'

export default makeBuildMakeDb({ MongoClient })