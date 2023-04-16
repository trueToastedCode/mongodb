export default function makeBuildMakeDb ({ MongoClient }) {
  return function buildMakeDb ({ url, dbName }) {
    const client = new MongoClient(url, { useNewUrlParser: true })
    return async function makeDb () {
      if (!client.isConnected) {
        await client.connect()
      }
      return client.db(dbName)
    }
  }
}