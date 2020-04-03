const JsonUpdater =(newObservations) => {

    let templateJson = {
        "common": {
            "Datastream": {
                "Thing": {
                    "name": null,
                    "description": null,
                    "Locations": [{
                        "name": "",
                        "description":"",
                        "location": {
                            "type": "Point",
                            "coordinates": [ 0, 0 ]
                        }
                    }]
                }
            }
        },
        "Observations": []
    };

    if (newObservations.ThingName != null){
        templateJson.common.Datastream.Thing.name = newObservations.ThingName;
        templateJson.common.Datastream.Thing.description = newObservations.ThingDescription;
    };

    if (newObservations.location != null){
        templateJson.common.Datastream.Thing.Locations[0].name = newObservations.ThingName;
        templateJson.common.Datastream.Thing.Locations[0].description = newObservations.ThingDescription;
        templateJson.common.Datastream.Thing.Locations[0].location.coordinates[0] = newObservations.location[0];
        templateJson.common.Datastream.Thing.Locations[0].location.coordinates[1] = newObservations.location[1];
    };

    if (newObservations.occupancy != null){
        templateJson.Observations.push(
            {
                "result": newObservations.occupancy,
                "Datastream": {
                    "name": newObservations.ThingName + "_occupancy",
                    "ObservedProperty": "occupancy",
                    "Sensor": newObservations.ThingName + "-occupancy-sensor",
                    "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_CountObservation"
                }
            }
        );
    };


    // if (newObservations.pm25 != null){
    //     jsonTemplate.Observations.push(
    //         {
    //             "result": newObservations.pm25,
    //             "Datastream": {
    //                 "name": newObservations.ThingName + "_pm2.5",
    //                 "ObservedProperty": "pm25",
    //                 "Sensor": newObservations.ThingName + "-pm2.5-sensor",
    //                 "unitOfMeasurement": {
    //                     "symbol": "ug/m3"
    //                 }
    //             }
    //         }
    //     );
    // }
    // if (newObservations.temperature != null){
    //     jsonTemplate.Observations.push(
    //         {
    //             "result": newObservations.temperature,
    //             "Datastream": {
    //                 "name": newObservations.ThingName + "_temperature",
    //                 "ObservedProperty": "temperature",
    //                 "Sensor": newObservations.ThingName + "-temperature-sensor",
    //                 "unitOfMeasurement": {
    //                     "symbol": "degC"
    //                 }
    //             }
    //         }
    //     );
    // }

    // console.log(completedJson)
    return  templateJson
    // return newObservations.ThingName;
}

export default JsonUpdater;
