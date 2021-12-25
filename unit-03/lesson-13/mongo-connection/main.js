const MongoDB = require("mongodb").MongoClient;
const dbURL = "mongodb://localhost:27017";
const dbName = "recipe_db";

// Configuramos la conexión a nuestro servidor de DB local
MongoDB.connect(dbURL, (error, client) => {
  if (error) throw error;

  // Obtenemos la DB recipe_db a partir de nuestra conexión al servidor MongoDB.
  let db = client.db(dbName);

  // Buscamos todos los registros de la colleción contactsyo
  db.collection("contacts")
    .find()
    .toArray((error, data) => {
      if (error) throw error;
      console.log(data);
    });

  // Insertamos un nuevo item
  db.collection("contacts").insertOne(
    {
      name: "Freddie Mercury",
      email: "fred@queen.com",
    },
    (error, db) => {
      if (error) throw error;
      console.log(db);
      client.close();
    }
  );
});
