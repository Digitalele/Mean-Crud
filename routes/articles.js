var express = require('express');
var router = express.Router();

var Article = require('../models/article');

router.get('/', function(req, res, next) {
    Article.getArticles(function(err, articles) {
        if (err) {
            console.log(err);
        }
        res.json(articles);
    });
});

router.get('/:id', function(req, res, next) {
    Article.getArticleById(req.params.id, function(err, article) {
        if (err) {
            console.log(err);
        }
        res.json(article);
    });
});

router.get('/category/:category', function(req, res, next) {
    Article.getArticlesByCategory(req.params.category, function(err, articles) {
        if (err) {
            console.log(err);
        }
        res.json(articles);
    });
});

//post

router.post('/', function(req, res, next) {
    //get form values
    var title = req.body.title;
    var category = req.body.category;
    var body = req.body.body;

    //article object
    var newArticle = new Article({
        title: title,
        category: category,
        body: body
    });

    // Create Article
    Article.createArticle(newArticle, function(err, article) {
        if (err) {
            console.log(err);
        }
        res.location('/articles');
        res.redirect('/articles');
    });
});


//Put Article Update
router.put('/', function(req, res, next) {
    var id = req.body.id;
    var data = {
        title: req.body.title,
        category: req.body.category,
        body: req.body.body
    };
    // Create article
    Article.UpdateArticle(id, data, function(err, article) {
        if (err) {
            console.log(err);
        }
        res.location('/articles');
        res.redirect('/articles');
    });
});

// Delete Article
router.delete('/:id', function(req, res, next){
  var id = req.params.id;

  //create article
  Article.removeArticle(id, function(err, article){
    if(err){
      console.log(err);
    }

    res.location('/articles');
    res.redirect('/articles');
  });
});


module.exports = router;
