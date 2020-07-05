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
            .get(`/539592086`, {})
            .then(res => {
                const data = res.data
                console.log(data)

            })
            .catch((error) => {
                console.log(erro)
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