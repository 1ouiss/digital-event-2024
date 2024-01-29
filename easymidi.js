const easymidi = require("easymidi");

// Afficher tous les périphériques MIDI disponibles
const availableOutputs = easymidi.getOutputs();
console.log("Périphériques MIDI disponibles :", availableOutputs);

// Trouver le nom de votre périphérique MIDI de sortie
const outputName = "IAC MIDI Virtual Bus1"; // Changez cela avec le nom de votre périphérique

// Vérifier si le périphérique de sortie spécifié est disponible
if (availableOutputs.includes(outputName)) {
  // Ouvrir le périphérique MIDI de sortie
  const output = new easymidi.Output(outputName);

  console.log("Commande envoyée sur IAC MIDI Virtual Bus1");
  // Envoyer la commande MIDI uniquement si le périphérique est ouvert
  // VOLUME
  // output.send("cc", {
  //   controller: 10, // Type du controlleur
  //   value: 127, // Valeur de 0 à 127
  //   channel: 0, // Changez le numéro du canal MIDI si nécessaire
  // });
  // PAN
  for (let index = 0; index < 128; index++) {
    console.log("test");
    output.send("cc", {
      controller: 11, // Type du controlleur
      value: index, // Valeur de 0 à 127
      channel: 0, // Changez le numéro du canal MIDI si nécessaire
    });
    wait(200000);
  }

  function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  //

  //

  //

  // // Définition des messages MIDI
  // var volumeMessage = {
  //   controller: 10,
  //   value: 0,
  //   channel: 0,
  // };

  // var panMessage = {
  //   controller: 11,
  //   value: 127,
  //   channel: 0,
  // };
  // // Envoi des messages dans un tableau
  // output.send([volumeMessage, panMessage]);

  //   output.send("pitch", {
  //     value: 11200,
  //     channel: 0, // Changez le numéro du canal MIDI si nécessaire
  //   });
  //   output.send("cc", {
  //     controller: 1, // Numéro du contrôleur MIDI (modifiable selon vos besoins)
  //     value: 64, // Valeur du potard entre 0 et 127
  //     channel: 128, // Changez le numéro du canal MIDI si nécessaire
  //   });
  // Fermer le périphérique MIDI de sortie après l'envoi
  output.close();
} else {
  console.error(`Le périphérique ${outputName} n'est pas disponible.`);
}
