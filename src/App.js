import React, {Component} from 'react';
import './App.css';
import Layout from './Components/Layout/Layout';
import STASendRequest from "./Components/STASendRequest/STASendRequest";
import JsonPm25Creator from "./Components/JsonPm25Updator/JsonPm25Creator";
import outdoorPollutantData from './Components/OutdoorSimulation/gridPointsLine'
import outdoorSensorsData from './Components/OutdoorSimulation/outdoorSensors'
import GeoJsonFirstCompleter from "./Components/OutdoorSimulation/GeoJsonFirstCompleter";
import JsonPm25Updator from "./Components/JsonPm25Updator/JsonPm25Updator";
import Pm25IDWCalculator from "./Components/JsonPm25Updator/Pm25IDWCalculator";
import JsonUpdatorOutdoor from './Components/JsonUpdater/JsonUpdatorOutdoor';


const timeIntervalOutdoor = 10000; // Every 10 seconds observations will be updated
let geoJsonCompletedTemplateUkSensors;


class App extends Component {
    constructor(props) {
        super(props);

        let App_name = process.env.REACT_APP_USR_NAME
        let walkingStep = process.env.REACT_APP_WALKING_STEP
        console.log(App_name)
        console.log(walkingStep)

        let geoJsonCompletedTemplateKSensors = GeoJsonFirstCompleter("Known Sensor", outdoorPollutantData); // This line is for updating the property of each sensor (26 sensors) with id, name and so on
        geoJsonCompletedTemplateUkSensors = GeoJsonFirstCompleter("AirQ:", outdoorSensorsData); // This line fill up properties for 5 unknown locations (Real monitoring stations)

        let jsonPm25Array = JsonPm25Creator(geoJsonCompletedTemplateKSensors);

        this.state = {
            sendingStatusOutdoor: false, //initial state for pushing observations to the STA
            JsonPm25Array: jsonPm25Array,
            geoJsonUpdatedTemplate: geoJsonCompletedTemplateKSensors,
            geoJsonUpdatedTemplateOutdoorSensors: geoJsonCompletedTemplateUkSensors,
            legend: false, //Initial state of showing the legend
            pm25Gauge: false //Initial state of showing the PM2.5 gauge
        }
    }

    // This function control showing or hiding widgets (i.e., legend and pm2.5 gauge)
    additionalGaugeStatus = async (name, status) => {
        await this.setState({[name]: !status})
    }


    // This function control starting or pausing sending observations to the STA
    toggleButtonHandlerOutdoor = (status) => {
        this.setState({
            sendingStatusOutdoor: status
        });
    };

    async componentDidMount() {

        this.interval = setInterval(async () => {

            // Here observations of KSs and USs will be updated based on Random Walk and IDW respectively
            await JsonPm25Updator(this.state.JsonPm25Array, this.state.geoJsonUpdatedTemplate).then(async response1 => {
                await Pm25IDWCalculator(geoJsonCompletedTemplateUkSensors, response1[1]).then(async response2 => {
                    await this.setState({
                        JsonPm25Array: response1[0],
                        geoJsonUpdatedTemplate: response1[1],
                        geoJsonUpdatedTemplateOutdoorSensors: response2
                    })
                });
            });

            await this.state.geoJsonUpdatedTemplateOutdoorSensors.features.map(async sensor => {
                let jsonResponseOutdoor = await JsonUpdatorOutdoor({
                    "ThingName": sensor.properties.name,
                    "ThingDescription": "The outdoor " + sensor.properties.name + " is a synthetic sensor for measuring PM2.5",
                    "location": sensor.geometry.coordinates,
                    "pm25": sensor.properties.value
                });
                if (jsonResponseOutdoor) {
                    if (this.state.sendingStatusOutdoor) {
                        await STASendRequest(jsonResponseOutdoor);
                    }
                }
            })
        }, timeIntervalOutdoor);

    }


    componentWillUnmount() {
        clearInterval(this.interval); // Stop sending request for the latest observations
    }

    render() {
        return (
            <div>
                <Layout
                    legendStatus={this.state.legend}
                    pm25GaugeStatus={this.state.pm25Gauge}
                    additionalGaugeHandler={this.additionalGaugeStatus}
                    sendingStatusOutdoor={this.toggleButtonHandlerOutdoor}
                    pollutantGeoJsonData={this.state.geoJsonUpdatedTemplate}
                    outdoorSensorsData={this.state.geoJsonUpdatedTemplateOutdoorSensors}
                />
            </div>
        );
    }
}

export default App;
