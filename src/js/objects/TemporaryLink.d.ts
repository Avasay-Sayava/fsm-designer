declare class TemporaryLink {
  from: { x: number; y: number };
  to: { x: number; y: number };

  constructor(from: { x: number; y: number }, to: { x: number; y: number });

  draw(c: CanvasRenderingContext2D): void;
}
