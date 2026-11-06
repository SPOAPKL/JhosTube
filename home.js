const galeria = document.getElementById("galeria");
const chips = document.getElementById("categorias");
const buscador = document.getElementById("buscador");
let categoriaActual = "";

async function cargarVideos() {
  const params = new URLSearchParams();
  if (categoriaActual) params.set("categoria", categoriaActual);
  if (buscador.value) params.set("search", buscador.value);

  try {
    const videos = await getJSON("/videos?" + params.toString());
    console.log(videos);
    if (videos.length === 0) {
      galeria.replaceChildren(mensajeVacio("No hay videos con ese filtro."));
      return;
    }
    galeria.replaceChildren(...videos.map(crearTarjeta));
  } catch (e) {
    galeria.replaceChildren(mensajeVacio("No se pudo conectar con la API. ¿Está corriendo?"));
  }
}

function marcarActivo(boton) {
  chips.querySelectorAll("button").forEach((b) => b.classList.remove("activo"));
  boton.classList.add("activo");
}

async function cargarCategorias() {
  try {
    const cats = await getJSON("/videos/categorias");
    ["", ...cats].forEach((cat, i) => {
      const boton = document.createElement("button");
      boton.textContent = cat || "Todos";
      if (i === 0) boton.classList.add("activo");
      boton.addEventListener("click", () => {
        categoriaActual = cat;
        marcarActivo(boton);
        cargarVideos();
      });
      chips.appendChild(boton);
    });
  } catch (e) {}
}

buscador.addEventListener("input", cargarVideos);
cargarCategorias();
cargarVideos();