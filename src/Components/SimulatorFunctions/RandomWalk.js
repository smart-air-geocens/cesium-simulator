const RandomWalk = (latestValue, minimum, maximum,walkingValue) => {

    if(Math.random() >= 0.5)
        latestValue += walkingValue;
    else
        latestValue -= walkingValue;
    if(latestValue > maximum )
        latestValue = maximum;
    if(latestValue < minimum)
        latestValue = minimum;
    return latestValue;

}
export default RandomWalk;
