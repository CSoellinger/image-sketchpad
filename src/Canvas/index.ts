import type { Point, Stroke } from './Draw';

/**
 * Canvas helper class. Inserts {@link HTMLCanvasElement|element} and handles position and size adjustments.
 */
export class Canvas {
  /**
   * Reference to the HTML canvas {@link HTMLCanvasElement|element}.
   */
  readonly element: HTMLCanvasElement;

  /**
   * Canvas rendering context of {@link Canvas.element|the canvas element}.
   */
  private readonly context: CanvasRenderingContext2D;

  /**
   * Creates an instance of the canvas helper class.
   */
  constructor() {
    this.element = <HTMLCanvasElement>document.createElement('canvas');
    this.context = <CanvasRenderingContext2D>this.element.getContext('2d');
  }

  /**
   * Inserts canvas html element right after the reference element.
   *
   * @param refElement - Reference {@link HTMLElement|element} where we want position the canvas.
   */
  insert(refElement: HTMLElement): void {
    this.element.style.position = 'absolute';

    this.adjustFromElement(refElement);

    refElement.parentNode?.insertBefore(this.element, refElement.nextSibling);
  }

  /**
   * Adjusts canvas size and position
   *
   * @param width   - New width for canvas
   * @param height  - New height for canvas
   * @param top     - New top position for canvas
   * @param left    - New left position for canvas
   */
  adjust(width: number, height: number, top: number, left: number): void {
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
   * @param element - Existing {@link HTMLElement|element} as reference
   */
  adjustFromElement(element: HTMLElement): void {
    this.adjust(element.clientWidth, element.clientHeight, element.offsetTop, element.offsetLeft);
  }

  /**
   * Clear the canvas area
   */
  clear(): Canvas {
    this.context.clearRect(0, 0, this.element.width, this.element.height);

    return this;
  }

  /**
   * Draw stroke as a path on canvas area
   *
   * @param stroke  - {@link Stroke|Stroke} object with meta data
   * @param ratio   - Image/canvas ratio
   */
  async drawStroke(stroke: Stroke, ratio: number): Promise<void> {
    if (Array.isArray(stroke.points) === false || stroke.points.length < 2) {
      return;
    }

    this.context.beginPath();

    // Connect each points to get finally a stroke
    for (let i = 0; i < stroke.points.length - 1; i++) {
      const start = <Point>stroke.points[i];
      const end = <Point>stroke.points[i + 1];

      this.context.moveTo(start.x / ratio, start.y / ratio);
      this.context.lineTo(end.x / ratio, end.y / ratio);
    }

    this.context.closePath();

    this.context.strokeStyle = stroke.color;
    this.context.lineWidth = stroke.width / ratio;

    // If stroke width is bigger as defined max-width (cause of image ratio),
    // we will set it as width.
    if (stroke.maxWidth > 0 && this.context.lineWidth > stroke.maxWidth) {
      this.context.lineWidth = stroke.maxWidth;
    }

    this.context.lineJoin = stroke.join;
    this.context.lineCap = stroke.cap;
    this.context.miterLimit = stroke.miterLimit;

    this.context.stroke();
  }
}

export { Point, Stroke } from './Draw';
