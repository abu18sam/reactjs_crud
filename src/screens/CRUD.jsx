import React, { Component } from 'react';

import { Modal, ModalBody, Form, ModalHeader, ModalFooter, FormGroup, Input, Col, Row, Label, Button } from 'reactstrap';

let baseUrl = "https://reqres.in/api/";

export default class CRUD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersList: [],
            viewType: "add",
            isOpenModal: false,
            email: "",
            job: "",
            first_name: "",
            last_name: "",
            name: '',
            password: '',
            userId: '',
        }
    }

    componentDidMount() {
        this.getUsersList();
    }

    async getUsersList() {
        let data = await fetch(baseUrl + "users?page=1");
        let users = await data.json();
        this.setState({ usersList: users.data });
    }

    handleEdit = async (user) => {
        this.setState({ name: user.first_name + " " + user.last_name, userId: user.id, viewType: "edit" }, () => this.setState({ isOpenModal: true }))
    }

    handleView = (user) => {
        this.setState({ name: user.first_name + " " + user.last_name, userId: user.id, viewType: "view" }, () => this.setState({ isOpenModal: true }))
    }

    handleDelete = async (user) => {
        let url = `${baseUrl}users/${user.id}`;
        let response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        });
        let data = await response.json();
        if (data) {
            alert("User Deleted Successfully")
        }
        console.log('response=> ', data);
    }

    toggleModal = () => {
        this.setState(prevState => ({ isOpenModal: !prevState.isOpenModal }));
    }

    handleInput = (key, e) => {
        console.log('key=> ', key, " value=> ", e.target.value);
        this.setState({ [key]: e.target.value })
    }

    handleSubmit = async () => {
        let obj = {
            "name": this.state.name,
            "job": this.state.job,
        }
        let url = `${baseUrl}users`;
        if (this.state.viewType == "add") {

            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(obj)
            });
            let data = await response.json();
            if (data.id) {
                this.setState({ isOpenModal: false });
                alert("user created with id " + data.id);
            }
            else {
                alert("Please try again later");
            }

        }
        else {
            let response = await fetch(`${url}/${this.state.userId}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(obj)
            });
            let data = await response.json();
            if (data.updatedAt) {
                this.setState({ isOpenModal: false });
                alert("user updated at time " + new Date(data.updatedAt).toString());
            }
            else {
                alert("Please try again later");
            }
            
        }
    }

    render() {

        let { usersList, viewType, isOpenModal } = this.state;

        console.log("states==> ", isOpenModal);

        const TableRow = (props) => {
            return (
                <tr >
                    <td>{props.user.id}</td>
                    <td>{props.user.email}</td>
                    <td>{props.user.first_name}</td>
                    <td>{props.user.last_name}</td>
                    <td><img src={props.user.avatar} alt="avatar" /></td>
                    <td>
                        <div className="row" style={{ width: '100%', minWidth: '100px', paddingLeft: "20px", justifyContent: 'space-between' }}>
                            <i class="fa fa-eye action-icon" aria-hidden="true" onClick={() => this.handleView(props.user)} />
                            <i class="fa fa-pencil action-icon" aria-hidden="true" onClick={() => this.handleEdit(props.user)} />
                            <i class="fa fa-trash action-icon" aria-hidden="true" onClick={() => this.handleDelete(props.user)} />
                        </div>
                    </td>
                </tr>
            )
        }

        return (
            <div>


                <div className="container">
                    <div className="row text-right p-3">
                        <button type="button" onClick={this.toggleModal} class="btn btn-success">Add User</button>
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
                {/* Add Modal */}
                <Modal style={{ zIndex: '99999' }} isOpen={isOpenModal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        {viewType == "add" ? "Add User" : "Edit User"}
                    </ModalHeader>

                    <ModalBody>
                        <Form>
                            <Row>
                                <FormGroup>
                                    <Col><Label for="name">Name</Label></Col>
                                    <Col><Input type="name" name="name" id="name" value={this.state.name} onChange={e => this.handleInput('name', e)} placeholder="Name" /></Col>
                                </FormGroup>
                            </Row>
                            <Row>
                                <FormGroup>
                                    <Col><Label for="job">Job</Label></Col>
                                    <Col><Input type="job" name="job" id="job" value={this.state.job} onChange={e => this.handleInput('job', e)} placeholder="Job" /></Col>
                                </FormGroup>
                            </Row>
                        </Form>

                    </ModalBody>

                    <ModalFooter>
                        <button type="button" onClick={this.handleSubmit} class="btn btn-success">Submit</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}