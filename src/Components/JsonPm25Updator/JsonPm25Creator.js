const JsonPm25Creator = (geoJsonTemplate) => {
    let jsonPm25Array = [];
    geoJsonTemplate.features.map(feature => {
        jsonPm25Array.push({"SensorID": feature.properties.id, "pm25": null})
        return null;
    })

    return jsonPm25Array
}

export default JsonPm25Creator;
