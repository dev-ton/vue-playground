migrate((db) => {
  const collection = new Collection({
    "id": "owpnq7lm4rx1xdt",
    "created": "2023-02-24 16:14:23.257Z",
    "updated": "2023-02-24 16:14:23.257Z",
    "name": "animations",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qhg97smw",
        "name": "riv",
        "type": "file",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": []
        }
      },
      {
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
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("owpnq7lm4rx1xdt");

  return dao.deleteCollection(collection);
})
