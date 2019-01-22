const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

var db;
MongoClient.connect('mongodb://Marblehead:8712594630Marble@ds213472.mlab.com:13472/examen', { useNewUrlParser: true },(err, client) =>{

    if (err) return console.log(err)
    db = client.db('examen') // whatever your database name is
    app.listen(3000, () => {
      console.log('listening on 3000')
})
})

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine','ejs');


app.get('/', (req, res) => {
    db.collection('inhaal').find().toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
      res.render('index.ejs', {inhaal: result})
    })
  })

  app.post('/inhaal',(req,res)=>{
      
    inhaalExamens = req.body;
    db.collection('inhaal').findOne({name: inhaalExamens.name,inhaalExamen : inhaalExamens.inhaalExamen,reden: inhaalExamens.reden},function(err,existinguser){
        if(existinguser == null)
        {
            db.collection('inhaal').insertOne(req.body,(err,result)=>{
                if(err) return console.log(err)

                console.log('saved to database')
                res.redirect('/')
            })
        }
        else    
        {
            console.log("bestaat al")
        }
    })

  })

  app.get('/search', (req, res) => {
    res.render('search.ejs', {});
 });
    
