import {Color} from "cesium";
const OccupancyColor = (occupancyValue) => {
    let color;
    if (occupancyValue === 0)
        color = Color.WHITE;
    else if(occupancyValue === 1)
        color = Color.BLUE;
    else if(occupancyValue === 2)
        color = Color.GREEN;
    else if(occupancyValue === 3)
        color = Color.RED;
    else if(occupancyValue > 3 && occupancyValue <= 4)
        color = Color.YELLOW;
    else if(occupancyValue > 4 && occupancyValue <= 6)
        color = Color.ORANGE;
    else if(occupancyValue > 6 && occupancyValue <= 8)
        color = Color.BROWN;
    else
        color = Color.RED;
    return color

}
export default OccupancyColor;
