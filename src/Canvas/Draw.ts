/**
 * Point - A point on the canvas set by coordinates.
 */
export type Point = {
  /**
   * X coordinate of point
   */
  readonly x: number;

  /**
   * Y coordinate of point
   */
  readonly y: number;
};

/**
 * Stroke - A line between two or more {@link Point|Points}.
 */
export type Stroke = {
  /**
   * {@link Point|Points} of stroke
   */
  readonly points: Point[];

  /**
   * Width of the stroke
   */
  readonly width: number;

  /**
   * Max width of the stroke
   */
  readonly maxWidth: number;

  /**
   * Color of the stroke
   */
  readonly color: string;

  /**
   * {@link CanvasLineCap|Canvas line cap} of the stroke: "butt" | "round" | "square"
   */
  readonly cap: CanvasLineCap;

  /**
   * {@link CanvasLineJoin|Canvas line join} of the stroke: "bevel" | "miter" | "round"
   */
  readonly join: CanvasLineJoin;

  /**
   * Miter limit of the stroke
   */
  readonly miterLimit: number;
};
