import { Stroke } from './Draw';
/**
 * Canvas helper class. Inserts {@link HTMLCanvasElement} and handles position and size adjustments.
 */
export declare class Canvas {
    /**
     * Reference to the HTML canvas element.
     */
    readonly element: HTMLCanvasElement;
    /**
     * Canvas rendering context of {@link Canvas.element}.
     */
    private readonly context;
    /**
     * Creates an instance of the canvas helper class.
     */
    constructor();
    /**
     * Inserts canvas html element right after the reference element.
     *
     * @param refElement - Reference element where we want position the canvas.
     */
    insert(refElement: HTMLElement): Promise<void>;
    /**
     * Adjusts canvas size and position
     *
     * @param width   - New width for canvas
     * @param height  - New height for canvas
     * @param top     - New top position for canvas
     * @param left    - New left position for canvas
     */
    adjust(width: number, height: number, top: number, left: number): Promise<void>;
    /**
     * Adjust canvas size and position from existing element
     *
     * @param element - Existing element as reference
     */
    adjustFromElement(element: HTMLElement): Promise<void>;
    /**
     * Clear the canvas area
     */
    clear(): Canvas;
    /**
     * Draw stroke as a path on canvas area
     *
     * @param stroke  - {@link Stroke|Stroke} object with meta data
     * @param ratio   - Image/canvas ratio
     */
    drawStroke(stroke: Stroke, ratio: number): Promise<void>;
    /**
     * Throws an error
     *
     * @param error - Error object/message
     */
    private throwError;
}
export { Point, Stroke } from './Draw';
