const { MongoClient, ObjectId } = require('mongodb')
const recipesData = require('../data/recipes.json')

const URL = process.env.MONGO_URL,
  dbName = process.env.MONGO_DB_NAME

const mongoConnect = async () => {
  const dbo = await MongoClient.connect(URL)

  const dbList = await dbo.db().admin().listDatabases()
  const dbExists = dbList.databases.find((db) => db.name === dbName)
  if (!dbExists) {
    await dbo.db(dbName).collection('recipes').insertMany(recipesData)
  }

  console.log(`Connected to ${dbName}`)
  return await dbo.db(dbName)
}

module.exports = { mongoConnect, ObjectId }
