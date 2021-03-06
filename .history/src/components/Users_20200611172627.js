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
            .get(`/Users`, {})
            .then(res => {
                const data = res.data
                
                console.log(data)
                const users = data.map(u =>
                    <div>
                    <p>{u.id}</p>
                    <p>{u.name}</p>
                    <p>{u.email}</p>
                    <p>{u.website}</p>
                    <p>{u.company.name}</p>
                    </div>
                    )

                    this.setState({
                        users
                    })

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