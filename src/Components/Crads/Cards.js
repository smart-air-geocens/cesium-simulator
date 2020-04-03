import React from 'react';
import './Cards.css';
import handle from '../assets/handle.svg';
import { Container, Row, Col } from 'react-bootstrap';

const Cards = (props) => {
    return(
        <Container className="itemContainer">
            <Row >
                <Col className="textStyle">{props.title}</Col>
                <Col className="textStyle">{props.value}</Col>
            </Row>
        </Container>
    );
}
export default Cards;
