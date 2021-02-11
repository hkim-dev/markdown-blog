const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const articleRouter = require('./routes/articles');
const app = express();

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');

app.use('/articles', articleRouter); // Tells the app to use articleRouter

app.get('/', (req, res) => {
    const articles = [{
        title: "Test Article",
        createdAt: new Date(),
        description: "Test description"
    },
    {
        title: "Test Article 2",
        createdAt: new Date(),
        description: "Test description 2"
    }
    ]
    res.render('articles/index', { articles: articles }); // pass anything you need to be available in index.ejs
});


app.listen(5000);