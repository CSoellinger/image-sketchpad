import { Canvas } from '../Canvas';
import { UserOptions } from './Options';
/**
 * Image sketchpad main class. It handles creation of canvas element, drawing on
 * it, and merge it with the image and handle the data as json out- or input.
 */
export declare class ImageSketchpad {
    /**
     * Canvas helper class
     */
    readonly canvas: Canvas;
    /**
     * Image element where we draw on it.
     */
    private readonly image;
    /**
     * Sketchpad settings, initialized with default options
     */
    private options;
    /**
     * Array of strokes which represents your sketch
     */
    private strokes;
    /**
     * Enable/disable sketchpad
     */
    private enabled;
    /**
     * Helper variable for "redo" method
     */
    private undoneStrokes;
    /**
     * Helper variable if user started drawing a line
     */
    private sketching;
    /**
     * Helper variable to get the save the active stroke during sketching is true
     */
    private activeStroke;
    private resizeHandler;
    /**
     * Creates an instance of image sketchpad.
     *
     * @param image   - Image html element
     * @param options - Sketchpad options as javascript object.
     *
     * @example Run image sketchpad
     *
     * # VanillaJS
     *
     * ```
     * const imageEl = document.getElementById('Image');
     * const sketchPad = new ImageSketchpad(imageEl, { lineWidth: 5, lineMaxWidth: 10, lineColor: '#ff0000' });
     * ```
     */
    constructor(image: HTMLImageElement, options?: UserOptions);
    /**
     * Set sketchpad options
     *
     * @param options - Sketchpad options
     */
    setOptions(options: UserOptions): ImageSketchpad;
    /**
     * Enables image sketchpad
     */
    enable(): ImageSketchpad;
    /**
     * Disables image sketchpad
     */
    disable(): ImageSketchpad;
    /**
     * Get a json string which can be used to load a sketch again
     */
    toJson(): string;
    toJsonAsync(): Promise<string>;
    /**
     * Load a sketch from a json string
     *
     * @param json - JSON string to parse
     */
    loadJson(json: string): Promise<ImageSketchpad>;
    /**
     * Clears the image sketchpad
     */
    clear(): ImageSketchpad;
    /**
     * UnDo the last drawing on your sketch
     */
    undo(): ImageSketchpad;
    /**
     * ReDo the last UnDone drawing on your sketch
     */
    redo(): ImageSketchpad;
    /**
     * Merges image with sketch and returns a base64 string as promise
     */
    mergeImageWithSketch(): Promise<string>;
    /**
     * Download merged image with sketch as png file
     */
    download(): Promise<string>;
    destroy(): void;
    /**
     * Register event listener for responsive adjustments and drawings
     */
    private listen;
    /**
     * Starts stroke handler
     *
     * @param event - mousedown, touchstart event
     */
    private startStrokeHandler;
    /**
     * Draws stroke handler
     *
     * @param event - mousemove, touchmove event
     */
    private drawStrokeHandler;
    /**
     * Ends stroke handler
     *
     * @param event - mouseup, mouseleave, touchend event
     */
    private endStrokeHandler;
    /**
     * Get the image ratio
     */
    private getImageRatio;
    /**
     * Get a {@link Point | Point} from the cursor(mouse) or finger(touch)
     *
     * @param event - mousedown, touchstart, mousemove, touchmove, mouseup, mouseleave, touchend event
     */
    private getPointFromCursor;
    /**
     * Create stroke from an array of {@link Point | Points}
     *
     * @param points - Array of {@link Point | Points}
     */
    private createStroke;
    /**
     * Push {@link Point | Point} to {@link Stroke | Stroke}
     *
     * @param point   - {@link Point | Point} to push
     * @param stroke  - {@link Stroke | Stroke} to push into
     */
    private pushPoint;
    /**
     * Redraw the sketch on the canvas. Mean it clears first and draw all
     * strokes again
     */
    private redraw;
    private redrawAsync;
    /**
     * Check if given event is a touch event
     *
     * @param event - Event to check
     */
    private isTouchEvent;
    /**
     * Throws an error
     *
     * @param error - Error message
     */
    private throwError;
}
export { DefaultOptions, Options, UserOptions } from './Options';
