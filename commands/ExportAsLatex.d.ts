declare class ExportAsLaTeX {
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
