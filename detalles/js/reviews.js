let nombres = ["Erick", "Jose", "Orlando", "Frida", "Elian"];
let apellidos = ["Gallegos", "Madrid", "Molinar", "Nuñez", "Dominguez"];
const reviewsContainer = document.getElementById("reviews-container");

const generarEstrellas = (num) => {
  let estrellasHTML = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= num) {
      estrellasHTML += `<i class="fas fa-star"></i>`;
    } else {
      estrellasHTML += `<i class="fas fa-star-alt"></i>`;
    }
  }
  return estrellasHTML;
};

const cargarReviews = () => {
  let data = localStorage.getItem("reviews");
  return data ? JSON.parse(data) : [];
}

const guardarReviews = (reviews) => {
  localStorage.setItem("reviews", JSON.stringify(reviews));
}

const mostrarReviews = (reviews) => {
  reviewsContainer.innerHTML = "";
  reviews.forEach((r) => {
    const reviewHTML = `
      <div class="review">
        <div class="review-header">
          <div class="reviewer-info">
            <span class="reviewer-name">${r.nombre} ${r.apellido}</span>
            <div class="review-rating">
              ${generarEstrellas(r.estrellas)}
            </div>
          </div>
          <span class="review-date">${r.fecha}</span>
        </div>
        <p class="review-text">${r.texto}</p>
      </div>
    `;
    reviewsContainer.innerHTML += reviewHTML;
  });
}

const generarReview = () => {
  let numeroEstrellas = Math.floor(Math.random() * 5) + 1;
  let nombreRandom = nombres[Math.floor(Math.random() * nombres.length)];
  let apellidoRandom = apellidos[Math.floor(Math.random() * apellidos.length)];

  const review = {
    nombre: nombreRandom,
    apellido: apellidoRandom,
    estrellas: numeroEstrellas,
    fecha: new Date().toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus soluta enim magnam asperiores similique labore illum incidunt veritatis ipsum dolorem unde facilis quaerat, sunt nisi fuga, totam tempore quia ipsa."
  };

  let reviews = cargarReviews();
  reviews.push(review);
  guardarReviews(reviews);
  mostrarReviews(reviews);
}

document.addEventListener("DOMContentLoaded", () => {
  let reviews = cargarReviews();
  generarReview();
});
