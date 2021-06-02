/**
 * Point - Represents a point inside the canvas.
 */
export class Point {
  /**
   * X coordinate of point
   */
  readonly x: number;

  /**
   * Y coordinate of point
   */
  readonly y: number;

  /**
   * Creates an instance of point.
   *
   * @param x - X coordinate of point
   * @param y - Y coordinate of point
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
