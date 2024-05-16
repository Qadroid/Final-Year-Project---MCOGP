/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hok8w9lh8p9hobb")

  collection.listRule = ""

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pccs7uj3",
    "name": "owner",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hok8w9lh8p9hobb")

  collection.listRule = null

  // remove
  collection.schema.removeField("pccs7uj3")

  return dao.saveCollection(collection)
})
