class Cell extends TextBox {
  static width = 40;
  static height = 30;

  constructor(text, x, y, tape, index) {
    super(text, x, y);
    this.index = index;
    this.tape = tape;
    this.align(Cell.width);
  }

  draw(c) {
    c.strokeRect(this.x, this.y, this.width, this.height);
    drawMultilineText(
      c,
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 2,
      null,
      inArr(this, selectedObjects),
      true,
      true
    );
  }

  setMouseStart(x, y) {
    this.mouseOffsetX = this.tape.x - x;
    this.mouseOffsetY = this.tape.y - y;
  }

  setAnchorPoint(x, y) {
    this.tape.x = x + this.mouseOffsetX;
    this.tape.y = y + this.mouseOffsetY;
    this.tape.align();
  }

  right() {
    return this.tape.cells[this.index + 1];
  }

  left() {
    return this.tape.cells[this.index - 1];
  }
}
