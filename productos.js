// Config Firebase
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
const inputBuscar = document.getElementById("inputBuscar");

form.addEventListener("submit", e => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const precio = parseFloat(document.getElementById("precio").value);
  const descripcion = document.getElementById("descripcion").value.trim();
  const id = document.getElementById("productoId").value;

  if (!nombre || !precio || !descripcion) {
    alert("Completa todos los campos.");
    return;
  }

  const producto = { nombre, precio, descripcion };

  if (id) {
    db.ref("productos/" + id).update(producto);
  } else {
    db.ref("productos").push(producto);
  }

  form.reset();
  document.getElementById("productoId").value = "";
});

function mostrarProductos() {
  db.ref("productos").on("value", snapshot => {
    lista.innerHTML = "";
    snapshot.forEach(childSnapshot => {
      const id = childSnapshot.key;
      const { nombre, precio, descripcion } = childSnapshot.val();

      const div = document.createElement("div");
      div.className = "producto";
      div.innerHTML = `
        <h3>${nombre}</h3>
        <p><strong>Precio:</strong> $${precio.toFixed(2)}</p>
        <p>${descripcion}</p>
        <div class="acciones">
          <button class="btn-editar">Editar</button>
          <button class="btn-eliminar">Eliminar</button>
        </div>
      `;

      // Eventos para editar y eliminar
      const btnEditar = div.querySelector(".btn-editar");
      btnEditar.addEventListener("click", () => editarProducto(id, nombre, precio, descripcion));

      const btnEliminar = div.querySelector(".btn-eliminar");
      btnEliminar.addEventListener("click", () => eliminarProducto(id));

      lista.appendChild(div);
    });
  });
}

function editarProducto(id, nombre, precio, descripcion) {
  document.getElementById("nombre").value = nombre;
  document.getElementById("precio").value = precio;
  document.getElementById("descripcion").value = descripcion;
  document.getElementById("productoId").value = id;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function eliminarProducto(id) {
  if (confirm("¿Estás seguro de eliminar este producto?")) {
    db.ref("productos/" + id).remove();
  }
}

// Buscador en vivo
inputBuscar.addEventListener("input", () => {
  const filtro = inputBuscar.value.toLowerCase();
  const productos = document.querySelectorAll(".producto");
  productos.forEach(prod => {
    const nombre = prod.querySelector("h3").textContent.toLowerCase();
    prod.style.display = nombre.includes(filtro) ? "block" : "none";
  });
});

mostrarProductos();
