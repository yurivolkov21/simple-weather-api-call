// Routes: Định nghĩa các API endpoints
import { Router } from 'express';
import { getWeather } from '../controllers/weatherController.js';

const router = Router();

// GET /weather?city=hanoi
router.get('/weather', getWeather);

export default router;