/**
 * Image sketchpad options
 */
export type Options = {
  /**
   * Line width
   */
  lineWidth: number;

  /**
   * Line max width
   */
  lineMaxWidth: number;

  /**
   * Line color
   */
  lineColor: string;

  /**
   * Line cap
   */
  lineCap: CanvasLineCap;

  /**
   * Line join
   */
  lineJoin: CanvasLineJoin;

  /**
   * Line miter limit
   */
  lineMiterLimit: number;
};

/**
 * Image sketchpad default options
 */
export const DefaultOptions: Readonly<Options> = {
  lineWidth: 5,
  lineMaxWidth: -1,
  lineColor: '#000',
  lineCap: 'round',
  lineJoin: 'round',
  lineMiterLimit: 10,
};

/**
 * Image sketchpad user options with all properties as not required
 */
export type UserOptions = Partial<Options>;
