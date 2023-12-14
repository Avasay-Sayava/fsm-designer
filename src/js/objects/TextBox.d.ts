declare class TextBox {
  static padding: number;

  text: string;
  x: number;
  y: number;
  outline: boolean;
  padding: number;
  width: number;
  height: number;
  mouseOffsetX: number;
  mouseOffsetY: number;

  constructor(text: string, x: number, y: number);

  draw(c: CanvasRenderingContext2D): void;

  containsPoint(x: number, y: number): boolean;

  setMouseStart(x: number, y: number): void;

  setAnchorPoint(x: number, y: number): void;

  align(minWidth?: number): void;
}
