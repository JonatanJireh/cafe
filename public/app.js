const meseros = JSON.parse(localStorage.getItem("meseros")) || ["Ana", "Carlos", "Luis", "Marta"];
let productos = JSON.parse(localStorage.getItem("productos")) || [];

const pedido = [];

document.addEventListener("DOMContentLoaded", () => {
  const inputMesero = document.getElementById("mesero");
  const inputMesa = document.getElementById("mesa");
  const inputProducto = document.getElementById("producto");
  const inputPrecio = document.getElementById("precio");
  const inputCantidad = document.getElementById("cantidad");
  const btnAgregar = document.getElementById("agregarProducto");
  const btnGuardar = document.getElementById("guardarPedido");
  const listaPedido = document.getElementById("listaPedido");
  const totalPedido = document.getElementById("total");

  // Autocompletado para meseros
  inputMesero.addEventListener("input", () => {
    const valor = inputMesero.value.toLowerCase();
    const sugerencias = meseros.filter(m => m.toLowerCase().startsWith(valor));
    mostrarSugerencias(inputMesero, sugerencias);
  });

  // Autocompletado para productos
  inputProducto.addEventListener("input", () => {
    const valor = inputProducto.value.toLowerCase();
    const sugerencias = productos
      .filter(p => p.nombre.toLowerCase().startsWith(valor))
      .map(p => p.nombre);
    mostrarSugerencias(inputProducto, sugerencias);
  });

  // Completar precio al seleccionar producto
  inputProducto.addEventListener("change", () => {
    const seleccionado = productos.find(p => p.nombre === inputProducto.value);
    if (seleccionado) {
      inputPrecio.value = seleccionado.precio;
    }
  });

  // Agregar producto al pedido
  btnAgregar.addEventListener("click", () => {
    const nombre = inputProducto.value.trim();
    const cantidad = parseInt(inputCantidad.value);
    const precio = parseFloat(inputPrecio.value);

    if (!nombre || isNaN(cantidad) || isNaN(precio)) return alert("Completa todos los campos del producto.");

    const subtotal = cantidad * precio;
    pedido.push({ producto: nombre, cantidad, precio, subtotal });

    inputProducto.value = "";
    inputPrecio.value = "";
    inputCantidad.value = "";

    renderizarPedido();
  });

  // Guardar el pedido
  btnGuardar.addEventListener("click", () => {
    const mesero = inputMesero.value.trim();
    const mesa = inputMesa.value.trim();

    if (!mesero || !mesa || pedido.length === 0) return alert("Completa el mesero, la mesa y al menos un producto.");

    const nuevoPedido = {
      mesero,
      mesa,
      productos: [...pedido],
      total: pedido.reduce((acc, item) => acc + item.subtotal, 0),
      fecha: new Date().toISOString(),
      atendido: false
    };

    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    pedidosGuardados.push(nuevoPedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidosGuardados));

    alert("Pedido guardado exitosamente.");
    window.location.reload();
  });

  function renderizarPedido() {
    listaPedido.innerHTML = "";
    let total = 0;

    pedido.forEach((item, index) => {
      total += item.subtotal;

      const li = document.createElement("li");
      li.textContent = `${item.cantidad} x ${item.producto} - $${item.precio.toFixed(2)} = $${item.subtotal.toFixed(2)}`;

      const btnQuitar = document.createElement("button");
      btnQuitar.textContent = "Quitar";
      btnQuitar.className = "btn-quitar";
      btnQuitar.onclick = () => {
        pedido.splice(index, 1);
        renderizarPedido();
      };

      li.appendChild(btnQuitar);
      listaPedido.appendChild(li);
    });

    totalPedido.textContent = `Total: $${total.toFixed(2)}`;
  }

  function mostrarSugerencias(input, sugerencias) {
    let datalist = document.getElementById(input.name + "List");
    if (!datalist) {
      datalist = document.createElement("datalist");
      datalist.id = input.name + "List";
      document.body.appendChild(datalist);
      input.setAttribute("list", datalist.id);
    }

    datalist.innerHTML = "";
    sugerencias.forEach(item => {
      const option = document.createElement("option");
      option.value = item;
      datalist.appendChild(option);
    });
  }
});
