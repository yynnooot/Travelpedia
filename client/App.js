import React from 'react'
import axios from 'axios'

const API_KEY = 'AIzaSyDXwcoDfCkDCScAfKYAYQo3lFL4-3h1jy0'
const CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + API_KEY
const URL = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDXwcoDfCkDCScAfKYAYQo3lFL4-3h1jy0'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      googleData: []
    }
  }
  handleSub() {
     axios.get(CV_URL)
      .then(res => this.setState({googleData: res.data}))
      .catch(err => {console.log("err: ", err)})
  }
  render() {
    console.log('URL: ', URL);
    return (
      <div>
          <h1>Tripopedia</h1>
          <h3>Upload an Image for Details:</h3>
          <form id="fileform">
            <input type="file" name="fileField" />
            <input type="submit" name="submit" value="Submit" />
          </form>
        <div id="article" />
        <p id="wiki-result" />
        <code style={{'white-space': 'pre'}} id='results' />
        <a href={URL}>CLICKKKK</a>
      </div>
    )
  }
}

export default App
