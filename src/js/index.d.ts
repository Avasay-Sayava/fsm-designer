export declare class Node {
  static radius: number;
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

export declare class Link {
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

export declare class SelfLink {
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

export declare class StartLink {
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

export declare class TemporaryLink {
  from: { x: number; y: number };
  to: { x: number; y: number };

  constructor(from: { x: number; y: number }, to: { x: number; y: number });

  draw(c: CanvasRenderingContext2D): void;
}

export declare class TextBox {
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

export declare class Cell extends TextBox {
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

export declare class Tape {
  cells: Cell[];
  x: number;
  y: number;

  constructor(x: number, y: number, tape?: Tape | null, uncycled?: boolean);

  add(text: string, index?: number): void;

  remove(index?: number): string;

  draw(c: CanvasRenderingContext2D): void;

  align(): void;
}

export declare class ExportAsLaTeX {
  constructor(bounds: number[]);
  private _points: { x: number; y: number }[];
  private _texData: string;
  private _scale: number;

  toLaTeX(): string;
  beginPath(): void;
  arc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    isReversed: boolean
  ): void;
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  stroke(): void;
  fill(): void;
  measureText(text: string): TextMetrics;
  advancedFillText(
    text: string,
    originalText: string,
    x: number,
    y: number,
    angleOrNull: number | null
  ): void;
  translate(): void;
  save(): void;
  restore(): void;
  clearRect(): void;
}

export declare class ExportAsSVG {
  constructor(bounds: number[]);
  width: number;
  height: number;
  bounds: number[];
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;
  font: string;
  private _points: { x: number; y: number }[];
  private _svgData: string;
  private _transX: number;
  private _transY: number;

  toSVG(): string;
  beginPath(): void;
  arc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    isReversed: boolean
  ): void;
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  stroke(): void;
  fill(): void;
  measureText(text: string): TextMetrics;
  fillText(text: string, x: number, y: number): void;
  translate(x: number, y: number): void;
  save(): void;
  restore(): void;
  clearRect(): void;
}
