import { Router } from 'express';
import {
    subscribe,
    confirmSubscription
} from '../controllers/newsletter.controller.js';

const router = Router();

router.post('/', subscribe);
router.get('/confirm', confirmSubscription);

export default router;
