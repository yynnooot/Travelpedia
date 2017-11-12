const router = require('express').Router()
const request = require('request')
const key = 'AIzaSyDXwcoDfCkDCScAfKYAYQo3lFL4-3h1jy0';
const CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + key;

console.log(CV_URL)
router.get('/cloud', (req, res) => {
  res.send('CLOUD')
})

router.post('/cloud', (req, res) => {
  
  let postData = req.body;
  console.log("POST", postData)
  request.post(CV_URL, postData, function (err, httpResponse, body) {
    if(err) {
      console.log(err)
    }
    console.log(body)
    res.send(body)
  })
})

module.exports = router
