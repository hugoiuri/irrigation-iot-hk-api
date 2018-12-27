const { MongoClient } = require('mongodb');
const restify = require('restify');

const url = process.env.DATABASE_URL ||'mongodb://localhost:27017/mydb';
const dbName = process.env.DATABASE_NAME || 'mydb';

const server = restify.createServer();
server.use(restify.plugins.bodyParser());

(async function () {
  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db(dbName);
    const measurements = db.collection('measurements');

    server.get('/measurements/:top', async (req, res, next) => {
      const options = {
        sort: { datetime: -1 },
        limit: parseInt(req.params.top, 10)
      }

      const result = await measurements.find(req.body, options).toArray();

      res.send(200, result);
      return next();
    });

    server.post('/measurements', async (req, res, next) => {
      const measurement = req.body;
      measurement.datetime = new Date().toISOString();
      await measurements.insertOne(req.body);
      res.send(201, 'ok');
      return next();
    });

    server.listen(process.env.PORT || 8080, () => {
      console.log('%s listening at %s', server.name, server.url);
    });
  } catch (err) {
    console.log(err.stack);
  }
})();