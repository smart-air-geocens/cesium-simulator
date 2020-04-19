const { exec } = require("child_process");

argv = require('yargs')
    .command('$0 [name]', 'start the server',(yargs) => {
        yargs
            .positional('name', {
                describe: 'name to display',
                default: 'world'
            })

    }, (argv) => {
        console.log(`Hello ${argv.name}!`)
    })
    .command('[walkingValue]', 'set a config walking value',(yargs) => {
        yargs
            .positional('walkingValue', {
                describe: 'step size as the walking value in Random Walk technique',
                default: 10
            })

    }, (argv) => {
        console.log(`Walking Value is ${argv.walkingValue}`)
    })

    .argv


exec("set \"REACT_APP_USR_NAME=" + argv.name +"\" && set \"REACT_APP_WALKING_STEP=" + argv.walkingValue +"\" && npm start\n")
