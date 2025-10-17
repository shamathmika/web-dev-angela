//jshint esversion:8

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

// this is called chaining. use one line for the route - app.route("/name") and then use subsequent lines for
// each get, post etc. notice the semicolon for the app.route ends after .delete
app.route("/articles")
    .get(function(req, res) {
        Article.find({}, function(err, foundArticles) {
            if (err) {
                res.send(err);
            } else {
                res.send(foundArticles);
            }
        });
    })

    .post(function(req, res) {
        const title = req.body.title;
        const content = req.body.content;
        console.log("Title: " + title);
        console.log("Content: " + content);

        const newArticle = new Article({
            title: title,
            content: content
        });

        newArticle.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully saved new article");
            }
        });
    })

    .delete(function(req, res) {
        Article.deleteMany(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully deleted all documents");
            }
        });
    });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.route("/articles/:articleName")
    .get(function(req, res) {
        console.log("article name: " + req.params.articleName);
        Article.findOne({
            title: req.params.articleName
        }, function(err, foundArticle) {
            if (err) {
                res.send(err);
            } else if (foundArticle) {
                res.send(foundArticle);
            } else {
                res.send("Couldn't find the article");
            }
        });
    })

    .put(function(req, res) {
        const title = req.body.title;
        const content = req.body.content;
        console.log("Title: " + title + ", Content: " + content);
        Article.update({
                title: req.params.articleName
            }, {
                title: title,
                content: content
            }, {
                overwrite: true
            },
            function(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Successfully changed article");
                }
            }
        );
    })

    .patch(function(req, res){
        Article.update(
            {title: req.params.articleName},
            {$set: req.body},
            function(err){
                if(err) {
                    res.send(err);
                } else {
                    res.send("Successfully updated article");
                }
            });
    })

    .delete(function(req, res) {
        Article.deleteOne({
            title: req.params.articleName
        }, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully deleted " + req.params.articleName + " documents");
            }
        });
    });


app.listen(3000, function() {
    console.log("Server started at port 3000");
});
