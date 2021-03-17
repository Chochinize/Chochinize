const PubNub = require('pubnub');
const uuid = PubNub.generateUUID();
const pubnub = new PubNub({
    publishKey: "pub-c-7c1a81c7-7932-4113-a3c1-9696b9100aa9",
    subscribeKey: "sub-c-a5ed9cb0-8494-11eb-99bb-ce4b510ebf19",
    uuid: uuid,
});


var channel = "pubnub_onboarding_channel";
var temp = 0;
var temp2 = 0;
var temp3 = 0;


// function publish() {


//     var data_income = {

//         'temperature': temp,
//         'fahrenheit': temp2,
//         'kelvin': temp3

//     };

//     pubnub.publish({
//         message: data_income,
//         channel: channel,
//     }).then((response) => {
//         console.log(response)
//     }).catch((error) => {
//         console.log(error)
//     });


// }


// function publish(){

//     var data = {

//         temperature: 'temp',
//         fahrenheit: 'temp2',
//         kelvin: 'temp3'

//     };
//         pubnub.publish({
//             message : data,
//             channel: 'my_chanel' 
//         }).then((response) =>{
//             console.log(response)
//         }).catch((error) => {
//             console.log(error)
//         })
//     };


function publish(){
    var data = {
        'temperature': temp,
        'fahrenheit' : temp2,
        'kelvin': temp3,
    };
    pubnub.publish({
        channel: channel,
        message: data,
    });
}
function subscribe(){

    pubnub.subscribe({
        channel: channel,
        withPresence: true,
    });
}




//THERMOMETHER 
const {
    Board,
    Thermometer
} = require("johnny-five");
const board = new Board();

board.on("ready", () => {
    const thermometer = new Thermometer({
        controller: "TMP36",
        freq: 3000,
        pin: "A0"
    });


    
    thermometer.on("data", function () {
            const {celsius, fahrenheit, kelvin} = thermometer;
        console.log('Celsius:' + this.celsius + 'C°');
        console.log('Fahrenheit:' + this.fahrenheit + 'F');
        console.log('Kelvin:' + this.kelvin + 'K');
        console.log("--------------------------------------");
        temp = this.celsius;
        temp2 = this.fahrenheit;
        temp3 = this.kelvin;
    });
    // thermometer.on("data", () => {
    //     const {celsius, fahrenheit, kelvin} = thermometer;
    //     console.log("  celsius      : ", celsius + '°C');
    //     console.log("  fahrenheit   : ", fahrenheit + '°F');
    //     console.log("  kelvin       : ", kelvin +'K');
    //     console.log("--------------------------------------");
    //     temp = this.celsius;
    //     temp2 = this.fahrenheit;
    //     temp3 = this.kelvin;
    // });
    setInterval(publish, 3000);
    setInterval(subscribe, 3000);
});