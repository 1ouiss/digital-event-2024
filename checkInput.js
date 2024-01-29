const gamepad = require("gamepad");

// Initialise le module gamepad
gamepad.init();

// Écoute l'événement de connexion de la manette
gamepad.on("attach", function (id, status) {
  console.log(`Manette connectée (ID ${id}): ${status.product}`);
});

// Écoute l'événement de déconnexion de la manette
gamepad.on("detach", function (id, status) {
  console.log(`Manette déconnectée (ID ${id}): ${status.product}`);
});

// Écoute l'événement de mise à jour de la manette
gamepad.on("move", function (id, axis, value) {
  console.log(`Manette (ID ${id}): Axe ${axis} déplacé à ${value}`);
});

// Écoute l'événement de changement d'état des boutons
gamepad.on("down", function (id, num) {
  console.log(`Manette (ID ${id}): Bouton ${num} enfoncé`);
});

gamepad.on("up", function (id, num) {
  console.log(`Manette (ID ${id}): Bouton ${num} relâché`);
});

// Commence à écouter les événements de la manette
gamepad.processEvents();

// Planifie une mise à jour toutes les 16 ms
setInterval(gamepad.processEvents, 16);

// Nettoie les ressources lors de la fermeture du programme
process.on("SIGINT", function () {
  gamepad.shutdown();
  process.exit();
});
