class TextBox {
  static padding = 5;

  constructor(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.outline = true;
    this.padding = TextBox.padding;
    this.align();
  }

  draw(c) {
    if (inArr(this, selectedObjects) && !this.outline)
      c.strokeStyle = "rgba(0,0,255,0.3)";
    else if (this == selectObject(mouseX, mouseY) && !this.outline)
      c.strokeStyle = "rgba(0,0,0,0.3)";
    if (
      this.outline ||
      inArr(this, selectedObjects) ||
      this == selectObject(mouseX, mouseY)
    )
      c.strokeRect(this.x, this.y, this.width, this.height);
    drawMultilineText(
      c,
      this.text,
      this.x + this.padding,
      this.y + 2.5 * this.padding,
      null,
      inArr(this, selectedObjects),
      false,
      false
    );
  }

  containsPoint(x, y) {
    return (
      this.x <= x &&
      this.x + this.width >= x &&
      this.y <= y &&
      this.y + this.height >= y
    );
  }

  setMouseStart(x, y) {
    this.mouseOffsetX = this.x - x;
    this.mouseOffsetY = this.y - y;
  }

  setAnchorPoint(x, y) {
    this.x = x + this.mouseOffsetX;
    this.y = y + this.mouseOffsetY;
  }

  align(minWidth = 0) {
    this.width = minWidth;
    this.height = 25 * this.text.split("\r").length;

    var start = 0;
    var c = canvas.getContext("2d");

    c.font = displayFont;
    for (var i = 0; i < this.text.split("\r").length; i++) {
      var text;
      if (inArr(this, selectedObjects) && selectedObjects.length == 1)
        text =
          convertLatexShortcuts(
            this.text.split("\r")[i].substring(0, selectedText[0] - start)
          ) +
          convertLatexShortcuts(
            this.text
              .split("\r")
              [i].substring(selectedText[0] - start, selectedText[1] - start)
          ) +
          convertLatexShortcuts(
            this.text.split("\r")[i].substring(selectedText[1] - start)
          );
      else text = convertLatexShortcuts(this.text.split("\r")[i]);

      this.width = Math.max(this.width, c.measureText(text).width);

      start += this.text.split("\r")[i].length + 1;
    }

    this.width += 2 * this.padding;
  }
}
