import React, { Component } from 'react'
import axios from 'axios'

// //import wiki from 'wikijs';

// const wiki = require('wikijs').default;


export default class Wiki extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: "",
            title: this.props.title
        }
        this.axiosRequest = this.axiosRequest.bind(this)
    }
    axiosRequest(title){
        axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&origin=*&explaintext=&titles=${title}`)
        .then(res => { 
            const obj = res.data.query.pages
            console.log('OBJECT',obj)
            for(let key in obj){
                const text = obj[key].extract;
                const newText = text.split('\n').map(function(item,index) {
                    return (
                      <span key={index}>
                        {item}
                        <br/>
                      </span>
                    )
                  })
                
                this.setState({text: newText})
            }
        }) 
        .catch(function(err) { console.log('Error: =>' + err); })
    }
    componentDidMount(){ 
        this.axiosRequest(this.props.title);
    }
    componentWillReceiveProps(nextProps){
        console.log('this.props:',this.props)
        console.log('nextProps',nextProps)

        if(this.props.title !== nextProps.title){
            // this.setState({title: nextProps.title})
            this.setState({title: nextProps.title})
            this.axiosRequest(nextProps.title)
        }
    }
    
    render(){
        // const {title} = this.props;
        
        return (
            <div>
                <h1>WIKI</h1>
                <h3>{this.state.title}</h3>
                {this.state.text? <p>{this.state.text}</p> : ""}
                
            </div>
        )    
    }
}