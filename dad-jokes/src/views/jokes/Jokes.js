import React, { Component } from "react";
import { Container, Row }   from "reactstrap";
import api                  from "../../api/apiRequest";
import Card                 from "reactstrap/es/Card";
import Joke                 from "./Joke";

class Jokes extends Component {
    
    state = {
        jokes: []
    };
    
    render() {
        return (
            <Container>
                <Row>
                    { this.getViewContent() }
                </Row>
            </Container>
        );
    }
    
    getViewContent = () => {
        return this.state.jokes.map( joke => {
            return <Joke joke={ joke }/>;
            
        } );
    };
    
    componentDidMount() {
        
        api.get( "/jokes" ).then( res => {
            
            this.setState( { jokes: res.data } );
        } ).catch( err => {
            
            console.log( err );
        } );
    }
}

export default Jokes;