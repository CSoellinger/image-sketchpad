/**
 * Canvas helper class. Inserts {@link HTMLCanvasElement} and handles position and size adjustments.
 */
export class Canvas {
    /**
     * Creates an instance of the canvas helper class.
     */
    constructor() {
        this.element = document.createElement('canvas');
        this.context = this.element.getContext('2d');
    }
    /**
     * Inserts canvas html element right after the reference element.
     *
     * @param refElement - Reference element where we want position the canvas.
     */
    async insert(refElement) {
        this.element.style.position = 'absolute';
        this.adjustFromElement(refElement).catch(this.throwError);
        if (refElement.parentNode) {
            refElement.parentNode.insertBefore(this.element, refElement.nextSibling);
        }
    }
    /**
     * Adjusts canvas size and position
     *
     * @param width   - New width for canvas
     * @param height  - New height for canvas
     * @param top     - New top position for canvas
     * @param left    - New left position for canvas
     */
    async adjust(width, height, top, left) {
        this.element.setAttribute('width', width.toString());
        this.element.setAttribute('height', height.toString());
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.top = `${top}px`;
        this.element.style.left = `${left}px`;
    }
    /**
     * Adjust canvas size and position from existing element
     *
     * @param element - Existing element as reference
     */
    async adjustFromElement(element) {
        this.adjust(element.clientWidth, element.clientHeight, element.offsetTop, element.offsetLeft).catch(this.throwError);
    }
    /**
     * Clear the canvas area
     */
    clear() {
        if (this.context === null) {
            return this;
        }
        this.context.clearRect(0, 0, this.element.width, this.element.height);
        return this;
    }
    /**
     * Draw stroke as a path on canvas area
     *
     * @param stroke  - {@link Stroke|Stroke} object with meta data
     * @param ratio   - Image/canvas ratio
     */
    async drawStroke(stroke, ratio) {
        if (this.context === null || stroke.points === null) {
            return;
        }
        this.context.beginPath();
        // Connect each points to get finally a stroke
        for (let i = 0; i < stroke.points.length - 1; i++) {
            const start = stroke.points[i];
            const end = stroke.points[i + 1];
            this.context.moveTo(start.x / ratio, start.y / ratio);
            this.context.lineTo(end.x / ratio, end.y / ratio);
        }
        this.context.closePath();
        if (stroke.color) {
            this.context.strokeStyle = stroke.color;
        }
        if (stroke.width) {
            this.context.lineWidth = stroke.width / ratio;
            // If stroke width is bigger as defined max-width (cause of image ratio),
            // we will set it as width.
            if ((stroke.maxWidth || 0) > 0 && this.context.lineWidth > (stroke.maxWidth || 0)) {
                this.context.lineWidth = stroke.maxWidth || 0;
            }
        }
        if (stroke.join) {
            this.context.lineJoin = stroke.join;
        }
        if (stroke.cap) {
            this.context.lineCap = stroke.cap;
        }
        if (stroke.miterLimit) {
            this.context.miterLimit = stroke.miterLimit;
        }
        this.context.stroke();
    }
    /**
     * Throws an error
     *
     * @param error - Error object/message
     */
    throwError(error) {
        throw new Error(String(error));
    }
}
