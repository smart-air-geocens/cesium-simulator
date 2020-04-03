import React from 'react';
import {Color} from "cesium";
import './MapCesium.css'
import {
    Viewer,
    CameraFlyTo,
    Entity,
    EntityDescription,
} from "resium";
import {Cartesian3} from "cesium";
import SensorsGeoJSONData from '../OutdoorSimulation/outdoorSensors'
import {hot} from "react-hot-loader/root";
import GeoJsonFirstCompleter from "../OutdoorSimulation/GeoJsonFirstCompleter";
import ReactTooltip from "react-tooltip";
import flyTo from '../assets/flyTo.png'

import {Container, Row, Col} from 'react-bootstrap';
import ReactSpeedometer from "react-d3-speedometer";


class MapCesium extends React.Component {
    OutdoorSensorsData;
    camera;
    pm25Gauge;
    legendContents = [{"color": "#7FFF00", "status": "Good"},
        {"color": "#FFD700", "status": "Moderate"},
        {"color": "#DAA520", "status": "Unhealthy for Sensitive Groups"},
        {"color": "#DC143C", "status": "Unhealthy"},
        {"color": "#8A2BE2", "status": "Very Unhealthy"},
        {"color": "#A52A2A", "status": "Hazardous"},
    ]

    constructor(props) {
        super(props);
        this.OutdoorSensorsData = GeoJsonFirstCompleter("AirQ:", SensorsGeoJSONData);
        this.camera = <CameraFlyTo duration={1} destination={Cartesian3.fromDegrees(127.296377, 36.547708, 60000)}/>;
        this.state = {
            clickedSensorID: 0,
            selected: '',
            camera:null,
        }
    }

    flyTo = () => {
        this.camera = <CameraFlyTo duration={0.1} destination={Cartesian3.fromDegrees(127.296377, 36.547708, 60000)}/>;
        this.forceUpdate();
    }

    sensorClickHandler = (e) => {
        this.setState({clickedSensorID: e})
    }


    render() {

        let entitySet = <div>
            {this.props.pollutantDataUpdated.features.map(entity => {
                return (
                    <Entity key={entity.properties.id} name={entity.properties.name}
                            position={Cartesian3.fromDegrees(entity.geometry.coordinates[0], entity.geometry.coordinates[1], 0)}
                            point={{pixelSize: entity.properties.size, color: entity.properties.color}}>
                        <EntityDescription>
                            <div>
                                <p>PM2.5 Value: {entity.properties.value}</p>
                                <p>Status: {entity.properties.status}</p>
                            </div>
                        </EntityDescription>
                    </Entity>
                )
            })}
        </div>

        let sensorSet = <div>
            {this.props.sensorDataUpdated.features.map(sensor => {
                return (
                    <Entity key={sensor.properties.id} name={sensor.properties.name}
                            position={Cartesian3.fromDegrees(sensor.geometry.coordinates[0], sensor.geometry.coordinates[1], 0)}
                            point={{
                                pixelSize: sensor.properties.size,
                                color: sensor.properties.color,
                                outlineWidth: 1,
                                outlineColor: Color.WHITE
                            }} onClick={() => this.sensorClickHandler(sensor.properties.id)}>
                        <EntityDescription>
                            <div>
                                <p>PM2.5 Value: {Number((sensor.properties.value).toFixed(4))}</p>
                                <p>Status: {sensor.properties.status}</p>
                                {/*<a target="_blank" href="https://ucalgary-sandbox-01.sensorup.com/display/v1.0/Things">Click</a>*/}
                            </div>
                        </EntityDescription>
                    </Entity>
                )
            })}
        </div>


        let legendRows =
            <Container style={{width: "200px"}} className='legend'>
                <Row>
                    <Col style={{fontSize: "20px", fontWeight: "600"}}>Legend</Col>
                </Row>
                <hr style={{marginTop: "5px", marginBottom: "5px", backgroundColor: "black"}}/>
                {this.legendContents.map((legendContent, index) => {
                    let circleStyle = {
                        backgroundColor: legendContent.color,
                        borderRadius: "50%",
                        width: 10,
                        height: 10,
                    }
                    return (
                        <Row key={index}>
                            <Col xs={9} style={{fontSize: "12px", fontWeight: "600"}}>{legendContent.status}</Col>
                            <Col>
                                <div style={circleStyle}/>
                            </Col>
                        </Row>
                    )
                })}
            </Container>
        this.pm25Gauge = <div className='gauge'>
            <ReactSpeedometer style={{fontFamily: "Open Sans"}}
                              maxValue={500}
                              minValue={0}
                              value={this.props.sensorDataUpdated.features[this.state.clickedSensorID].properties.value ? Number((this.props.sensorDataUpdated.features[this.state.clickedSensorID].properties.value).toFixed(2)) : 0}
                              currentValueText='PM2.5 Measurement (ug/m3): ${value}'
                              textColor={"white"}
                              needleColor="#D8DEE9"
                              ringWidth={20}
                              width={250}
                              height={250}
                              needleHeightRatio={0.75}
                              needleTransitionDuration={200}
                              valueTextFontSize="12px"
                              customSegmentStops={[0, 50, 100, 150, 200, 300, 500]}
                              segmentColors={[
                                  "#7FFF00",
                                  "#FFD700",
                                  "#DAA520",
                                  "#DC143C",
                                  "#8A2BE2",
                                  "#A52A2A"
                              ]}
                              maxSegmentLabels={0}
            />
        </div>

        return (
            <div>
                {(this.props.legend)?legendRows:null}
                {(this.props.pm25)?this.pm25Gauge:null}
                <div className="flyto">
                    <img data-tip data-for='flyto' src={flyTo} alt={"FlyTo"} className="flyto icon" onClick={this.flyTo}/>
                    <ReactTooltip id='flyto' type='light'>
                        <span>Fly To</span>
                    </ReactTooltip>
                </div>
                <Viewer className='viewer'>
                    {this.camera}
                    {entitySet}
                    {sensorSet}
                </Viewer>
            </div>
        );
    }
}

export default hot(MapCesium);

