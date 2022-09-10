import { Router, Request, Response } from 'express';

import * as AWS from '../../../../aws'; 
import { requireAuth } from '../../users/routes/auth.router';
import { FeedItem } from '../models/FeedItem';

const router: Router = Router();

// Get all feed items
router.get('/', async (req: Request, res: Response) => {
  const items = await FeedItem.findAndCountAll({order: [['id', 'DESC']]});
  items.rows.map((item) => {
          if(item.url) {
              item.url = AWS.getGetSignedUrl(item.url);
          }
  });
  res.send(items);
});

//@TODO
//Add an endpoint to GET a specific resource by Primary Key
router.get('/:id', async (req: Request, res: Response) => {
    let { id } = req.params;
    const item = await FeedItem.findByPk(id);
    if (!id) {
        res.status(404).send({message: 'Item not found'});
    }
    res.send(item);
  });

// update a specific resource
router.patch('/:id', 
    requireAuth, 
    async (req: Request, res: Response) => {
        //@TODO try it yourself
        res.status(500).send("not implemented");
});

// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', requireAuth, async (req: Request, res: Response) => {
    let { fileName } = req.params;

    try {
        const url = AWS.getPutSignedUrl(fileName);
        res.status(201).send({url: url});
    } catch (err) {
        res.status(422).send({message: 'Unable to get signed url'});
    }    
});

// Post meta data and the filename after a file is uploaded 
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/', requireAuth, async (req: Request, res: Response) => {
    const caption = req.body.caption;
    const fileName = req.body.url;

    // check Caption is valid
    if (!caption) {
        return res.status(400).send({ message: 'Caption is required or malformed' });
    }

    // check Filename is valid
    if (!fileName) {
        return res.status(400).send({ message: 'File url is required' });
    }

    const item = await new FeedItem({
            caption: caption,
            url: fileName
    });

    const savedItem = await item.save();

    savedItem.url = AWS.getGetSignedUrl(savedItem.url);
    res.status(201).send(savedItem);
});

export const FeedItemRouter: Router = router;