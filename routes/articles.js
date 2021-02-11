const express = require("express");
const router = express.Router(); // same capabilities as app but through this router!

// everthing in this will be relative to the '/articles' path

router.get('/new', (req, res) => {
    res.render('articles/new');
});


router.post('/', (req, res) => {
    
});

module.exports = router;