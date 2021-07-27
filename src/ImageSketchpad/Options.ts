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

  /**
   * Enable or disable sketchpad on init
   */
  enabled: boolean;

  /**
   * Setting this to true(default) will set a json string to the canvas
   * html attribute. You get the same string by calling
   * {@link ImageSketchpad.toJson | ImageSketchpad.toJson()}
   */
  writeJsonToHtmlAttribute: boolean;
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
  enabled: true,
  writeJsonToHtmlAttribute: true,
};

/**
 * Image sketchpad user options with all properties as not required
 */
export type UserOptions = Partial<Options>;
