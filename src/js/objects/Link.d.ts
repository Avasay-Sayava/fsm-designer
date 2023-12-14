declare class Link {
  nodeA: Node;
  nodeB: Node;
  text: string;
  lineAngleAdjust: number;
  parallelPart: number;
  perpendicularPart: number;

  constructor(a: any, b: any);

  getAnchorPoint(): { x: number; y: number };

  setAnchorPoint(x: number, y: number): void;

  getEndPointsAndCircle(): {
    hasCircle: boolean;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    startAngle?: number;
    endAngle?: number;
    circleX?: number;
    circleY?: number;
    circleRadius?: number;
    reverseScale?: number;
    isReversed?: boolean;
  };

  draw(c: CanvasRenderingContext2D): void;

  containsPoint(x: number, y: number): boolean;
}
