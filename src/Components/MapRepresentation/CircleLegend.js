import React from 'react';
import {Color} from "cesium";
import {Container, Row, Col} from 'react-bootstrap';


let colors = [Color.CHARTREUSE, Color.GOLD, Color.GOLDENROD, Color.CRIMSON,
    Color.BLUEVIOLET, Color.BROWN];
let legendContents=[{"color":Color.CHARTREUSE, "status":"Good"},
    {"color":Color.GOLD, "status":"Moderate"},
    {"color":Color.GOLDENROD, "status":"Unhealthy for Sensitive Groups"},
    {"color":Color.CRIMSON, "status":"Unhealthy"},
    {"color":Color.BLUEVIOLET, "status":"Very Unhealthy"},
    {"color":Color.BROWN, "status":"Hazardous"},
]

const CircleLegend = () => {
    let circleStyle = {
        // padding:10,
        // margin:20,
        display:"inline-block",
        backgroundColor: color,
        borderRadius: "50%",
        width:15,
        height:15,
    }
    let renderData=[];
    let content = legendContents.map(legendContent => {
        return(
                <Row>
                    <Col>legendContent.</Col>
                    <Col/>
                    <Col >
                        <div style={{marginTop:'0.1em'}}>
                            <p>red</p>
                        </div>
                    </Col>
                </Row>
        )
    })
    return <div style={circleStyle}>
    </div>
}
