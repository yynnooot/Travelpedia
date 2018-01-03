import React, { Component } from 'react';
import axios from 'axios';

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

            for(let key in obj){
                const text = obj[key].extract;
                const newText = text.split('\n').map(function(item,index) {
                    return (
                      <span key={index}>
                        {item}
                        <br/>
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
        if(this.props.title !== nextProps.title){
            this.setState({title: nextProps.title})
            this.axiosRequest(nextProps.title)
        }
    }
    
    render(){

        return (
            <div>
                <h1>{this.state.title}</h1>
                {this.state.text? <p>{this.state.text}</p> : ""}
            </div>
        )    
    }
}