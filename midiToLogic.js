const midi = require("midi");
const output = new midi.Output();
const numDevices = output.getPortCount();
const selectedPort = 1;

// Fonction pour trouver les périphériques MIDI et leurs ports
function findMidiDevices() {
  console.log("Périphériques MIDI disponibles :");

  for (let i = 0; i < numDevices; i++) {
    const deviceName = output.getPortName(i);
    console.log(`PORT ${i} : ${deviceName}`);
  }

  console.log("----");
}

// Fonction pour envoyer une commande NoteOn au périphérique IAC trouvé
function sendNoteOnToDevice() {
  output.openPort(selectedPort);

  console.log("Le port sélectionné n'existe pas !");

  const channel = 1; // Choisissez le canal MIDI souhaité (1 à 16)
  const cc = 60; // Choisissez la note MIDI souhaitée (0 à 127)
  const velocity = 127; // Choisissez la vélocité souhaitée (0 à 127)

  // Utiliser la fonction spécifique à la bibliothèque pour envoyer une NoteOn
  output.noteOn(channel, cc, velocity);

  console.log(`PORT ${selectedPort} : NoteOn envoyée`);

  output.closePort();
}

findMidiDevices();

if (selectedPort >= 0 && selectedPort < numDevices) {
  sendNoteOnToDevice();
} else {
  console.log("Le port sélectionné n'existe pas !");
}
