// On récupère tous les éléments
const buttons = document.getElementsByTagName("button");
const x = document.getElementById("x");
const y = document.getElementById("y");
const px = document.getElementById("px");
const vw = document.getElementById("vw");
const vh = document.getElementById("vh");
const width = document.getElementById("width");
const height = document.getElementById("height");
const html = document.querySelector(".html");
const css = document.querySelector(".css");

// *** //

function checkIfActive(element) {
  if (element.classList.contains("active")) {
    return true;
  } else {
    return false;
  }
}

// Récupère les paramètres du formulaire

function storeParametersInfos() {
  let axis = [x, y];
  let unit = [px, vw];
  let parametersinfos = {};

  for (i = 0; i <= 1; i++) {
    if (checkIfActive(axis[i])) {
      parametersinfos.axis = axis[i];
    }
  }
  for (i = 0; i <= 1; i++) {
    if (checkIfActive(unit[i])) {
      parametersinfos.unit = unit[i];
    }
  }

  parametersinfos.width = width.value;
  parametersinfos.height = height.value;

  return parametersinfos;
}

// Check des boutons cliqués

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", (e) => {
    e.preventDefault();

    //Si déjà actif -> rien faire
    //Si pas actif -> enlever actif à celui qui l'est, et l'ajouté à celui cliqué.
    if (!e.target.classList.contains("active")) {
      switch (e.target.id) {
        case "x":
        case "y":
          x.classList.toggle("active");
          y.classList.toggle("active");
          break;
        case "px":
        case "vw":
          px.classList.toggle("active");
          vw.classList.toggle("active");
      }
    }

    if (e.target.id === "submit") {
      if (width.value != "" && height.value != "") {
        renderHTML();
        renderCSS();
      } else {
        alert("need width and height!");
      }
    }
  });
}

// Rendre en HTML et CSS

function renderHTML() {
  let htmlText = `<div class="snap-slider">
      <div class="slide one">Slide 1</div>
      <div class="slide two">Slide 2</div>
      <div class="slide three">Slide 3</div>
      <div class="slide four">Slide 4</div>
    </div>`;

  html.textContent = htmlText;
}

function renderCSS() {
  let parametersinfos = storeParametersInfos();
  let { axis, unit, width, height } = parametersinfos;
  axis = axis.id;
  unit = unit.id;
  soustraction = width - height;
  let cssText = ``;

  if (axis === "y") {
    cssText = `
        .slide {
  width: ${width}${unit};
  height: ${height}${unit};
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  scroll-snap-align: start;
  -webkit-transform: rotate(90deg) translateY(-${height}${unit});
          transform: rotate(90deg) translateY(-${height}${unit});
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.slide:not(.slide:nth-child(1)) {
  margin-top: ${soustraction}${unit};
}

.snap-slider {
  -ms-scroll-snap-type: y mandatory;
      scroll-snap-type: y mandatory;
  width: ${height}${unit};
  height: ${width}${unit};
  -webkit-transform: rotate(-90deg) translateX(-${height}${unit});
          transform: rotate(-90deg) translateX(-${height}${unit});
  -webkit-transform-origin: top left;
          transform-origin: top left;
  overflow-x: hidden;
  -ms-overlow-style: none;
  scrollbar-width: none;
}

::-webkit-scrollbar {
  display: none;
}

.one {
  background: #b1f8f2;
}

.two {
  background: #fffc99;
}

.three {
  background: #eafdcf;
}

.four {
  background: #8e8358;
}
        `;

    css.textContent = cssText;
  }
}
