const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article')
const dotenv = require('dotenv');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.set('view engine', 'ejs');
// Use urlencoded before the router to read the forms
app.use(express.urlencoded({ extended: false })); // To access the forms in our articles.js
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' }); // getting every single article
    res.render('articles/index', { articles: articles }); // pass anything you need to be available in index.ejs
});

app.use('/articles', articleRouter); // Tells the app to use articleRouter

app.listen(5000);