import { renameProperty, copyRenameProperty } from '../rename-property'
import findFirstOfKeys from '../find-first-of-keys'

import buildMakeDefaultDbFunctions from './default-db-functions'

export default buildMakeDefaultDbFunctions({ renameProperty, copyRenameProperty, findFirstOfKeys })