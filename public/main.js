'use strict'

console.log('~~~~FIRST')
var CLOUD_API_URL = 'http://localhost:1337/api/cloud'
var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + window.apiKey
console.log('CV_URL: ', CV_URL);

$(function() {
  $('#fileform').on('submit', uploadFiles)
})
console.log('HIT AFTER')

/**
 * 'submit' event handler - reads the image bytes and sends it to the Cloud
 * Vision API.
 */
function uploadFiles(event) {
  event.preventDefault() // Prevent the default form post

  // Grab the file and asynchronously convert to base64.
  var file = $('#fileform [name=fileField]')[0].files[0]
  var reader = new FileReader()
  console.log('READER: ', reader)
  reader.onloadend = processFile
  reader.readAsDataURL(file)
}

/**
 * Event handler for a file's data url - extract the image data and pass it off.
 */
function processFile(event) {
  var content = event.target.result
  sendFileToCloudVision(content.replace('data:image/jpeg;base64,', ''))
  console.log('content:', content)
}
// console.log('HELLO')
/**
 * Sends the given file contents to the Cloud Vision API and outputs the
 * results.
 */
function sendFileToCloudVision(content) {
  // Strip out the file prefix when you convert to json.
  console.log('content when sent:', content)
  let request = {
    "requests": [
      {
        "image": {
          "content": content
        },
        "features": [
          {
            "type": "LANDMARK_DETECTION",
            "maxResults": 5
          }
        ]
      }
    ]
  }

  $('#results').text('Loading...')
  $.post({ url: CV_URL, data: JSON.stringify(request), contentType: 'application/json' }
  )
    .fail(function(jqXHR, textStatus, errorThrown) {
      $('#results').text('ERRORS: ' + textStatus + ' ' + errorThrown)
    })
    .done(displayJSON)
}


/**
 * Displays the results.
 */
function displayJSON(data) {
  console.log('DISPLAYJSON HIT')
  var contents = JSON.stringify(data)
  $('#results').text(contents)
  var evt = new Event('results-displayed')
  evt.results = contents
  document.dispatchEvent(evt)
}
