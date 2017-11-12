import React, { Component } from 'react'
import axios from 'axios'
import wiki from 'wikijs';
// const wiki = require('wikijs').default;


export default class Wiki extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        wiki().page('Batman')
        .then(page => console.log(page.info('alterEgo')))
        // let options = {
        //     dataType: 'jsonp',
        //     withCredentials: true,
        //     headers: {
        //         'Api-User-Agent': 'MyCoolTool/1.1 (http://example.com/MyCoolTool/; MyCoolTool@example.com) BasedOnSuperLib/1.4',
        //         'Access-Control-Allow-Origin': '*'
        //     }
        // }

        // axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=jsonp&list=search&titles=${this.props.title}`,options)
        //     .then(res => console.log(res))
    }
    
    render(){
       
        
     
        const {title} = this.props;
        return (
            <div>
                <h1>WIKI</h1>
                <h3>{title}</h3>
            </div>
        )    
    }
}