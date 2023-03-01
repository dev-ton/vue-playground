migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("owpnq7lm4rx1xdt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7aotenh6",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e5tdibdu",
    "name": "title",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("owpnq7lm4rx1xdt")

  // remove
  collection.schema.removeField("7aotenh6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e5tdibdu",
    "name": "statemachine",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
