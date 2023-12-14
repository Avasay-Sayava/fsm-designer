class Node {
  constructor(x, y) {
    this.parent = null;
    this.x = x;
    this.y = y;
    this.mouseOffsetX = 0;
    this.mouseOffsetY = 0;
    this.isAcceptState = false;
    this.text = "";
    this.outline = false;
    this.runtimeColor = null;
  }
  setMouseStart(x, y) {
    this.mouseOffsetX = this.x - x;
    this.mouseOffsetY = this.y - y;
  }
  setAnchorPoint(x, y) {
    this.x = x + this.mouseOffsetX;
    this.y = y + this.mouseOffsetY;
  }
  draw(c) {
    c.strokeStyle = c.fillStyle = this.runtimeColor ?? this.fillStyle;
    if (this.outline) {
      drawMultilineText(
        c,
        this.text,
        this.x,
        this.y,
        null,
        inArr(this, selectedObjects)
      );
      if (this != selectObject(mouseX, mouseY) && !inArr(this, selectedObjects))
        return;
      c.strokeStyle =
        this.runtimeColor ?? inArr(this, selectedObjects)
          ? "rgba(0, 0, 255, 0.3)"
          : "rgba(0, 0, 0, 0.3)";
    }

    // draw the circle
    c.beginPath();
    c.arc(this.x, this.y, nodeRadius, 0, 2 * Math.PI, false);
    c.stroke();

    if (!this.outline)
      // draw the text
      drawMultilineText(
        c,
        this.text,
        this.x,
        this.y,
        null,
        inArr(this, selectedObjects)
      );

    // draw a double circle for an accept state
    if (this.isAcceptState) {
      c.beginPath();
      c.arc(this.x, this.y, nodeRadius - 6, 0, 2 * Math.PI, false);
      c.stroke();
    }
  }
  closestPointOnCircle(x, y) {
    var dx = x - this.x;
    var dy = y - this.y;
    var scale = Math.sqrt(dx * dx + dy * dy);
    return {
      x: this.x + (dx * nodeRadius) / scale,
      y: this.y + (dy * nodeRadius) / scale,
    };
  }
  containsPoint(x, y) {
    return (
      (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y) <
      nodeRadius * nodeRadius
    );
  }
}
