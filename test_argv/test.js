const fs = require('fs');
const path_JSON = '../data/key.json';
const { centralairMain } = require('../air/centralAir.js');
const { panasonicMain } = require('../air/panasonic.js');
const { samsungMain } = require('../air/samsung.js');
const { samsungPowerMain } = require('../air/samsungpower.js');

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

if(argv.name === 'centralair') {
    console.log(keys)
    // centralairMain(keys)
}else if(argv.name === 'panasonic') {
    console.log(keys)
    // panasonicMain(keys)
}else if(argv.name === 'samsung') {
    if(argv.power === 'OFF'){
        console.log(keys)
        // samsungPowerMain(keys)
    }else {
        console.log(keys)
        // samsungMain(keys)
    }
}
if(argv.help) {
    console.log('Nobody --help you')
}