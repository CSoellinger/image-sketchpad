/**
 * Image sketchpad (default) options
 */
export class Options {
  /**
   * Line width
   */
  lineWidth = 5;

  /**
   * Line max width
   */
  lineMaxWidth = -1;

  /**
   * Line color
   */
  lineColor = '#000';

  /**
   * Line cap
   */
  lineCap: CanvasLineCap = 'round';

  /**
   * Line join
   */
  lineJoin: CanvasLineJoin = 'round';

  /**
   * Line miter limit
   */
  lineMiterLimit = 10;
}
