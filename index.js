import { renameProperty, copyRenameProperty } from '../rename-property'

import buildMakeDefaultDbFunctions from './default-db-functions'

export default buildMakeDefaultDbFunctions({ renameProperty, copyRenameProperty })