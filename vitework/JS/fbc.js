let container = document.getElementById("mommy");
 class fireball {
  constructor(parent) {
    this.element = document.createElement("img");
    this.element.className = "fireball";
    this.element.src = "./public/fire.gif"
    this.element.style.left = `${Math.random() * 92}%`;
    this.parent = parent;
    this.element.style.top = "0%";
    this.element.style.transform = "translate(0px, -100%)";
    this.parent.appendChild(this.element);
    this.element.style.top = "100%";
    this.element.style.transform = "translate(0px, 0%)";
  }
} 

class coin {
  constructor(parent) {
    this.element = document.createElement("div");
    this.element.className = "coin";
    this.element.style.left = `${Math.random() * 92}%`;
    this.element.style.top = `${Math.random() * 80 + 10}%`;
    this.parent = parent;
    this.parent.appendChild(this.element);
  }
}

export let Fireball = fireball,
  Coin = coin;
