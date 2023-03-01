migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("owpnq7lm4rx1xdt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "voaygkwk",
    "name": "screenshot",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [
        "200x150"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("owpnq7lm4rx1xdt")

  // remove
  collection.schema.removeField("voaygkwk")

  return dao.saveCollection(collection)
})
