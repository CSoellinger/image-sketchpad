import { Point } from './Point';
/**
 * Stroke - Represents a stroke between two or more {@link Point | Points}.
 */
export declare class Stroke {
    /**
     * {@link Point | Points} of stroke
     */
    readonly points: Point[];
    /**
     * Width of stroke
     */
    readonly width: number;
    /**
     * Max width of stroke
     */
    readonly maxWidth: number;
    /**
     * Color of stroke
     */
    readonly color: string;
    /**
     * {@link CanvasLineCap | Canvas line cap} of stroke: "butt" | "round" | "square"
     */
    readonly cap: CanvasLineCap;
    /**
     * {@link CanvasLineJoin | Canvas line join} of stroke: "bevel" | "miter" | "round"
     */
    readonly join: CanvasLineJoin;
    /**
     * Miter limit of stroke
     */
    readonly miterLimit: number;
    /**
     * Creates an instance of stroke.
     *
     * @param points      - {@link Point | Points} of stroke
     * @param width       - Width of stroke
     * @param maxWidth    - Max width of stroke
     * @param color       - Color of stroke
     * @param cap         - {@link CanvasLineCap | Canvas line cap} of stroke: "butt" | "round" | "square"
     * @param join        - {@link CanvasLineJoin | Canvas line join} of stroke: "bevel" | "miter" | "round"
     * @param miterLimit  - Miter limit of stroke
     */
    constructor(points: Point[], width: number, maxWidth: number, color: string, cap: CanvasLineCap, join: CanvasLineJoin, miterLimit: number);
}
