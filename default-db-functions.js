export default function buildMakeDefaultDbFunctions ({ renameProperty, copyRenameProperty, findFirstOfKeys, CustomError }) {
  return function makeDefaultDbFunctions({ makeDb, defaultCollection }) {
    return Object.freeze({
      findOneByVarious,
      findOne,
      findAll,
      insertOne,
      removeOneByVarious,
      removeOne,
      updateOne
    })
    function findOneByVarious (obj, keys, collection = null) {
      const result = findFirstOfKeys(obj, keys)
      if (result == null) {
        throw new CustomError(`Expected at least one key of ${keys}`, 400)
      }
      return findOne(result, collection)
    }
    async function findOne (obj, collection = null) {
      const db = await makeDb()
      const result = await db
        .collection(collection ?? defaultCollection)
        .findOne(
          copyRenameProperty(obj, 'id', '_id'))
      return result == null
        ? null
        : renameProperty(result, '_id', 'id')
    }
    async function findAll (obj, collection = null) {
      const db = await makeDb()
      const result = await db
        .collection(collection ?? defaultCollection)
        .find(
          copyRenameProperty(obj, 'id', '_id'))
      if (result == null) {
        return null
      }
      result = await result.toArray()
      return result.map(
        item => renameProperty(item, '_id', 'id'))
    }
    async function insertOne (obj, collection = null) {
      const db = await makeDb()
      const result = await db
        .collection(collection ?? defaultCollection)
        .insertOne(
          copyRenameProperty(obj, 'id', '_id'))
      return result == null
        ? null
        : { ...obj, id: result.insertedId }
    }
    function removeOneByVarious (obj, keys, collection = null) {
      const result = findFirstOfKeys(obj, keys)
      if (result == null) {
        throw new CustomError(`Expected at least one key of ${keys}`, 400)
      }
      return removeOne(result, collection)
    }
    async function removeOne (obj, collection = null) {
      const db = await makeDb()
      const result = await db
        .collection(collection ?? defaultCollection)
        .deleteOne(
          copyRenameProperty(obj, 'id', '_id'))
      return result == null
        ? null
        : result.deletedCount === 1
    }
    async function updateOne ({ id: _id, ...info }, collection = null) {
      const db = await makeDb()
      const result = await db
        .collection(collection ?? defaultCollection)
        .updateOne({ _id }, { $set: { ...info } })
      return result == null || result.modifiedCount !== 1
        ? null
        : { id: _id, ...info }
    }
  }
}