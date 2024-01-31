const easymidi = require("easymidi");

const input = new easymidi.Input("network_test", false);
const output = new easymidi.Output("Réseau Session 1", false);

const availableOutputs = easymidi.getOutputs();

input.on("noteon", (msg) => {
  console.log(availableOutputs)
    output.send("noteon", {
        note: msg.note,
        velocity: msg.velocity,
        channel: 3,
    });
})