import React, { Component } from 'react';

export default class CRUD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersList: [],
        }
    }

    componentDidMount() {
        this.getUsersList();
    }

    async getUsersList() {
        let data = await fetch("https://reqres.in/api/users?page=1");
        let users = await data.json();
        console.log("usersList=> ", users);
        this.setState({ usersList: users.data }, () => console.log("usersList=> ", this.state.usersList));
    }

    handleEdit = async (user) => {

    }

    handleView = (user) => {

    }

    handleDelete = async (user) => {

    }

    render() {

        let { usersList } = this.state;

        const TableRow = (props) => {
            return (
                <tr >
                    <td>{props.user.id}</td>
                    <td>{props.user.email}</td>
                    <td>{props.user.first_name}</td>
                    <td>{props.user.last_name}</td>
                    <td><img src={props.user.avatar} alt="avatar" /></td>
                    <td>
                        <div className="row" style={{ width: '100%', justifyContent: 'space-between' }}>
                            <i class="fa fa-eye action-icon" aria-hidden="true" onClick={() => this.handleView(props.user)} />
                            <i class="fa fa-pencil action-icon" aria-hidden="true" onClick={() => this.handleEdit(props.user)} />
                            <i class="fa fa-trash action-icon" aria-hidden="true" onClick={() => this.handleDelete(props.user)} />
                        </div>
                    </td>
                </tr>
            )
        }

        return (
            <div className="container">
                <div className="row text-right p-3">
                    <button type="button" class="btn btn-success">Add User</button>
                </div>
                <div className="row">

                    <table className="table-responsive user-table">
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Email</td>
                                <td>First Name</td>
                                <td>Last Name</td>
                                <td>Avatar</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usersList.map((user, index) => {
                                    return (<TableRow user={user} />);
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}