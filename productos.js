// Configuración Firebase
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
  const id = document.getElementById("productoId").value;

  const producto = { nombre, precio, descripcion };

  if (id) {
    db.ref("productos/" + id).update(producto);
  } else {
    db.ref("productos").push(producto);
  }

  form.reset();
  document.getElementById("productoId").value = "";
});

// Leer productos
function mostrarProductos() {
  db.ref("productos").on("value", (snapshot) => {
    lista.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      const id = childSnapshot.key;
      const producto = childSnapshot.val();

      const div = document.createElement("div");
      div.className = "producto";
      div.innerHTML = `
        <strong>${producto.nombre}</strong><br>
        $${producto.precio}<br>
        <em>${producto.descripcion}</em>
        <div class="acciones">
          <button onclick="editarProducto('${id}', '${producto.nombre}', ${producto.precio}, '${producto.descripcion}')">Editar</button>
          <button onclick="eliminarProducto('${id}')">Eliminar</button>
        </div>
      `;
      lista.appendChild(div);
    });
  });
}

// Editar
function editarProducto(id, nombre, precio, descripcion) {
  document.getElementById("nombre").value = nombre;
  document.getElementById("precio").value = precio;
  document.getElementById("descripcion").value = descripcion;
  document.getElementById("productoId").value = id;
}

// Eliminar
function eliminarProducto(id) {
  if (confirm("¿Estás seguro de eliminar este producto?")) {
    db.ref("productos/" + id).remove();
  }
}

mostrarProductos();

