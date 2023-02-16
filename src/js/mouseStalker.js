import { gsap } from "gsap";

export class MouseStalker {
  constructor() {
    this.body = document.body;
    this.stalker = document.querySelector('.js-stalker');
    this.links = document.querySelectorAll('.js-link')

    this.pos = {
      x: 0,
      y: 0
    }
    this.mouse = {
      x: this.pos.x,
      y: this.pos.y
    }
    this.speed = 0.1;

    this.stalkerSetX = gsap.quickSetter(this.stalker, "x", "px");
    this.stalkerSetY = gsap.quickSetter(this.stalker, "y", "px");

    this._update();
    this._addEvent();
  }

  _getMousePosition(e) {
    this.mouse.x = e.pageX;
    this.mouse.y = e.pageY;
  }

  _onMouse() {
    this.stalker.classList.add('is-active');
  }

  _outMouse() {
    this.stalker.classList.remove('is-active');
  }

  _inWindow() {
    this.stalker.classList.remove('is-hide');
  }

  _outWindow() {
    this.stalker.classList.add('is-hide');
  }

  _update() {
    gsap.ticker.add(()=>{
      let dt = 1.0 - Math.pow(1.0 - this.speed, gsap.ticker.deltaRatio());

      this.pos.x += (this.mouse.x - this.pos.x) * dt;
      this.pos.y += (this.mouse.y - this.pos.y) * dt;
      
      this.stalkerSetX(this.pos.x);
      this.stalkerSetY(this.pos.y);
    });
  }

  _addEvent() {
    document.addEventListener('mousemove', this._getMousePosition.bind(this));

    this.links.forEach((link)=>{
      link.addEventListener('mouseenter', this._onMouse.bind(this));
      link.addEventListener('mouseleave', this._outMouse.bind(this));
    });

    this.body.addEventListener('mouseleave', this._outWindow.bind(this));
    this.body.addEventListener('mouseenter', this._inWindow.bind(this));
  }
}