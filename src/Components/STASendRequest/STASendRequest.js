import axios from 'axios';

const STASendRequest = (sampleJson) => {
    const username = 'main';
    const password = '962ab9fe-27fe-5a83-8bbf-8d58ef9d5795';
    var basicAuth = 'Basic ' + btoa(username + ':' + password);
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': basicAuth
    }
    axios.post("/s/Observations",sampleJson, {headers: headers})
        .then(response => {

    }).catch(function(error) {
        console.log('Error on Authentication');
    });
}
export default STASendRequest;
