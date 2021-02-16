const express = require("express");
const router = express.Router(); // same capabilities as app but through this router!
const Article = require('../models/article');

// everthing in this will be relative to the '/articles' path

router.get('/new', (req, res) => {
    // Pass a blank article to prevent the 'article is not defined' error when writing a new article
    res.render('articles/new', { article: new Article() });
});

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/edit', { article: article });
});

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug }); // findById: asynchronous function
    if (article == null) {
        res.redirect('/');
        window.alert('There\'s no such article!');
    }
    res.render('articles/show', {article: article});

});

router.post('/', async (req, res, next) => {
    req.article = new Article();
    next(); // it tells the program to go on the next function
}, saveArticleAndRedirect('new'));


router.put('/:id', async (req, res, next) => {
    // console.log(req.params.id);
    req.article = await Article.findById(req.params.id);
    next();
}, saveArticleAndRedirect('edit'));


router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/')
});


// post and put are almost identical
// returns a middleware
function saveArticleAndRedirect (path) {
    return async (req, res) => {
        let article = req.article;
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        try{
            article = await article.save(); // It'll return the id of the article if successful
            res.redirect(`/articles/${article.slug}`);
        } catch (error) {
            console.log(error);
            // If fails, render out the page we were just on and pass the article we had before
            res.render(`articles/${path}`, { article: article });
            // To pre-populate the parameters, go to _form_fields.ejs and set the values
        }
    }
}

module.exports = router;