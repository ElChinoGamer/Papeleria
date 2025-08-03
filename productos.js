const firebaseConfig = {
  apiKey: "AIzaSyAHqZs-JDn86AY8NZ2mpUY_4n3-TfaQgVI",
  authDomain: "papeleriaf-9f0e2.firebaseapp.com",
  databaseURL: "https://papeleriaf-9f0e2-default-rtdb.firebaseio.com",
  projectId: "papeleriaf-9f0e2",
  storageBucket: "papeleriaf-9f0e2.appspot.com",
  messagingSenderId: "654877673833",
  appId: "1:654877673833:web:101679a22ec915f50a95f8"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const form = document.getElementById("productoForm");
const lista = document.getElementById("listaProductos");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const descripcion = document.getElementById("descripcion").value;

  if (!nombre || !precio || !descripcion) {
    alert("Llena todos los campos");
    return;
  }

  const nuevoProducto = {
    nombre,
    precio,
    descripcion
  };

  db.ref("productos").push(nuevoProducto)
    .then(() => {
      form.reset();
    })
    .catch((error) => {
      console.error("Error al guardar producto:", error);
    });
});

function mostrarProductos() {
  db.ref("productos").on("value", (snapshot) => {
    lista.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      const producto = childSnapshot.val();
      const div = document.createElement("div");
      div.className = "producto";
      div.innerHTML = `
        <strong>${producto.nombre}</strong><br>
        $${producto.precio}<br>
        <em>${producto.descripcion}</em>
      `;
      lista.appendChild(div);
    });
  });
}

mostrarProductos();

