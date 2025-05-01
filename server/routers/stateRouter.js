const express = require('express')
const router = express.Router()
const stateController = require('../controllers/stateController')
const auth = require('../middlewares/auth')

router.post('/create', auth , stateController.create);
router.get('/getAll', auth, stateController.getAll);
router.get('/getOne', auth, stateController.getOne);
router.put('/update', auth, stateController.updateState);
router.put('/softDelete', auth, stateController.softDelete);
router.delete('/hardDelete', auth, stateController.hardDelete);

module.exports = router