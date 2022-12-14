const progress = document.querySelector("#progressbar");
const totalHeight = document.body.scrollHeight - window.innerHeight;

window.onscroll = function() {
    let progressHeight = (window.pageYOffset / totalHeight) * 100;
    progress.style.height = progressHeight + "%";
}

const cards = document.querySelectorAll(".card");

const glows = document.querySelectorAll('.effect');

const handleOnMouseMove = e =>{
  const {currentTarget: target} = e;

  const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
}

for (const card of cards){
  card.onmousemove = e => handleOnMouseMove(e);
}

for (let card of cards) {
    card.addEventListener('mouseenter', () => {
        bounds = card.getBoundingClientRect();
        document.addEventListener('mousemove', rotateToMouse);
      });
      
      card.addEventListener('mouseleave', () => {
        document.removeEventListener('mousemove', rotateToMouse);
        card.style.transform = '';
        card.style.background = '';
      });
    
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    for (const glow of glows) {
        glow.style.display= "none";
    }
    })
}

function rotateToMouse(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2
    }
    const distance = Math.sqrt(center.x**2 + center.y**2);
    
    for (const card of cards) {
        card.style.transform = `
        scale3d(1.07, 1.07, 1.07)
        rotate3d(
          ${center.y / 100},
          ${-center.x / 100},
          0,
          ${Math.log(distance)* 2}deg
        )
      `;
    }


  }

  const menu = document.getElementById("menu");

Array.from(document.getElementsByClassName("menu-item"))
  .forEach((item, index) => {
    item.onmouseover = () => {
      menu.dataset.activeIndex = index;
    }
  });


const menuButton = document.querySelector(".menu-toggle");

const menuText = document.querySelector(".menu-text");

const body = document.querySelector("body");

menuButton.addEventListener("click", () => {

  body.classList.toggle("lock-scroll");

 const visiblity = menu.getAttribute("data-visible");

 if(visiblity === "false"){
    menu.setAttribute("data-visible", true);
    menuButton.setAttribute("data-visible",true);
    menuText.innerText = "MENU";
    menuText.style.letterSpacing = "0.5em"
    menuText.style.transition = "1000ms ease-in"
 } else{
    menu.setAttribute("data-visible", false);
    menuButton.setAttribute("data-visible",false);
    menuText.innerText = "CLOSE";
    menuText.style.letterSpacing = "0.7em"
    menuText.style.transition = "1000ms ease-in"
 }
})













