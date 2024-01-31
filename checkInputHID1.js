const HID = require("node-hid");
let levelPlayer1 = 1;
let levelPlayer2 = 1;

let gameArrayPlayer1 = [];
let gameArrayPlayer2 = [];

let readCombinationPlayer1 = true;
let readCombinationPlayer2 = true;

// [K1, K2, K3]
const possibilityPlayer1 = [31, 47, 79];
// [L1, R1, L2]
const possibilityPlayer2 = [1, 2, 4];

let combinationPlayer1 = [31, 47, 79];
let combinationPlayer2 = [1, 2, 4];

// Fonction pour afficher les périphériques de manettes disponibles
function displayConnectedDevices() {
  const devices = HID.devices();

  console.log("Périphériques connectés :");
  const devicePaths = devices.filter((device) =>
    device.manufacturer.includes("DragonRise")
  );
  return devicePaths;
}

async function showCombination(combinationPlayer, levelPlayer, player) {
  if (player === "player1") {
    readCombinationPlayer1 = true;
  } else if (player === "player2") {
    readCombinationPlayer2 = true;
  }
  console.log("Niveau actuel : ", levelPlayer);
  console.log("Combinaison à reproduire : ");
  // const test = combinationPlayer.map((element, index) => {
  //   setTimeout(() => {
  //     console.log(element);
  //   }, (index + 1) * 1000);
  //   if (index === combinationPlayer.length - 1) {
  //     return "ok";
  //   }
  // });

  await new Promise((resolve) => {
    const promises = combinationPlayer.map((element, index) => {
      return new Promise((innerResolve) => {
        setTimeout(() => {
          console.log(element);
          innerResolve();
        }, (index + 1) * 1000);
      });
    });

    Promise.all(promises).then(() => {
      if (player === "player1") {
        readCombinationPlayer1 = false;
      } else if (player === "player2") {
        readCombinationPlayer2 = false;
      }
      resolve("ok");
    });
  });
}

async function verificationGame(
  gameArrayPlayer,
  combinationPlayer,
  possibilityPlayer,
  levelPlayer,
  player
) {
  if (gameArrayPlayer.length <= combinationPlayer.length) {
    for (let i = 0; i < gameArrayPlayer.length; i++) {
      if (gameArrayPlayer[i] != combinationPlayer[i]) {
        gameArrayPlayer.length = 0;
        console.log("ERREUR !");
        await showCombination(combinationPlayer, levelPlayer, player);
        return false;
      } else {
        if (i === combinationPlayer.length - 1) {
          const newPossibility =
            possibilityPlayer[
              Math.floor(Math.random() * possibilityPlayer.length)
            ];
          combinationPlayer.push(newPossibility);
          console.log("BIEN JOUÉ VOUS AVEZ RÉUSSI LA COMBINAISON !");

          await showCombination(combinationPlayer, levelPlayer, player);
          gameArrayPlayer.length = 0;
          return true;
        }
      }
    }
  }

  // return {
  //   nextLevel: false,
  //   endReadCombination: "ok",
  // };
}

