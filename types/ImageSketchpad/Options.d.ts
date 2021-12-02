/**
 * Image sketchpad options
 */
export declare type Options = {
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
export declare const DefaultOptions: Readonly<Options>;
/**
 * Image sketchpad user options with all properties as not required
 */
export declare type UserOptions = Partial<Options>;
