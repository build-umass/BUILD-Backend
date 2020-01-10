import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class Admin extends Component {
    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(this.props.users)
                        .reverse()
                        .filter(u => {
                            if (this.props.users[u].role > 0) {
                                return true;
                            } else return false;
                        })
                        .map((u, i) => {
                            let user = this.props.users[u];
                            return (
                                <tr>
                                    <td style={{ textAlign: "center" }}>
                                        {++i}
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        );
    }
}

export default Admin;
