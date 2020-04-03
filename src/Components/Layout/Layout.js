// This component is responsible to get new observation and send it to the desired components
// Also, the appearance of the main page is configured in this component through its css styling file
import React from 'react';
import classes from './Layout.module.css';
import SideBar from "../SideBar/SideBar";
import Auxiliary from '../hoc/Auxiliary'
import withClass from "../hoc/withClass";
import Toolbar from "../Toolbar/Toolbar";
import Backdrop from "../Backdrop/Backdrop";
import MiddleBar from "../MiddleBar/MiddleBar";
import MapCesium from "../MapRepresentation/MapCesium";
import 'react-dropdown/style.css'


class layout extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            sidebarOpen: false,
            selected: ''
        }

    }



    // Click handler for the sliding menu
    sidebarToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sidebarOpen: !prevState.sidebarOpen};
        });
    };

    // How to hide the sliding menu bar
    backdropClickHandler =() => {
        this.setState({sidebarOpen:false})
    };


    render() {
        let backdrop;

        if(this.state.sidebarOpen){
            backdrop = <Backdrop click={this.backdropClickHandler}/>;
        }
        return (
            <Auxiliary>
                {/*<div style={{'height':'100%'}}>*/}
                <div >
                    <Toolbar sidebarClickHandler={this.sidebarToggleClickHandler}/>
                    <SideBar show={this.state.sidebarOpen}/>
                    {backdrop}
                    <div className={classes.middlebar}>
                        <MiddleBar {...this.props}/>
                    </div>

                    <div className={classes.content}>
                        <MapCesium legend={this.props.legendStatus} pm25={this.props.pm25GaugeStatus} pollutantDataUpdated = {this.props.pollutantGeoJsonData}  sensorDataUpdated = {this.props.outdoorSensorsData}/>
                    </div>
                </div>
            </Auxiliary>
        );
    }

}
export default withClass(layout,classes.container);
