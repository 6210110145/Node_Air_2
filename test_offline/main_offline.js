const fs = require('fs');
const path_JSON = '../data/key.json';
const { sendSignal } = require('./air.js')

var keys = JSON.parse(fs.readFileSync(path_JSON));

var argv = require('minimist')(process.argv.slice(2), {
    string: ['name', 'power', 'mode', 'swing', 'sleep', 'turbo', 'quiet', 'light'],
    boolean: ['help'],
    number: ['temp', 'fan'],
    alias: {n: 'name', t: 'temp', f: 'fan', m: 'mode', p: 'power', h: 'help'},
    unknown: () => {
        console.log('Unkown argument\nprint --help for Help')
    }
});

mainOffline = () => {
    if(argv.name) {
        keys.Name = argv.name
    }
    if(argv.power) {
        keys.Power = argv.power
    }
    if(argv.mode) {
        keys.Mode = argv.mode
    }
    if(argv.temp) {
        keys.Temp = argv.temp
    }
    if(argv.fan == 0 || argv.fan) {
        keys.Fan = argv.fan
    }
    if(argv.swing) {
        keys.Swing = argv.swing
    }
    if(argv.sleep) {
        keys.Sleep = argv.sleep
    }
    if(argv.turbo) {
        keys.Turbo = argv.turbo
    }
    if(argv.quiet) {
        keys.Quiet = argv.quiet
    }
    if(argv.light) {
        keys.Light = argv.light
    }

    let newKey = JSON.stringify(keys, null, 2)

    fs.writeFileSync(path_JSON, newKey);

    if(argv.name) {
        sendSignal(argv.name)
    }

    if(argv.help) {
        console.log('Nobody --help you')
    }
}

mainOffline()