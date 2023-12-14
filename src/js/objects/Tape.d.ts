declare class Tape {
  cells: Cell[];
  x: number;
  y: number;

  constructor(x: number, y: number, tape?: Tape | null, uncycled?: boolean);

  add(text: string, index?: number): void;

  remove(index?: number): string;

  draw(c: CanvasRenderingContext2D): void;

  align(): void;
}
