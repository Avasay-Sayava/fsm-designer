declare class ExportAsSVG {
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
