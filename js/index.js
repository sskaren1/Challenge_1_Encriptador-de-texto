const inputMessageField = document.querySelector("#inputMessage");
const outputMessageField = document.querySelector("#outputMessage");
const btnEncryptor = document.querySelector(".btn--encryptor");
const btnDecryptor = document.querySelector(".btn--decryptor");
const btnCopy = document.querySelector(".btn--copy");

eventListeners();

function eventListeners() {
  inputMessageField.addEventListener("change", messageToEncrypt);
  btnEncryptor.addEventListener("click", encryptor);
  btnDecryptor.addEventListener("click", decryptor);
  btnCopy.addEventListener("click", copyOutput);
}

const objectMessage = {
  inputMessage: "",
  outputMessage: "",
};

const encryptionKeys = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

function messageToEncrypt(e) {
  objectMessage[e.target.name] = e.target.value;
  // console.log("objectMessage", objectMessage);
}

function encryptor() {
  //   Reiniciar el objeto
  restartObject();

  const { inputMessage, outputMessage } = objectMessage;
  const names = Object.keys(encryptionKeys);
  const keys = Object.values(encryptionKeys);

  if (inputMessage === "") {
    printAlert("Debe introducir un mensaje", "error");
  } else if (inputMessage === "A") {
    printAlert("Debe introducir solo letras en minuscula", "error");
  } else {
    // Proceso de encriptación
    for (let i = 0; i < inputMessage.length; i++) {
      if (inputMessage[i] === names[0]) {
        objectMessage.outputMessage += keys[0];

        // otras manera de agregar o modificar un objeto
        // objectMessage.outputMessage += keys[0];
        // o
        // outputMessage += keys[0];
        // objectMessage.outputMessage = outputMessage;
      } else if (inputMessage[i] === names[1]) {
        objectMessage.outputMessage += keys[1];
      } else if (inputMessage[i] === names[2]) {
        objectMessage.outputMessage += keys[2];
      } else if (inputMessage[i] === names[3]) {
        objectMessage.outputMessage += keys[3];
      } else if (inputMessage[i] === names[4]) {
        objectMessage.outputMessage += keys[4];
      } else {
        objectMessage.outputMessage += inputMessage[i];
      }
    }
    // console.log("outputMessage final", outputMessage);
    // console.log("objectMessage final", objectMessage);

    // imprimir el mensaje encriptado
    outputMessageField.innerHTML = objectMessage.outputMessage;
    printAlert("Mensaje Encriptado", "success");

    // Limpiar el html del input
    cleanHTML();
  }
}

function decryptor() {
  //   Reiniciar el objeto
  restartObject();

  let { inputMessage } = objectMessage;

  const names = Object.keys(encryptionKeys);
  const keys = Object.values(encryptionKeys);

  if (inputMessage === "") {
    printAlert("Debe introducir un mensaje", "error");
  } else if (inputMessage === "A") {
    printAlert("Debe introducir solo letras en minuscula", "error");
  } else {
    // Proceso de decriptación
    for (let i = 0; i < inputMessage.length; i++) {
      if (inputMessage.includes(keys[i])) {
        // Reemplaza la letra por el código
        inputMessage = inputMessage.replaceAll(
          keys[i],
          names[i]
        );
      }
    }
    objectMessage.outputMessage = inputMessage;

    // imprimir el mensaje encriptado
    outputMessageField.innerHTML = objectMessage.outputMessage;
    printAlert("Mensaje Encriptado", "success");

    // Limpiar el html del input
    cleanHTML();
  }
}

function isMayusc(message) {
  for (let i = 0; i < message.lenght; i++) {}
}

function printAlert(mensaje, tipo) {
  // Crea el div
  const divMensaje = document.createElement("p");
  divMensaje.classList.add("alert");

  // Si es de tipo error agrega una clase
  if (tipo === "error") {
    divMensaje.classList.add("alert--danger");
  } else {
    divMensaje.classList.add("alert--success");
  }

  // Mensaje de error
  divMensaje.textContent = mensaje;

  // Insertar en el DOM
  document
    .querySelector("#contentEncryptor")
    .insertBefore(divMensaje, document.querySelector(".encryptor__warning"));

  // Quitar el alert despues de 3 segundos
  setTimeout(() => {
    divMensaje.remove();
  }, 1500);
}

function restartObject() {
  // Reiniciar el objeto
  objectMessage.outputMessage = "";
}

function cleanHTML() {
  inputMessageField.value = "";
}

function copyOutput() {
  navigator.clipboard.writeText(outputMessageField.innerHTML);
  printAlert("Mensaje copiado", "success");

  // Otra manera de copiar el campo
  // outputMessageField.select();
  // document.execCommand("copy");
}
