import {Color} from "cesium";


const ColorLegend = (pm25) => {
    let color = null;
    let status = null;
    if(pm25 >= 0 && pm25 <= 50) {
        color = Color.CHARTREUSE;
        status = "Good"
        // geoJsonTemplate.features[index].properties.size = 5;
        // geoJsonTemplate.features[index].properties.color = Color.BLUE;
    }
    else if(pm25 > 50 && pm25 <= 100){
        color = Color.GOLD;
        status = "Moderate"
    }
    else if(pm25 > 100 && pm25 <= 150){
        color = Color.GOLDENROD;
        status = "Unhealthy for Sensitive Groups"
    }
    else if(pm25 > 150 && pm25 <= 200){
        color = Color.CRIMSON;
        status = "Unhealthy"
    }
    else if(pm25 > 200 && pm25 <= 300){
        color = Color.BLUEVIOLET;
        status = "Very Unhealthy"
    }
    else if(pm25 > 300){
        color = Color.BROWN;
        status = "Hazardous"
    }
    return [color,status]
}

export default ColorLegend;
