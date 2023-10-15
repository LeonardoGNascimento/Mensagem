const url = new URL(window.location);
const params = new URLSearchParams(url.search);
const chat = params.get("chat");
const socket = io();

console.log(chat);
document.getElementById("codigo_sala").innerText = chat;

if (!localStorage.getItem("nome")) {
  let nome = prompt("Digite seu nome");

  while (!nome) {
    nome = prompt("Digite seu nome");
  }

  localStorage.setItem("nome", nome);
}

socket.emit(
  "criar_chat",
  { chat, usuario: localStorage.getItem("nome") },
  (response) => {
    response.mensagens.forEach((item) => {
      document.getElementById("texto_recebido").innerHTML += `${item}<br>`;
    });
    const minhaDiv = document.getElementById("texto_recebido");
    minhaDiv.scrollTop = minhaDiv.scrollHeight;
    console.log(response);
  }
);

const div = document.getElementById("texto_recebido");

document.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    enviar();
    document.getElementById("texto").value = "";
  }
});

socket.on("recebido", (teste) => {
  document.getElementById("texto_recebido").innerHTML += `${teste}<br>`;
  const minhaDiv = document.getElementById("texto_recebido");
  minhaDiv.scrollTop = minhaDiv.scrollHeight;
});

socket.on("alerta", (alerta) => {
  alert(alerta);
});

function enviar() {
  socket.emit("recebido", {
    mensagem: `<b>${localStorage.getItem("nome")}</b>: ${
      document.getElementById("texto").value
    } - ${new Date().toLocaleString()}`,
    chat,
    usuario: localStorage.getItem("nome"),
  });
}
