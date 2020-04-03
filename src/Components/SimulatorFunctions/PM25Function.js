import RandomWalk from "./RandomWalk";
const PM25Function = (latestValue) => {
    let max = 500;
    let min = 0 ;
    let walkingValue = 20;
    let randomCategory;

    if (latestValue == null) {
        randomCategory = Math.floor(Math.random() * 6) + 1;
        switch (randomCategory) {
            case 1:{
                min = 0;
                max = 50;
                break
            }
            case 2:{
                min = 50;
                max = 100;
                break
            }
            case 3:{
                min = 100;
                max = 150;
                break
            }
            case 4:{
                min = 150;
                max = 200;
                break
            }
            case 5:{
                min = 200;
                max = 300;
                break
            }
            default:{
                min = 300;
                max = 500;
                break
            }
        }
        latestValue = ((min + max) / 2);
    }
    let randomWalkValue = RandomWalk(latestValue, min, max, walkingValue);
    return randomWalkValue;
}
export default PM25Function;
