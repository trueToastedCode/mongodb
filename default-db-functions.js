export default function buildMakeDefaultDbFunctions ({ renameProperty, copyRenameProperty }) {
  return function makeDefaultDbFunctions({ makeDb, defaultCollection }) {
    return Object.freeze({
      findOneById,
      findOne,
      insertOne,
      removeOneById,
      removeOne,
      updateOne
    })
    function findOneById (id, collection = null) {
      return findOne({ id }, collection)
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
    async function insertOne (obj, collection = null) {
      const db = await makeDb()
      const result = await db
        .collection(collection ?? defaultCollection)
        .insertOne(
          copyRenameProperty(obj, 'id', '_id'))
      return result == null
        ? null
        : renameProperty(result, '_id', 'id')
    }
    function removeOneById (id, collection = null) {
      return removeOne({ id }, collection)
    }
    async function removeOne (obj, collection = null) {
      const db = await makeDb()
      const result = await db
        .collection(collection ?? defaultCollection)
        .deleteOne(obj)
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