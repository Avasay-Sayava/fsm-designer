class Tape {
  constructor(x, y, tape = null, uncycled = false) {
    if (tape != null) {
      this.cells = [];
      this.x = tape.x;
      this.y = tape.y;
      for (var i = 0; i < tape.cells.length; i++) {
        this.cells.push(
          new Cell(
            tape.cells[i].text,
            this.x + i * Cell.width,
            this.y,
            uncycled ? null : this,
            i
          )
        );
        this.cells[this.cells.length - 1].outline = tape.cells[i].outline;
      }
      if (!uncycled) cells.push(...this.cells);
    } else {
      this.cells = [
        new Cell("\\Delta", x, y, this, 0),
        new Cell("\\Delta", x + Cell.width, y, this, 1),
        new Cell("\\Delta", x + 2 * Cell.width, y, this, 2),
        new Cell("\\Delta", x + 3 * Cell.width, y, this, 3),
        new Cell("\\Delta", x + 4 * Cell.width, y, this, 4),
        new Cell("...", x + 5 * Cell.width, y, this, 5),
      ];
      cells.push(...this.cells);
      this.x = x;
      this.y = y;
    }

    this.align();
  }

  add(text, index = this.cells.length) {
    var cell = new Cell(text, 0, 0, this, index);

    this.cells.splice(index, 0, cell);

    cells.push(cell);

    this.align();
  }

  remove(index = this.cells.length - 1) {
    var out = this.cells[index];
    this.cells.splice(index, 1);

    for (var i = 0; i < cells.length; i++) {
      if (cells[i] == out) {
        cells.splice(i, 1);
        break;
      }
    }

    this.align();

    return out.text;
  }

  draw(c) {
    this.cells.forEach(function (e) {
      e.draw(c);
    });
  }

  align() {
    var widthSum = 0;
    var maxHeight = 0;

    for (var i = 0; i < this.cells.length; i++) {
      this.cells[i].align(Cell.width - 2 * TextBox.padding);
      this.cells[i].index = i;
      this.cells[i].x = this.x + widthSum;
      this.cells[i].y = this.y;
      widthSum += this.cells[i].width;
      maxHeight = Math.max(maxHeight, this.cells[i].height);
    }

    for (var i = 0; i < this.cells.length; i++) {
      this.cells[i].height = maxHeight;
    }
  }
}
