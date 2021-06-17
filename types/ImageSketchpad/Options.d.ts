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
};
/**
 * Image sketchpad default options
 */
export declare const DefaultOptions: Readonly<Options>;
/**
 * Image sketchpad user options with all properties as not required
 */
export declare type UserOptions = Partial<Options>;
