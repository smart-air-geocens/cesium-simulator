
const GeoJsonFirstCompleter = (type,geojsonTemplate) => {
    for (let i =0 ; i< geojsonTemplate.features.length; i++){
        geojsonTemplate.features[i].properties = {
            "id": i,
            "name": type + i,
            "color":null,
            "status":null,
            "size": 10,
            "popupContent": "The live information of " + type + " #" + i,
            "value":0
        }
    }
    return geojsonTemplate;

}
export default GeoJsonFirstCompleter;
