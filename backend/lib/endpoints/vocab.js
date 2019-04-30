const router = require('express').Router();
const auth = require("../auth")();
const jwt = require("jwt-simple");
const VocabItemModel = require('../models').loadModel('vocabItem');

router.get('/random-words', (req, res) => {
    // VocabItemModel.aggregate([{$sample: { size: 20 }}]).then(result => {
    //     console.log(result);
    //     res.json(result);
    // });

    VocabItemModel.aggregate([{$sample: { size: 20 }}]).exec((err, result) => {
        console.log('err', err);
        console.log('result', result);
        res.json(result);
    });
});

module.exports = router;
