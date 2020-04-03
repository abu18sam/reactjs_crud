import React, { Component } from 'react';

import { Modal, ModalBody, Form, ModalHeader, ModalFooter, FormGroup, Input, Col, Row, Label } from 'reactstrap';

let baseUrl = "https://reqres.in/api/";

export default class CRUD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersList: [],
            viewType: "add",
            isOpenModal: false,
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

    }

    handleView = (user) => {

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
                <Modal isOpen={isOpenModal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        {viewType == "add" ? "Add User" : "Edit User"}
                    </ModalHeader>

                    <ModalBody>
                        <Form>
                            <Row>
                                <FormGroup>
                                    <Col><Label for="email">Email</Label></Col>
                                    <Col><Input type="email" name="email" id="email" placeholder="email" /></Col>
                                </FormGroup>
                            </Row>
                        </Form>

                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}