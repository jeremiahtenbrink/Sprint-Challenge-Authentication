import React, { Component }                                from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import api
                                                           from "../../api/apiRequest";

class Login extends Component {
    
    state = {
        username: "",
        password: "",
    };
    
    render() {
        return (
            <Row>
                <Col sm={ 12 } md={ { size: 6, offset: 3 } }>
                    <Form onSubmit={ this.login }>
                        <FormGroup>
                            <Label for={ "username" }>Username</Label>
                            <Input type={ "text" } name={ "username" }
                                   onChange={ this.onChange }/>
                            <Label for={ "password" }>Password</Label>
                            <Input type={ "password" } name={ "password" }
                                   onChange={ this.onChange }/>
                            <Button color={ "primary" }
                                    type={ "submit" }>Login</Button>
                        </FormGroup>
                        { this.state.err && <p>{ this.state.err }</p> }
                    </Form>
                </Col>
            </Row>
        );
    }
    
    onChange = e => {
        this.setState( { [ e.target.name ]: e.target.value } );
    };
    
    login = e => {
        e.preventDefault();
        api.post( "/login", this.state ).then( res => {
            if ( res.data.token ) {
                localStorage.setItem( "auth-token", res.data.token );
                this.props.history.push( "/jokes" );
            }
        } ).catch( err => {
            this.setState( { err: err.message } );
        } );
    };
}

export default Login;