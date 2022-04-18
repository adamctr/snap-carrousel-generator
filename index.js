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
const exampleContent = document.querySelector(".example-content");
const proximity = document.getElementById("proximity");
const mandatory = document.getElementById("mandatory");
const start = document.getElementById("start");
const center = document.getElementById("center");
const end = document.getElementById("end");

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
  let style = [proximity, mandatory];
  let align = [start, center, end];

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
  for (i = 0; i <= 1; i++) {
    if (checkIfActive(style[i])) {
      parametersinfos.style = style[i];
    }
  }
  for (i = 0; i <= 2; i++) {
    if (checkIfActive(align[i])) {
      parametersinfos.align = align[i];
    }
  }

  parametersinfos.width = width.value;
  parametersinfos.height = height.value;
  console.log("Retour des paramètres...");
  return parametersinfos;
}

// Check des boutons cliqués

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", (e) => {
    console.log("Bouton cliqué!");
    e.preventDefault();
    let align = [start, center, end];

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
          break;
        case "proximity":
        case "mandatory":
          proximity.classList.toggle("active");
          mandatory.classList.toggle("active");
          break;
      }

      if (
        !e.target.classList.contains("active") &&
        (e.target.id == "start" ||
          e.target.id == "center" ||
          e.target.id == "end")
      ) {
        for (i = 0; i <= 2; i++) {
          if (checkIfActive(align[i])) {
            align[i].classList.toggle("active");
          }
        }
        e.target.classList.toggle("active");
      }
    }

    //Bouton Submit

    if (e.target.id === "submit") {
      if (width.value != "" && height.value != "") {
        console.log("Rendu...");
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
  console.log("Rendu HTML...");

  return htmlText;
}

function renderCSS() {
  let parametersinfos = storeParametersInfos();
  let { axis, unit, width, height, style, align } = parametersinfos;
  axis = axis.id;
  unit = unit.id;
  style = style.id;
  align = align.id;

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
  scroll-snap-align: ${align};
  -webkit-transform: rotate(90deg) translateY(-${height}${unit});
          transform: rotate(90deg) translateY(-${height}${unit});
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.slide:not(.slide:nth-child(1)) {
  margin-top: ${soustraction}${unit};
}

.snap-slider {
  -ms-scroll-snap-type: y ${style};
      scroll-snap-type: y ${style};
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
  } else {
    cssText = `.snap-slider {
  overflow-y: auto;
  overflow-x: hidden;
  -ms-scroll-snap-type: y ${style};
      scroll-snap-type: y ${style};
  width: ${width}${unit};
  height: ${height}${unit};
}

.slide {
  scroll-snap-align: ${align};
  width: ${width}${unit};
  height: ${height}${unit};
  background-color: rgba(127, 255, 212, 0.267);
}`;
  }
  css.textContent = cssText;
  console.log("Rendu CSS...");

  return cssText;
}
