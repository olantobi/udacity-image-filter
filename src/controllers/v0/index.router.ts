import { Router, Request, Response } from 'express';
import { FeedItemRouter } from './feed/routes/feed.router';
import { UserRouter } from './users/routes/user.router';

const router: Router = Router();

router.use('/feed', FeedItemRouter);
router.use('/users', UserRouter);

router.use('/', (req: Request, res: Response) => res.send('v0'));

export const IndexRouter: Router = router;