// Fonction pour lire l'input d'un bouton sur la manette
function readControllerInput(device) {
  console.log("-----------------------------------------------");
  const newDevice = new HID.HID(device.path);

  const buttonState = {
    button1: null,
    button2: null,
    button3: null,
    button4: null,
    button5: null,
    button6: null,
  };

  console.log("En attente d'input...");

  newDevice.on("data", (data) => {
    // console.log(data);
    const inputArray = Array.from(data);
    // console.log("-----");
    console.log("inputArray : ", inputArray);
    if (
      (inputArray[5] != buttonState.button1 && buttonState.button1 != null) ||
      (inputArray[5] != buttonState.button2 && buttonState.button2 != null) ||
      (inputArray[5] != buttonState.button3 && buttonState.button3 != null) ||
      (inputArray[6] != buttonState.button4 && buttonState.button4 != null) ||
      (inputArray[6] != buttonState.button5 && buttonState.button5 != null) ||
      (inputArray[6] != buttonState.button6 && buttonState.button6 != null)
    ) {
      // console.log(buttonState);
      buttonState.button1 = inputArray[5];
      buttonState.button2 = inputArray[5];
      buttonState.button3 = inputArray[5];
      buttonState.button4 = inputArray[6];
      buttonState.button5 = inputArray[6];
      buttonState.button6 = inputArray[6];
      if (inputArray[5] === 31 && readCombinationPlayer1 === false) {
        gameArrayPlayer1.push(inputArray[5]);
        // console.log("game array player 1 : ", gameArrayPlayer1);
        const game = verificationGame(
          gameArrayPlayer1,
          combinationPlayer1,
          possibilityPlayer1,
          levelPlayer1,
          "player1"
        );
        if (game) {
          levelPlayer1 = levelPlayer1 + 1;
        }

        // console.log("CLICK BUTTON 1 joueur 1");
      } else if (inputArray[5] === 47 && readCombinationPlayer1 === false) {
        gameArrayPlayer1.push(inputArray[5]);
        // console.log("game array player 1 : ", gameArrayPlayer1);
        console.log("MAUVAIS BOUTON", readCombinationPlayer1);
        const game = verificationGame(
          gameArrayPlayer1,
          combinationPlayer1,
          possibilityPlayer1,
          levelPlayer1,
          "player1"
        );
        if (game) {
          levelPlayer1 = levelPlayer1 + 1;
        }

        // console.log("CLICK BUTTON 2 joueur 1");
      } else if (inputArray[5] === 79 && readCombinationPlayer1 === false) {
        gameArrayPlayer1.push(inputArray[5]);
        // console.log("game array player 1 : ", gameArrayPlayer1);
        const game = verificationGame(
          gameArrayPlayer1,
          combinationPlayer1,
          possibilityPlayer1,
          levelPlayer1,
          "player1"
        );
        if (game) {
          levelPlayer1 = levelPlayer1 + 1;
        }

        // console.log("CLICK BUTTON 3 joueur 1");
      } else if (inputArray[6] === 1 && readCombinationPlayer2 === false) {
        gameArrayPlayer2.push(inputArray[6]);
        // console.log("game array player 1 : ", gameArrayPlayer2);
        const game = verificationGame(
          gameArrayPlayer2,
          combinationPlayer2,
          possibilityPlayer2,
          levelPlayer2,
          "player2"
        );
        if (game) {
          levelPlayer2 = levelPlayer2 + 1;
        }

        // console.log("CLICK BUTTON 1 joueur 2");
      } else if (inputArray[6] === 2 && readCombinationPlayer2 === false) {
        gameArrayPlayer2.push(inputArray[6]);

        const game = verificationGame(
          gameArrayPlayer2,
          combinationPlayer2,
          possibilityPlayer2,
          levelPlayer2,
          "player2"
        );
        if (game) {
          levelPlayer2 = levelPlayer2 + 1;
        }

        // console.log("CLICK BUTTON 2 joueur 2");
      } else if (inputArray[6] === 4 && readCombinationPlayer2 === false) {
        gameArrayPlayer2.push(inputArray[6]);

        const game = verificationGame(
          gameArrayPlayer2,
          combinationPlayer2,
          possibilityPlayer2,
          levelPlayer2,
          "player2"
        );
        if (game) {
          levelPlayer2 = levelPlayer2 + 1;
        }

        // console.log("CLICK BUTTON 3 joueur 2");
      }
    } else if (
      buttonState.button1 === null ||
      buttonState.button2 === null ||
      buttonState.button3 === null ||
      buttonState.button4 === null ||
      buttonState.button5 === null ||
      buttonState.button6 === null
    ) {
      buttonState.button1 = inputArray[5];
      buttonState.button2 = inputArray[5];
      buttonState.button3 = inputArray[5];
      buttonState.button4 = inputArray[6];
      buttonState.button5 = inputArray[6];
      buttonState.button6 = inputArray[6];
    }
  });

  newDevice.on("error", (error) => {
    console.error("Erreur:", error);
  });
}

const devicePaths = displayConnectedDevices();
console.log("devicePaths:", devicePaths);

const showAllCobination = async () => {
  console.log("Player 1 : ");
  await showCombination(combinationPlayer1, levelPlayer1, "player1");
  // if (endPlayer1Combination === "ok") {
  //   readCombinationPlayer1 = false;
  // }

  console.log("Player 2 : ");
  await showCombination(combinationPlayer2, levelPlayer2, "player2");

  // if (endPlayer2Combination === "ok") {
  //   readCombinationPlayer2 = false;
  // }
};

readControllerInput(devicePaths[0]);
readControllerInput(devicePaths[1]);

showAllCobination();
