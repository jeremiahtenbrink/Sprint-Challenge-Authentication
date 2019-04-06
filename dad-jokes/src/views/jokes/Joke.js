import React               from "react";
import CardText            from "reactstrap/es/CardText";
import { Card, CardTitle } from "reactstrap";
import Col                 from "reactstrap/es/Col";
import "./jokes.scss";

const Joke = props => {
    const { joke } = props;
    return (
        <Col sm={ 12 } md={ 6 } className={ "margin-top-large" }>
            <Card className={ "text-align-left padding-med joke" }>
                <CardText>{ joke.joke }</CardText>
            </Card>
        </Col>
    );
};

export default Joke;