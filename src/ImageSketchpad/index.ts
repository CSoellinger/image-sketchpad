import { Canvas, Point, Stroke } from '../Canvas';
import mergeImages from 'merge-images';
import { DefaultOptions, Options, UserOptions } from './Options';

/**
 * Image sketchpad main class. It handles creation of canvas element, drawing on
 * it, and merge it with the image and handle the data as json out- or input.
 */
export class ImageSketchpad {
  /**
   * Canvas helper class
   */
  readonly canvas: Canvas = new Canvas();

  /**
   * Image element where we draw on it.
   */
  private readonly image: HTMLImageElement;

  /**
   * Sketchpad settings, initialized with default options
   */
  private options: Options = DefaultOptions;

  /**
   * Array of strokes which represents your sketch
   */
  private strokes: Stroke[] = [];

  /**
   * Enable/disable sketchpad
   */
  private enabled = true;

  /**
   * Helper variable for "redo" method
   */
  private undoneStrokes: Stroke[] = [];

  /**
   * Helper variable if user started drawing a line
   */
  private sketching = false;

  /**
   * Helper variable to get the save the active stroke during sketching is true
   */
  private activeStroke: Stroke | undefined;

  private resizeHandler: () => void;

  /**
   * Creates an instance of image sketchpad.
   *
   * @param image    - Image html element.
   * @param options  - Sketchpad options as javascript object.
   * @example
   *
   * Run image sketchpad
   *
   * # VanillaJS
   *
   * ```
   * const imageEl = document.getElementById('Image');
   * const sketchPad = new ImageSketchpad(imageEl, { lineWidth: 5, lineMaxWidth: 10, lineColor: '#ff0000' });
   * ```
   *
   */
  constructor(image: HTMLImageElement, options?: UserOptions) {
    // Check if element is defined and has a "src" attribute (simple check for image element)
    if (image === null || image === undefined || image.src === undefined) {
      this.throwError('Must pass in a html image element with "src" attribute');
    }

    // Throw error on double initialization (in theory: this should never happen)
    if (image.classList.contains('sketchpad-loaded') === true) {
      this.throwError('Double initialization');
    }

    this.image = image;

    // If some user options are given we will merge them with the default ones
    if (options) {
      this.setOptions(options);
    }

    // Create a initialization id and set it as data attribute and css class to the image
    const instanceId = Math.random().toString(36).slice(2, 11);

    this.image.classList.add('sketchpad-loaded');
    this.image.classList.add(`sketchpad-${instanceId}`);
    this.image.dataset['sketchpad'] = instanceId;

    this.resizeHandler = () => {
      if (this.image.width !== this.canvas.element.width) {
        this.canvas.adjustFromElement(this.image);
        this.redrawAsync().catch(this.throwError);
      }
    };

    this.canvas.insert(this.image);

    // Register event listeners
    this.listen().catch(this.throwError);

    // If we have a "data-sketchpad-json" attribute we will try to load the sketch
    if (this.image.dataset['sketchpadJson']) {
      this.loadJson(this.image.dataset['sketchpadJson']).catch(this.throwError);
    }
  }

  /**
   * Set sketchpad options.
   *
   * @param options  - Sketchpad options.
   */
  setOptions(options: UserOptions): ImageSketchpad {
    this.options = Object.assign(this.options, options);

    return this;
  }

  /**
   * Enables image sketchpad
   */
  enable(): ImageSketchpad {
    this.enabled = true;

    return this;
  }

  /**
   * Disables image sketchpad
   */
  disable(): ImageSketchpad {
    this.enabled = false;

    return this;
  }

  /**
   * Get a json string which can be used to load a sketch again
   */
  toJson(): string {
    return JSON.stringify(
      Object.assign(
        {},
        {
          strokes: this.strokes,
          options: this.options,
        }
      )
    );
  }

  async toJsonAsync(): Promise<string> {
    return this.toJson();
  }

  /**
   * Load a sketch from a json string.
   *
   * @param json  - JSON string to parse.
   */
  async loadJson(json: string): Promise<ImageSketchpad> {
    let object: {
      strokes: Stroke[];
      options: Options;
    };

    try {
      object = JSON.parse(json) as {
        strokes: Stroke[];
        options: Options;
      };
    } catch (error: unknown) {
      throw new Error(String(error));
    }

    this.image.dataset['sketchpadJson'] = json;

    this.strokes = object.strokes || [];
    this.setOptions(object.options).redrawAsync().catch(this.throwError);

    return this;
  }

