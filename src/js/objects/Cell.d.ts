declare class Cell extends TextBox {
  static width: number;
  static height: number;

  index: number;
  tape: Tape;

  constructor(text: string, x: number, y: number, tape: any, index: number);

  draw(c: CanvasRenderingContext2D): void;

  setMouseStart(x: number, y: number): void;

  setAnchorPoint(x: number, y: number): void;

  right(): Cell | undefined;

  left(): Cell | undefined;
}
