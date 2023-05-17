const { mongoConnect, ObjectId } = require('../service/mongodb')
const db = mongoConnect()

const { v4: uuid } = require('uuid')

module.exports = class Recipe {
  constructor(name, ingredient, instruction) {
    this.id = uuid()
    this.name = name
    this.ingredient = ingredient
    this.instruction = instruction
  }

  async save() {
    return (await db).collection('recipes').insertOne(this)
  }

  static async find() {
    return (await db).collection('recipes').find().toArray()
  }

  static async findById(id) {
    return (await db)
      .collection('recipes')
      .find({ _id: new ObjectId(id) })
      .toArray()
  }

  static async updateOne(data) {
    return (await db).collection('recipes').updateOne(
      { _id: new ObjectId(data.id) },
      {
        $set: {
          name: data.name,
          ingredient: data.ingredient,
          instruction: data.instruction,
        },
      }
    )
  }

  static async deleteOne(id) {
    return (await db).collection('recipes').deleteOne({ _id: new ObjectId(id) })
  }
}
