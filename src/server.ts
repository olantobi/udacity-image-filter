import express, { Request, Response } from 'express'

import { IndexRouter } from './controllers/v0/index.router';
import { V0MODELS } from './controllers/v0/model.index';

import { sequelize } from './sequelize';

import {filterImageFromURL, deleteLocalFiles, validateUrl } from './util/util';

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

app.get('/filteredimage', async (req: Request, res: Response) => {
  const image_url = req.query.image_url as string;

  if (!image_url) {
    return res.status(400).send({message: 'No image url provided'});
  }

  if (!validateUrl(image_url)) {
    return res.status(422).send({message: 'Invalid image url provided'});
  }

  let filteredImage;
  try {
    filteredImage = await filterImageFromURL(image_url);
  } catch(err) {
    let message;
    if (err instanceof Error) message = err.message;
    else message = String(err)

    return res.status(422).send({message: message });
  }

  res.send({data: filteredImage});

  deleteLocalFiles([filteredImage]);
});

app.use('/api/v0', IndexRouter);

 // Root URI call
 app.get("/", async (req, res) => {
  res.send("/api/v0/");
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
