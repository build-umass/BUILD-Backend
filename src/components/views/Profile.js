import React, { Component } from "react";
import app from "../../firebase/base";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Menu from "./Nav";

class Profile extends Component {
    state = {};

    getFile = e => {
        console.log(e.target.files[0]);
        this.setState({ file: e.target.files[0] });
    };

    uploadFile = () => {
        console.log(this.state.file.name);
        const image = this.state.file;
        const storage = app.storage();

        if (this.state.imgSrc) {
            console.log("del test");
            storage
                .ref()
                .child(`userImages/${this.state.uid}`)
                .delete();
        }

        storage
            .ref(`userImages/${this.state.uid}`)
            .put(image)
            .then(() => {
                var img = storage.ref().child(`userImages/${this.state.uid}`);
                img.getDownloadURL().then(url => {
                    this.setState({ imgSrc: url });
                    let db = app.firestore();

                    db.collection("users")
                        .doc(this.state.dbRef)
                        .set(
                            {
                                imgSrc: this.state.imgSrc
                            },
                            { merge: true }
                        );
                });
            });
    };

    componentWillMount = () => {
        this.setState(this.props.location.state);
    };

    render() {
        return (
            <>
                <Menu />
                <Container>
                    <div style={{ marginTop: "1em" }}>
                        <Row>
                            <Col style={middle}>
                                <Image
                                    src={this.state.imgSrc || "/img/pp.jpg"}
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                        objectFit: "cover"
                                    }}
                                    roundedCircle
                                    thumbnail
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>Welcome, {this.state.name}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h6>This is your profile</h6>
                                <p>{this.state.email}</p>
                                <p>{this.state.uid}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <Button variant="warning">Edit Profile</Button>
                            </Col>
                            <Col md={3}>
                                <Button variant="danger">Delete Account</Button>
                            </Col>
                            <Col>
                                <input
                                    type="file"
                                    id="inputGroupFile"
                                    onChange={this.getFile}
                                />
                                <Button
                                    variant="primary"
                                    onClick={this.uploadFile}
                                >
                                    Upload
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </>
        );
    }
}

const middle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

export default Profile;
