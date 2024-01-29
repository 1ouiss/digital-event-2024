const easymidi = require("easymidi");

const availableInputs = easymidi.getInputs();
console.log("Périphériques MIDI disponibles :", availableInputs);

// Créez une entrée MIDI en utilisant le nom de votre périphérique MIDI
const input = new easymidi.Input("IAC MIDI Virtual Bus 2");
let i = 0;
// Écoutez les messages MIDI entrants
input.on("noteon", (msg) => {
  // if (msg.note === 60 && msg.velocity === 80) {
  //   console.log("Note ON:", msg.note, "Vélocité:", msg.velocity);
  //   console.log("-------");
  //   console.log(i);
  //   i++;
  // }

  console.log(i);
  i++;
});

// input.on("noteoff", (msg) => {
//   console.log("Note OFF:", msg.note, "Vélocité:", msg.velocity);
// });

// Ajoutez d'autres écouteurs pour d'autres types de messages MIDI si nécessaire

// Gérez la fermeture du programme
// process.on("SIGINT", () => {
//   input.close();
//   process.exit();
// });
