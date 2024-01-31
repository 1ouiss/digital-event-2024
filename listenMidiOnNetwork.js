const easymidi = require("easymidi");

const availableOutputs = easymidi.getOutputs();
const availableInputs = easymidi.getInputs();

console.log(availableInputs)

const output = new easymidi.Output("Réseau leo-theo", false);
// const input = new easymidi.Input("MPKmini2", false);

const networkInput = new easymidi.Input("Réseau leo-theo", false);

// const logigProInput = new easymidi.Input("Sortie virtuelle Logic Pro Trial", false);

const mpkInput = new easymidi.Input("MPKmini2", false);

console.log(availableInputs)

// const akaiInput = new easymidi.Input("LPD8", false);

// input.on("noteon", (msg) => {
//     console.log("input1", availableOutputs, availableInputs);
//     output.send('noteon', {
//         note: msg.note,
//         velocity: msg.velocity,
//         channel: 10,
//         targetId: 2
//     })
// });

networkInput.on("noteon", (msg) => {
    console.log(msg);
})

mpkInput.on("cc", (msg) => {
    console.log("input3", msg);
})

// logigProInput.on("noteon", (msg) => {
//     console.log("input3", availableOutputs, availableInputs);
// })
//
// akaiInput.on("noteon", (msg) => {
//     console.log("input4", availableOutputs, availableInputs);
// })