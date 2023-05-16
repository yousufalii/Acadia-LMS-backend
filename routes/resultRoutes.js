const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.post('/', resultController.createNewResult);

router.get("/:studentId", resultController.getResultByStudentId);

router.put("/", resultController.updateResultByStudentId);

router.delete("/", resultController.deleteResultByStudentId);


module.exports = router;

