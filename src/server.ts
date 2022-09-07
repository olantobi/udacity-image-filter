import express from 'express'

import { IndexRouter } from './controllers/v0/index.router';
import { V0MODELS } from './controllers/v0/model.index';

import { sequelize } from './sequelize';

const app = express();
const PORT = process.env.PORT || 9000;

sequelize.addModels(V0MODELS);
sequelize.sync().then(() => console.log('connected to database'));

app.use(express.json());

 //CORS Should be restricted
 app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8100");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use('/api/v0', IndexRouter);

 // Root URI call
 app.get("/", async (req, res) => {
  res.send("/api/v0/");
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));