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
                const users = data.map(u =>
                    <div>
                    <p>{u.acct_doc_header_id}</p>
                    {this.state.users}
                    </div>
                    )
this.setState({users})

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