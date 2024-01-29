const easymidi = require("easymidi");
const outputName = "IAC MIDI Virtual Bus1";
const output = new easymidi.Output(outputName);

async function sendMIDI() {
  for (let index = 0; index < 128; index++) {
    console.log(index);
    output.send("cc", {
      controller: 11, // Type du controlleur
      value: index, // Valeur de 0 à 127
      channel: 0, // Changez le numéro du canal MIDI si nécessaire
    });
    await wait(50); // Utilise await pour attendre que la promesse soit résolue
  }
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Appelle la fonction asynchrone
sendMIDI();
