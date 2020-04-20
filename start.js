const {exec} = require("child_process");


argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('appName', 'start the server', (yargs) => {
        yargs
            .positional('name', {
                describe: 'Application name to display',
                // default: 'appName',
                type: 'string'
            })
    })
    .command('walkingValue', 'set a config walking value', (yargs) => {
        yargs
            .positional('name', {
                describe: 'step size as the walking value in Random Walk technique',
                // default: 10,
                type: 'double'
            })
    })
    .argv

exec("set \"REACT_APP_USR_NAME=" + argv.appName +"\" && set \"REACT_APP_WALKING_STEP=" + argv.walkingValue +"\" && npm start\n")
