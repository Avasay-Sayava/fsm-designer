declare class Node {
  parent: Node;
  x: number;
  y: number;
  mouseOffsetX: number;
  mouseOffsetY: number;
  isAcceptState: boolean;
  text: string;
  outline: boolean;
  runtimeColor: string | null;

  constructor(x: number, y: number);

  setMouseStart(x: number, y: number): void;

  setAnchorPoint(x: number, y: number): void;

  draw(c: CanvasRenderingContext2D): void;

  closestPointOnCircle(x: number, y: number): { x: number; y: number };

  containsPoint(x: number, y: number): boolean;
}