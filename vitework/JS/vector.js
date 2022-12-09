class Vectorr {
  constructor(x, y) {
    this.X = x;
    this.Y = y;
  }
  liesOnBox(box) {
    if (this.X >= box.left && this.X <= box.right) {
      if (this.Y >= box.top && this.Y <= box.bottom) {
        return true;
      }
    }
    return false;
  }
}
class Boxx {
  constructor(topLeft, p3) {
    this.Corners = {};
    this.Corners.TL = topLeft;
    this.Corners.BR = p3;
    this.Corners.TR = new Vectorr(p3.X, topLeft.Y);
    this.Corners.BL = new Vectorr(topLeft.X, p3.Y);
    this.top = topLeft.Y;
    this.bottom = p3.Y;
    this.left = topLeft.X;
    this.right = p3.X;
    this.height = p3.Y - topLeft.Y;
    this.width = p3.X - topLeft.X;
  }
  overlapsBox(box2) {
    let corners = Object.keys(this.Corners).map((item) => this.Corners[item]);
    console.log(this.Corners)
    let overcorner = corners.filter((corner) => corner.liesOnBox(box2));
    if (overcorner.length >= 1) {
      return true;
    }
    corners = Object.keys(box2.Corners).map((item) => box2.Corners[item]);
    overcorner = corners.filter((corner) => corner.liesOnBox(this));
    if (overcorner.length >= 1) {
      return true;
    }
    return false;
  }
  moveTo(newTL) {
    this.Corners.TL = newTL;
    this.top = newTL.Y;
    this.bottom = newTL.Y + this.height;
    this.left = newTL.X;
    this.right = newTL.X + this.width;
    this.Corners.BR = new Vector(this.right, this.bottom);
    this.Corners.TR = new Vectorr(this.right, this.top);
    this.Corners.BL = new Vectorr(this.left, this.bottom);
    if (this.element) {
      this.display.top = `${this.top}px`;
      this.display.left = `${this.left}px`;
    }
  }
  resize(width, height) {
    this.height = height;
    this.width = width;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
    this.Corners.BR = new Vector(this.right, this.bottom);
    this.Corners.TR = new Vectorr(this.right, this.top);
    this.Corners.BL = new Vectorr(this.left, this.bottom);
    if (this.element) {
      this.display.height = `${this.height}px`;
      this.display.width = `${this.width}px`;
    }
  }
  bindToDiv(div) {
    this.element = div;
    this.display = div.style;
  }
}

export let Vector = Vectorr,
  Box = Boxx;
