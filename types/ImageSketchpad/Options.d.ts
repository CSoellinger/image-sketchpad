/**
 * Image sketchpad options.
 */
export declare type Options = {
    /**
     * Line width.
     *
     * @defaultValue `5`
     */
    lineWidth: number;
    /**
     * Line max width.
     *
     * @defaultValue `-1`
     */
    lineMaxWidth: number;
    /**
     * Line color.
     *
     * @defaultValue `#000`
     */
    lineColor: string;
    /**
     * Line cap.
     *
     * @defaultValue `round`
     */
    lineCap: CanvasLineCap;
    /**
     * Line join.
     *
     * @defaultValue `round`
     */
    lineJoin: CanvasLineJoin;
    /**
     * Line miter limit.
     *
     * @defaultValue `10`
     */
    lineMiterLimit: number;
    /**
     * Enable or disable sketchpad on init.
     *
     * @defaultValue `true`
     */
    enabled: boolean;
    /**
     * Setting this to true(default) will add a data attribute with the sketchpad
     * json data. This is the same string like you would get with {@link ImageSketchpad.toJson | ImageSketchpad.toJson()}.
     *
     * @defaultValue `true`
     */
    writeJsonToHtmlAttribute: boolean;
};
/**
 * Image sketchpad user options setting all properties as not required (Partial).
 */
export declare type UserOptions = Partial<Options>;
/**
 * Image sketchpad default options.
 */
export declare const DefaultOptions: Readonly<Options>;
