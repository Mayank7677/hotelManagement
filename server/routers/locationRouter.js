const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const auth = require('../middlewares/auth');

router.post('/create', auth , locationController.create);
router.get('/getAll', auth, locationController.getAll);
router.get('/getOne', auth, locationController.getOne);
router.put('/update', auth, locationController.updateLocation);
router.put('/softDelete', auth, locationController.softDelete);
router.delete('/hardDelete', auth, locationController.hardDelete);

module.exports = router;