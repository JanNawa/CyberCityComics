var express = require('express');
var axios = require('axios');
var app = express();

var hostname = '127.0.0.1';
var port = process.env.PORT || 3000;

var counts = {}
var MAX_COMIC_NUM = 2474;
for (let i = 1; i <= MAX_COMIC_NUM; i++) {
  counts[i] = 0;
}

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.redirect('/comic/1');
});

app.get('/comic/:number', function (req, res) {
  var number = req.params.number
  var newCount = counts[number] + 1;
  counts[number] = newCount

  axios.get(`https://xkcd.com/${number}/info.0.json`)
  .then(response => {
    res.render('index', {data: response.data, count: newCount, maxComic: MAX_COMIC_NUM})
            return;
  })
  .catch(error => {
    res.status(404).send('Comic not found');
  });
})

var server = app.listen(port, function () {
   console.log("App listening at http://%s:%s", hostname, port)
})