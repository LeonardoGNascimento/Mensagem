function login() {
  const string = geraStringAleatoria(30);
  localStorage.setItem("nome", document.getElementById("nome").value);
  window.location.href = `/chat.html?chat=${string}`;
}

function geraStringAleatoria(tamanho) {
  var stringAleatoria = "";
  var caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < tamanho; i++) {
    stringAleatoria += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
  }
  return stringAleatoria;
}

function entrar() {
  localStorage.setItem("nome", document.getElementById("nome").value);
  const id = document.getElementById("codigo").value;
  window.location.href = `/chat.html?chat=${id}`;
}
