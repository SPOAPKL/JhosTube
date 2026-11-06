const id = new URLSearchParams(location.search).get("id");
const listaComentarios = document.getElementById("lista-comentarios");

function crearComentario(c) {
  const caja = document.createElement("div");
  caja.className = "comentario";
  const autor = document.createElement("strong");
  autor.textContent = c.autor;
  const texto = document.createElement("p");
  texto.textContent = c.texto;
  caja.append(autor, texto);
  return caja;
}

async function cargar() {
  try {
    const video = await getJSON("/videos/" + id);
    const reproductor = document.getElementById("video");
    reproductor.src = video.source;
    reproductor.poster = video.thumbnail;
    document.title = video.titulo + " | MiTube";
    document.getElementById("titulo").textContent = video.titulo;
    document.getElementById("descripcion").textContent = video.descripcion;

    const comentarios = await getJSON(`/videos/${id}/comentarios`);
    listaComentarios.replaceChildren(...comentarios.map(crearComentario));

    const recs = await getJSON(`/videos/${id}/recomendaciones`);
    const contenedor = document.getElementById("recomendados");
    if (recs.length === 0) {
      contenedor.replaceChildren(mensajeVacio("No hay más videos en esta categoría."));
    } else {
      contenedor.replaceChildren(...recs.map(crearTarjeta));
    }
  } catch (e) {
    document.getElementById("titulo").textContent = "No se pudo cargar el video";
  }
}

document.getElementById("form-comentario").addEventListener("submit", async (e) => {
  e.preventDefault();
  const autor = document.getElementById("autor");
  const texto = document.getElementById("texto");
  try {
    const nuevo = await postJSON(`/videos/${id}/comentarios`, {
      autor: autor.value,
      texto: texto.value,
    });
    listaComentarios.prepend(crearComentario(nuevo)); 
    texto.value = "";
  } catch (err) {
    alert("No se pudo publicar el comentario.");
  }
});

cargar();