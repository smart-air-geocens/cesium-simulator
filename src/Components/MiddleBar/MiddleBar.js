import React, {Component} from 'react';
import Switch from "react-switch";
import {Container, Row, Col} from 'react-bootstrap';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './MiddleBar.css';

class MiddleBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            outdoorChecked: false,
            legend: false,
            pm25Gauge: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeOutdoor = this.handleChangeOutdoor.bind(this);
    }
    handleChangeOutdoor = (outdoorChecked) => {
        this.setState({
            outdoorChecked
        });
        this.props.sendingStatusOutdoor(outdoorChecked);
    }

    handleChange = name => event => {
        this.setState({[name]: !this.state[name]});
        this.props.additionalGaugeHandler(name, this.state[name]);
    };

    render() {
        return (
            // Get each ot filtering items and send them to the ParameteItems component in order to visualize them in the middle bar
            <div style={{width: "100%"}}>
                <div>
                    <div className="headerMiddleBar">
                        <p className="textHeader">Filters</p>
                    </div>

                    <Container className="itemContainerMiddleBar">
                        <Row>
                            <Col className="textStyleMiddleBar" style={{maxWidth:"100%",minWidth:"75%"}}>Send Observations:</Col>

                            <Col style={{maxWidth:"25%"}}>
                                <div style={{marginTop: '0.1em', marginRight: '-10px'}}>
                                    <Switch onColor={'#1991EA'} height={13} width={28}
                                            onChange={this.handleChangeOutdoor}
                                            checked={this.state.outdoorChecked}/>
                                </div>
                            </Col>
                        </Row>
                    </Container>

                    <FormGroup>
                        <div style={{padding: '2px 5px 2px 5px'}}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.legend}
                                        onChange={this.handleChange('legend')}
                                        value="lagend"
                                        color="primary"
                                    />
                                }
                                label={<span style={{fontSize: '12px', fontFamily: "Roboto Condensed"}}>Legend</span>}
                            />
                        </div>
                        <div style={{padding: '2px 5px 2px 5px', marginTop: '-30px'}}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.pm25Gauge}
                                        onChange={this.handleChange('pm25Gauge')}
                                        value="pm25Gauge"
                                        color="primary"
                                    />
                                }
                                label={<span style={{fontSize: '12px', fontFamily: "Roboto Condensed"}}>PM2.5 Gauge</span>}
                            />
                        </div>
                    </FormGroup>
                </div>
            </div>
        );
    }
}


export default MiddleBar;
