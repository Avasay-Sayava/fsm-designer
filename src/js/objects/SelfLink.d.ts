declare class SelfLink {
  node: Node;
  anchorAngle: number;
  mouseOffsetAngle: number;
  text: string;

  constructor(node: any, mouse?: { x: number; y: number });

  setMouseStart(x: number, y: number): void;

  setAnchorPoint(x: number, y: number): void;

  getEndPointsAndCircle(): {
    hasCircle: boolean;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    startAngle: number;
    endAngle: number;
    circleX: number;
    circleY: number;
    circleRadius: number;
  };

  draw(c: CanvasRenderingContext2D): void;

  containsPoint(x: number, y: number): boolean;
}
