const { MongoClient } = require('mongodb');
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware')

const url = process.env.DATABASE_URL ||'mongodb://localhost:27017/mydb';
const dbName = process.env.DATABASE_NAME || 'mydb';

const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
});

const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);

(async function () {
  const client = new MongoClient(url, { useNewUrlParser: true });

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

    server.get('/measurements/greater', async (req, res, next) => {
      const options = {
        sort: { value: -1, datetime: -1 },
        limit: 1
      }

      const result = await measurements.find(req.body, options).next();

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