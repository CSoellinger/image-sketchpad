/* eslint max-params: ["error", 7] */
/**
 * Stroke - Represents a stroke between two or more {@link Point | Points}.
 */
export class Stroke {
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
    constructor(points, width, maxWidth, color, cap, join, miterLimit) {
        this.points = points;
        this.width = width;
        this.maxWidth = maxWidth;
        this.color = color;
        this.cap = cap;
        this.join = join;
        this.miterLimit = miterLimit;
    }
}