  /**
   * Clears the image sketchpad
   */
  clear(): ImageSketchpad {
    this.strokes = [];
    this.redrawAsync().catch(this.throwError);

    return this;
  }

  /**
   * UnDo the last drawing on your sketch
   */
  undo(): ImageSketchpad {
    if (this.strokes.length === 0) {
      return this;
    }

    const stroke = this.strokes.pop();
    this.undoneStrokes.push(<Stroke>stroke);

    this.redrawAsync().catch(this.throwError);

    return this;
  }

  /**
   * ReDo the last UnDone drawing on your sketch
   */
  redo(): ImageSketchpad {
    if (this.undoneStrokes.length === 0) {
      return this;
    }

    const stroke = this.undoneStrokes.pop();
    this.strokes.push(<Stroke>stroke);

    this.redrawAsync().catch(this.throwError);

    return this;
  }

  /**
   * Merges image with sketch and returns a base64 string as promise
   */
  async mergeImageWithSketch(): Promise<string> {
    return mergeImages([this.image.src, this.canvas.element.toDataURL()]);
  }

  /**
   * Download merged image with sketch as png file
   */
  async download(): Promise<string> {
    let fileName = this.image.src;

    fileName = fileName.toLowerCase().startsWith('data:')
      ? String(Date.now())
      : String(String(fileName.split('\\').pop()).split('/').pop());

    fileName += '.sketch.png';

    return this.mergeImageWithSketch().then((b64: string) => {
      const downloadLink = document.createElement('a');

      downloadLink.href = b64;
      downloadLink.download = fileName;
      downloadLink.click();

      return b64;
    });
  }

  destroy(): void {
    window.removeEventListener('resize', this.resizeHandler, false);
    this.undoneStrokes = [];
    this.strokes = [];
    this.options = DefaultOptions;
    this.canvas.element.remove();
  }

  /**
   * Register event listener for responsive adjustments and drawings
   */
  private async listen(): Promise<ImageSketchpad> {
    // If the image is not completely loaded we will add an event listener to
    // re-adjust the canvas
    if (this.image.complete === false) {
      const imgEventLoad = () => {
        this.resizeHandler();
        this.image.removeEventListener('load', imgEventLoad);
      };
      this.image.addEventListener('load', imgEventLoad);
    }

    window.addEventListener('resize', this.resizeHandler, { passive: true });

    // For drawings we need to start, draw and end a stroke
    const canvasEvents = [
      // On mousedown, touchstart we start drawing
      {
        events: ['mousedown', 'touchstart'],
        caller: (event: MouseEvent | TouchEvent) => {
          this.startStrokeHandler(event);
        },
      },
      // Draw during mousemove, touchmove
      {
        events: ['mousemove', 'touchmove'],
        caller: (event: MouseEvent | TouchEvent) => {
          this.drawStrokeHandler(event);
        },
      },
      // And finish the stroke after mouseup, mouseleave, touchend
      {
        events: ['mouseup', 'mouseleave', 'touchend'],
        caller: (event: MouseEvent | TouchEvent) => {
          this.endStrokeHandler(event);
        },
      },
    ];

    // Register the events
    for (const object of canvasEvents) {
      for (const name of object.events) {
        let options = {};

        if (name === 'touchstart' || name === 'touchmove') {
          options = { passive: true };
        }

        this.canvas.element.addEventListener(
          name,
          (event: Event) => {
            if (this.enabled === false) {
              return;
            }

            object.caller(<MouseEvent | TouchEvent>event);
          },
          options
        );
      }
    }

    return this;
  }

  /**
   * Starts stroke handler.
   *
   * @param event  - mousedown, touchstart event.
   */
  private startStrokeHandler(event: MouseEvent | TouchEvent): ImageSketchpad {
    event.preventDefault();

    this.sketching = true;

    const point = this.getPointFromCursor(event);
    const stroke = this.createStroke([point]);

    this.activeStroke = stroke;
    this.strokes.push(stroke);
    this.redraw();

    return this;
  }

