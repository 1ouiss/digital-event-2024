const midi = require("midi");

// Fonction pour trouver les périphériques MIDI et leurs ports
function findIACDevice() {
  const output = new midi.Output();

  const numDevices = output.getPortCount();
  let iacDevice = null;
  let iacPort = null;

  console.log("Périphériques MIDI disponibles :");

  for (let i = 0; i < numDevices; i++) {
    const deviceName = output.getPortName(i);
    console.log(`[${i}] ${deviceName}`);

    iacDevice = deviceName;
    iacPort = i;
  }

  console.log("----");

  if (iacDevice !== null) {
    console.log(`Périphérique IAC selectionné : ${iacDevice} port ${iacPort}`);

    console.log("----");
    return { device: iacDevice, port: iacPort };
  } else {
    console.log("Aucun périphérique IAC trouvé.");
    return null;
  }
}

// Fonction pour envoyer une commande NoteOn au périphérique IAC trouvé
function sendNoteOnToDevice(device, port) {
  const output = new midi.Output();

  output.openPort(port);

  // NoteOn : envoyer une note (60 pour Do centrale) avec une vélocité de 127
  output.sendMessage([0x90, 60, 127]);

  console.log(`NoteOn envoyée au périphérique ${device} port ${port}`);

  output.closePort();
}

// Trouver le périphérique IAC et envoyer une commande NoteOn
const iacDevice = findIACDevice();

if (iacDevice !== null) {
  sendNoteOnToDevice(iacDevice.device, iacDevice.port);
}
