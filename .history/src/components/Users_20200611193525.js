import React, { Component } from 'react';
import axios from "../components/axios.js";

export default class Users extends Component {
     constructor(props) {
        super(props);
        this.state = {
            Users: []
        };
    }
    getUsersData() {
        axios
            .get(`/users`, {})
            .then(res => {
                const data = res.data
                console.log(data)
                this.setState({  
                    23
                            ProductData: response.data  
                    24
                          }); 

            })
            .catch((error) => {
                console.log(error)
            })

    }
    componentDidMount(){
        this.getUsersData()
    }
    render() {

        return (
            <div></div>
        )
    }
}
