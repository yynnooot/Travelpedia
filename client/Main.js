import React from 'react';
import { API_KEY } from '../secret';
import axios from 'axios';
import Wiki from './Wiki';
import Nav from './Nav';

import Image from './Image';

var CV_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;


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
      options: {},
      description: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFiles = this.handleFiles.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.processFile = this.processFile.bind(this)
  }

  handleFiles(evt) {
    const reader = new FileReader();
    const file = evt.target.files[0];
    if (file) {
      this.setState ({
        fileName: file.name,
        fileType: file.type,
        file: file,
        reader: reader,
        description: ""
      })
    }
  }
  
  handleSubmit(evt) {
    evt.preventDefault()
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
        var description=res.data.responses[0].landmarkAnnotations[0].description;
        this.setState({description})
       
      })
      .catch(err => {
        console.log('err:', err)
      })
    }


  render() {
    const {description} = this.state
    return (
      <div>
        <Nav />
        <div id="main">
            <div id="left-div">
              <p className="left-div-text">Choose your image below:</p>
              <form id="fileform" onSubmit={this.handleSubmit}>
                <input onChange={this.handleFiles} type="file" name="fileField" />
                <br />
                {this.state.fileName? (
                  <div>
                    <img className="photo "src={this.state.fileName}/>
                    <button id="submit-btn"type="submit">SUBMIT IMAGE</button> 
                  </div>) : ""}
              </form>
            </div>
            
            <div id="right-div">      
              {this.state.description? <Wiki title={description}/> : ""}
            </div>
        </div>
      </div>
    )
  }
}