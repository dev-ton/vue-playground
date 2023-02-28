migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("owpnq7lm4rx1xdt")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("owpnq7lm4rx1xdt")

  collection.createRule = null

  return dao.saveCollection(collection)
})
