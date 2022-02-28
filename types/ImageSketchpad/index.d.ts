import { Canvas } from '../Canvas';
import type { UserOptions } from './Options';
/**
 * Image sketchpad main class. It handles creation of canvas element, drawing on
 * it, and merge it with the image and handle the data as json out- or input.
 */
export declare class ImageSketchpad {
    /**
     * Canvas helper class.
     */
    readonly canvas: Canvas;
    /**
     * Pica for image resizing. Used for saving in browser resized images.
     */
    private readonly pica;
    /**
     * Image element where we draw on it.
     */
    private readonly image;
    /**
     * Sketchpad settings, initialized with default options.
     */
    private options;
    /**
     * Array of strokes which represents your sketch.
     */
    private strokes;
    /**
     * Helper variable for "redo" method.
     */
    private undoneStrokes;
    /**
     * Helper variable if user started drawing a line.
     */
    private sketching;
    /**
     * Helper variable to get the save the active stroke during sketching is true.
     */
    private activeStroke;
    /**
     * Register image adjustment on resize.
     */
    private resizeHandler;
    /**
     * Creates an instance of image sketchpad.
     *
     * @param image   - Image html element.
     * @param options - Sketchpad options as javascript object.
     *
     * @example
     *
     * Run image sketchpad
     *
     * # VanillaJS
     *
     * ```
     * const imageEl = document.getElementById('Image');
     * const sketchPad = ImageSketchpad(imageEl, { lineWidth: 5, lineMaxWidth: 10, lineColor: '#ff0000' });
     * ```
     *
     */
    constructor(image: HTMLImageElement, options?: UserOptions);
    /**
     * Set sketchpad options.
     *
     * @param options - Sketchpad options.
     */
    setOptions(options: UserOptions): ImageSketchpad;
    /**
     * Enables image sketchpad.
     */
    enable(): ImageSketchpad;
    /**
     * Disables image sketchpad.
     */
    disable(): ImageSketchpad;
    /**
     * Get a json string which can be used to load a sketch again.
     */
    toJson(): string;
    toJsonAsync(): Promise<string>;
    /**
     * Load a sketch from a json string.
     *
     * @param json - JSON string to parse.
     */
    loadJson(json: string): Promise<ImageSketchpad>;
    /**
     * Clears the image sketchpad.
     */
    clear(): ImageSketchpad;
    /**
     * UnDo the last drawing on your sketch.
     */
    undo(): ImageSketchpad;
    /**
     * ReDo the last UnDone drawing on your sketch.
     */
    redo(): ImageSketchpad;
    /**
     * Merges image with sketch and returns a base64 string as promise.
     *
     * @param originalSize - Download image with original size.
     */
    mergeImageWithSketch(originalSize?: boolean): Promise<string>;
    /**
     * Download merged image with sketch as png file.
     *
     * @param originalSize - Download image with original size.
     */
    download(originalSize?: boolean): Promise<string>;
    /**
     * Destroy the instance and remove the canvas.
     */
    destroy(): void;
    /**
     * Register event listener for responsive adjustments and drawings.
     */
    private listen;
    /**
     * Starts stroke handler.
     *
     * @param event - {@link PointerEvent | Pointer event} is an extended mouse event which will handle touches too.
     */
    private startStrokeHandler;
    /**
     * Draws stroke handler.
     *
     * @param event - {@link PointerEvent | Pointer event} is an extended mouse event which will handle touches too.
     */
    private drawStrokeHandler;
    /**
     * Ends stroke handler.
     *
     * @param event - {@link PointerEvent | Pointer event} is an extended mouse event which will handle touches too.
     */
    private endStrokeHandler;
    /**
     * Get the image ratio.
     */
    private getImageRatio;
    /**
     * Get a {@link Point | Point} from the cursor(mouse) or finger(touch).
     *
     * @param event - {@link PointerEvent | Pointer event} triggered from pointerdown, pointermove or pointerup.
     */
    private getPointFromCursor;
    /**
     * Create stroke from an array of {@link Point | Points}.
     *
     * @param points - Array of {@link Point | Points}.
     */
    private createStroke;
    /**
     * Push {@link Point | Point} to {@link Stroke | Stroke}.
     *
     * @param point  - {@link Point | Point} to push.
     * @param stroke - {@link Stroke | Stroke} to push into.
     */
    private pushPoint;
    /**
     * Redraw the sketch on the canvas. Mean it clears first and draw all
     * strokes again.
     *
     * @param imageRatio - Redraw with a specified image ratio (for example if
     *                     you want draw the canvas in original size).
     */
    private redraw;
    /**
     * Throws an error.
     *
     * @param this  - Self.
     * @param error - Error message.
     */
    private throwError;
    /**
     * Async method of {@link ImageSketchpad.redraw | ImageSketchpad.redraw()}
     */
    private redrawAsync;
}
export { DefaultOptions, Options, UserOptions } from './Options';
