import PM25Function from "../SimulatorFunctions/PM25Function";
import ColorLegend from "./ColorLegend";

const JsonPm25Updator = async (jsonPm25Array,geoJsonTemplate) => {
    jsonPm25Array.map(async (sensor,index) => {
        sensor.pm25 =  await PM25Function(sensor.pm25); // Here an observation based on random walk will be assigned to the sensor
        geoJsonTemplate.features[index].properties.value = sensor.pm25;
        geoJsonTemplate.features[index].properties.color = ColorLegend(sensor.pm25)[0]
        geoJsonTemplate.features[index].properties.status = ColorLegend(sensor.pm25)[1]
    })
    return [jsonPm25Array,geoJsonTemplate];
}
export default JsonPm25Updator;
