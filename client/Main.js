import React from 'react'
import { API_KEY } from '../secret';
import axios from 'axios'

var CV_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`


export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // res from google api
      data: [],
      fileName: '',
      fileType: '',
      file: {},
      reader: {},
      content: '',
      options: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFiles = this.handleFiles.bind(this)
    // this.handleClick = this.handleClick.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.processFile = this.processFile.bind(this)
  }
  
  // *** <input onChange={this.handleFiles} type="file" name="fileField"/> ***//
  handleFiles(evt) {
    const reader = new FileReader();
    const file = evt.target.files[0];
    if (file) {
      this.setState ({
        fileName: file.name,
        fileType: file.type,
        file: file,
        reader: reader
      })
    }
  }
  
  handleSubmit(evt) {
    evt.preventDefault()
    // console.log('SUBMIT')
    this.uploadFile()
  }

  uploadFile() {
    let reader = new FileReader()
    reader.onloadend = this.processFile
    reader.readAsDataURL(this.state.file)
  }

  processFile(evt) {
    var content = evt.target.result
    // function to convert
    const content64 = content.replace('data:image/jpeg;base64,', '')
    
    //console.log('before axious state content',content64)
    const request = {
      requests: [
        {
          image: {
            content: content64
          },
          features: [
            {
              type: "LANDMARK_DETECTION",
              maxResults: 1
            }
          ]
        }
      ]
    }
    axios.post(CV_URL, request)
      .then(res => {
        
        console.log('res',res.data.responses[0].landmarkAnnotations[0].description)
      })
      .catch(err => {
        console.log('err:', err)
      })
    }
    


  render() {
    console.log('RENDER:this.state: ', this.state);
    return (
      <div>
        <h1>MAIN!</h1>
        <form
          id="fileform"
          onSubmit={this.handleSubmit}
        >
          <input onChange={this.handleFiles} type="file" name="fileField" />
          <br />
          <button type="submit">CLICK ME</button>
        </form>
        {/* <button onClick={this.handleClick}>GOOGLE PING</button> */}
      </div>
    )
  }
}