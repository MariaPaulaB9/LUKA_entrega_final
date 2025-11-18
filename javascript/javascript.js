// JavaScript Document


/*----------------------------------------------------------------------------------*/
/*Click  para cambiar el color opciones de respuesta*/

document.addEventListener("DOMContentLoaded", () => {
  const preguntas = document.querySelectorAll(".pregunta");

  preguntas.forEach(pregunta => {
    const opciones = pregunta.querySelectorAll('[class*="opcion_"]');

    opciones.forEach(opcion => {
      opcion.addEventListener("click", () => {
        opciones.forEach(o => o.classList.remove("opcion_seleccionada"));
        opcion.classList.add("opcion_seleccionada");
      });
    });
  });
});

/*----------------------------------------------------------------------------*/
/*transicion de carrusel*/

document.addEventListener("DOMContentLoaded", () => {
  const preguntas = document.querySelectorAll(".pregunta");
  let currentIndex = 0;

  // Posiciona todas las preguntas fuera de pantalla, excepto la primera
  preguntas.forEach((p, i) => {
    gsap.set(p, { x: i === 0 ? 0 : window.innerWidth });
  });

  // Asigna eventos a los botones CONTINUAR
  document.querySelectorAll(".boton_continuar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // evita que recargue la página

      if (currentIndex < preguntas.length - 1) {
        const actual = preguntas[currentIndex];
        const siguiente = preguntas[currentIndex + 1];

        // Desliza la actual hacia la izquierda
        gsap.to(actual, {
          x: -window.innerWidth,
          duration: 1,
          ease: "power2.inOut"
        });

        // Trae la siguiente desde la derecha
        gsap.fromTo(
          siguiente,
          { x: window.innerWidth },
          { x: 0, duration: 1, ease: "power2.inOut" }
        );

        currentIndex++;
      }
    });
  });
});

//carrusel no cuestionario

document.addEventListener("DOMContentLoaded", () => {
  const tira = document.querySelector("#tira");
  const slides = document.querySelectorAll("#tira > div");
  const btnDer = document.querySelector("#derecha");
  const btnIzq = document.querySelector("#izquierda");
  let index = 0;

  function actualizar() {
    tira.style.transform = `translateX(-${index * 100}%)`;
  }

  btnDer.addEventListener("click", () => {
    // avanza al siguiente, vuelve al primero si está al final
    index = (index + 1) % slides.length;
    actualizar();
  });

  btnIzq.addEventListener("click", () => {
    // retrocede, si está en el primero va al último
    index = (index - 1 + slides.length) % slides.length;
    actualizar();
  });
});
//carrusel no cuestionario



//---------------------HOVER ÍCONOS--------------------

const images = [
  "img/Recurso 11.png",
  "img/Recurso 6.png",
  "img/Recurso 23.png",
  "img/Recurso 21.png",
];

let imageIndex = 0;
let lastSpawnTime = 0;
const spawnDelay = 120; // milisegundos entre rastros

document.addEventListener("mousemove", e => {
  const now = Date.now();
  if (now - lastSpawnTime < spawnDelay) return;
  lastSpawnTime = now;

  const img = document.createElement("img");
  img.src = images[imageIndex];
  img.classList.add("icon-float");
  img.style.left = `${e.pageX}px`;
  img.style.top = `${e.pageY}px`;

  document.getElementById("icon-trail").appendChild(img);

  gsap.to(img, {
    duration: 0.4,
    opacity: 1,
    scale: 1,
    ease: "power2.out",
    onComplete: () => {
      gsap.to(img, {
        duration: 0.4,
        opacity: 0,
        scale: 0.5,
        ease: "power2.in",
        delay: 0.3,
        onComplete: () => img.remove()
      });
    }
  });

  imageIndex = (imageIndex + 1) % images.length;
});
