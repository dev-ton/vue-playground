migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("owpnq7lm4rx1xdt")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qhg97smw",
    "name": "riv",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 5,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [
        "100x50"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("owpnq7lm4rx1xdt")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qhg97smw",
    "name": "riv",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 5,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
})
