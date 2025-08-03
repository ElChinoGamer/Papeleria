document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const clave = document.getElementById("clave").value;
  const mensaje = document.getElementById("mensajeLogin");

  const usuarioCorrecto = "admin";
  const claveCorrecta = "eidos123";

  if (usuario === usuarioCorrecto && clave === claveCorrecta) {
    mensaje.textContent = "Inicio de sesión exitoso. Redirigiendo...";
    mensaje.className = "success";
    mensaje.classList.remove("oculto");

    setTimeout(() => {
      window.location.href = "admin.html";
    }, 1500); // espera 1.5 segundos antes de redirigir
  } else {
    mensaje.textContent = "Usuario o contraseña incorrectos.";
    mensaje.className = "error";
    mensaje.classList.remove("oculto");
  }
});
