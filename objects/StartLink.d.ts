declare class StartLink {
  node: Node;

  deltaX: number;
  deltaY: number;
  text: string;

  constructor(node: any, start?: { x: number; y: number });

  setAnchorPoint(x: number, y: number): void;

  getEndPoints(): {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  };

  draw(c: CanvasRenderingContext2D): void;

  containsPoint(x: number, y: number): boolean;
}
