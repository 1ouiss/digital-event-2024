const easymidi = require("easymidi");

// Trouver le nom de votre périphérique MIDI de sortie
const outputName = "test1"; // Changez cela avec le nom de votre périphérique

// Ouvrir le périphérique MIDI de sortie
const output = new easymidi.Output("IAC MIDI Virtual Bus1");

output.send("noteon", {
  note: 60,
  velocity: 100,
  channel: 0, // Changez le numéro du canal MIDI si nécessaire
});