  /**
   * Draws stroke handler.
   *
   * @param event  - mousemove, touchmove event.
   */
  private drawStrokeHandler(event: MouseEvent | TouchEvent): ImageSketchpad {
    event.preventDefault();

    // Drawing was not started by startStrokeHandler
    if (this.sketching === false) {
      return this;
    }

    const point = this.getPointFromCursor(event);

    this.pushPoint(point, this.activeStroke).redrawAsync().catch(this.throwError);

    return this;
  }

  /**
   * Ends stroke handler.
   *
   * @param event  - mouseup, mouseleave, touchend event.
   */
  private endStrokeHandler(event: MouseEvent | TouchEvent): ImageSketchpad {
    event.preventDefault();

    // Drawing was not started by startStrokeHandler
    if (this.sketching === false) {
      return this;
    }

    this.image.dataset['sketchpadJson'] = this.toJson();
    this.sketching = false;

    // Touchend events do not have a position
    if (this.isTouchEvent(event)) {
      this.activeStroke = undefined;

      return this;
    }

    const point = this.getPointFromCursor(event);

    this.pushPoint(point, this.activeStroke).redrawAsync().catch(this.throwError);

    this.activeStroke = undefined;

    return this;
  }

  /**
   * Get the image ratio
   */
  private getImageRatio(): number {
    return this.image.naturalWidth / this.image.width;
  }

  /**
   * Get a {@link Point | Point} from the cursor(mouse) or finger(touch)
   *
   * @param event  - mousedown, touchstart, mousemove, touchmove, mouseup, mouseleave, touchend event.
   */
  private getPointFromCursor(event: MouseEvent | TouchEvent): Point {
    const coord = { x: 0, y: 0 };

    if (this.isTouchEvent(event)) {
      const touchEvent = event as TouchEvent;
      // console.log('touchEvent.touches', touchEvent.touches, typeof touchEvent.touches);
      const touch = <Touch>touchEvent.touches.item(0);

      coord.x = touch.pageX - this.canvas.element.offsetLeft;
      coord.y = touch.pageY - this.canvas.element.offsetTop;
    } else {
      const mouseEvent = event as MouseEvent;
      const rect = this.canvas.element.getBoundingClientRect();

      coord.x = mouseEvent.clientX - rect.left;
      coord.y = mouseEvent.clientY - rect.top;
    }

    return <Point>{
      x: coord.x * this.getImageRatio(),
      y: coord.y * this.getImageRatio(),
    };
  }

  /**
   * Create stroke from an array of {@link Point | Points}
   *
   * @param points  - Array of {@link Point | Points}
   */
  private createStroke(points: Point[]): Stroke {
    return <Stroke>{
      points,
      width: this.options.lineWidth,
      maxWidth: this.options.lineMaxWidth,
      color: this.options.lineColor,
      cap: this.options.lineCap,
      join: this.options.lineJoin,
      miterLimit: this.options.lineMiterLimit,
    };
  }

  /**
   * Push {@link Point | Point} to {@link Stroke | Stroke}
   *
   * @param point   - {@link Point | Point} to push.
   * @param stroke  - {@link Stroke | Stroke} to push into.
   */
  private pushPoint(point: Point, stroke?: Stroke): ImageSketchpad {
    stroke = stroke ?? this.strokes[this.strokes.length - 1];
    stroke?.points?.push(point);

    return this;
  }

  /**
   * Redraw the sketch on the canvas. Mean it clears first and draw all
   * strokes again
   */
  private redraw(): ImageSketchpad {
    this.canvas.clear();

    for (const stroke of this.strokes) {
      this.canvas.drawStroke(stroke, this.getImageRatio()).catch(this.throwError);
    }

    return this;
  }

  private async redrawAsync(): Promise<ImageSketchpad> {
    return this.redraw();
  }

  /**
   * Check if given event is a touch event.
   *
   * @param event  - Event to check.
   */
  private isTouchEvent(event: Event): boolean {
    return event.type.startsWith('touch');
  }

  /**
   * Throws an error.
   *
   * @param this   - Self.
   * @param error  - Error message.
   */
  private throwError(this: void, error: unknown): void {
    throw new Error(String(error));
  }
}

export { DefaultOptions, Options, UserOptions } from './Options';
