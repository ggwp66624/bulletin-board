import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as bulletinService from '../services/bulletinService';
import { bulletinValidator } from '../validators/bulletinValidator';
import * as socketIO from '../utils/socket';

const router = Router();

/**
 * GET /api/bulletins
 */
router.get('/', (req, res, next) => {
  bulletinService
    .getAllBulletins()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * GET /api/bulletins/:id
 */
router.get('/:id', (req, res, next) => {
  bulletinService
    .getBulletin(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/bulletins
 */
router.post('/', bulletinValidator, (req, res, next) => {
  bulletinService
    .createBulletin(req.body)
    .then(data => {
      socketIO.emitUpdate();

      return res.status(HttpStatus.CREATED).json({ data });
    })
    .catch(err => next(err));
});

/**
 * PUT /api/bulletins/:id
 */
router.put('/:id', bulletinValidator, (req, res, next) => {
  bulletinService
    .updateBulletin(req.params.id, req.body)
    .then(data => {
      socketIO.emitUpdate();

      return res.json({ data });
    })
    .catch(err => next(err));
});

/**
 * DELETE /api/bulletins/:id
 */
router.delete('/:id', (req, res, next) => {
  bulletinService
    .deleteBulletin(req.params.id)
    .then(data => {
      socketIO.emitUpdate();

      return res.status(HttpStatus.NO_CONTENT).json({ data });
    })
    .catch(err => next(err));
});

export default router;
