const router = require('express').Router()
const request = require('request')

const CV_URL = `https://vision.googleapis.com/v1/images:annotate?key=${process.env.API_KEY}`
console.log(CV_URL)
router.get('/cloud', (req, res) => {
  res.send('CLOUD')
})

router.post('/cloud', (req, res) => {
  let postData = req.body;

  request.post(CV_URL, postData, function (err, httpResponse, body) {
    if(err) {
      console.log(err)
    }
    console.log(body)
    res.send(body)
  })
})

module.exports = router
