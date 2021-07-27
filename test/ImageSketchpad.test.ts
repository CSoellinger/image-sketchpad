import mergeImages from 'merge-images';

import { Canvas, Stroke } from '../src/Canvas';
import { Options, DefaultOptions, ImageSketchpad } from '../src/ImageSketchpad';

const base64String = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
const mockCanvasAdjustFromElement = jest.fn();

jest.mock('merge-images');
(<jest.Mock>mergeImages).mockResolvedValue(base64String);

jest.mock('../src/Canvas', () => {
  return {
    Canvas: jest.fn().mockImplementation(() => {
      const element = global.document.createElement('canvas');
      const context = element.getContext('2d');

      return {
        element,
        context,
        insert: jest.fn().mockReturnValue(Promise.resolve()),
        adjustFromElement: mockCanvasAdjustFromElement,
        drawStroke: jest.fn().mockReturnValue(Promise.resolve()),
        clear: jest.fn().mockReturnThis(),
      };
    }),
  };
});

if (!global.PointerEvent) {
  class PointerEvent extends MouseEvent {
    public height?: number;
    public isPrimary?: boolean;
    public pointerId?: number;
    public pointerType?: string;
    public pressure?: number;
    public tangentialPressure?: number;
    public tiltX?: number;
    public tiltY?: number;
    public twist?: number;
    public width?: number;

    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
      this.pointerId = params.pointerId;
      this.width = params.width;
      this.height = params.height;
      this.pressure = params.pressure;
      this.tangentialPressure = params.tangentialPressure;
      this.tiltX = params.tiltX;
      this.tiltY = params.tiltY;
      this.pointerType = params.pointerType;
      this.isPrimary = params.isPrimary;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
  global.PointerEvent = PointerEvent as any;
}

describe('Testing ImageSketchpad Class', () => {
  let defaultObj: { strokes: Stroke[] | undefined; options: Options };
  let image: HTMLImageElement;
  let imageSketchpad: ImageSketchpad | null = null;

  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <img id="Image" src="../media/fish.png" id="Image" width="800" height="530">
        <div></div>
      </div>`.trim();

    defaultObj = { strokes: [], options: DefaultOptions };
    image = <HTMLImageElement>document.getElementById('Image');
    imageSketchpad = null;

    jest.spyOn(image, 'clientWidth', 'get').mockImplementation(() => 800);
    jest.spyOn(image, 'clientHeight', 'get').mockImplementation(() => 530);
    jest.spyOn(image, 'offsetLeft', 'get').mockImplementation(() => 8);
    jest.spyOn(image, 'offsetTop', 'get').mockImplementation(() => 8);
  });

  afterEach(() => {
    defaultObj.options.lineWidth = 5;
    defaultObj.strokes = [];
    image.dataset['sketchpadJson'] = '';
    document.body.innerHTML = '';
    imageSketchpad?.destroy();
  });

  it('Should initialize and call canvas class constructor one time', () => {
    imageSketchpad = new ImageSketchpad(image, {});

    expect(imageSketchpad).toBeTruthy();
    expect(Canvas).toHaveBeenCalledTimes(1);
    expect(image.classList.contains('sketchpad-loaded')).toBeTruthy();
  });

  it('Should return sketchpad default data as json', async () => {
    imageSketchpad = new ImageSketchpad(image);

    return imageSketchpad.toJsonAsync().then((jsonString) => {
      expect(jsonString).toMatchSnapshot();

      return jsonString;
    });
  });

  it('Should run image load listener with canvas width equals image width', () => {
    image.width = 300;
    imageSketchpad = new ImageSketchpad(image);
    image.dispatchEvent(new Event('load'));

    expect(imageSketchpad).toBeTruthy();
  });

  it('Should run image load listener', () => {
    imageSketchpad = new ImageSketchpad(image);
    image.dispatchEvent(new Event('load'));

    expect(imageSketchpad).toBeTruthy();
  });

  it('Should not run image load listener', () => {
    jest.spyOn(image, 'complete', 'get').mockImplementation(() => true);

    imageSketchpad = new ImageSketchpad(image);
    image.dispatchEvent(new Event('load'));

    expect(imageSketchpad).toBeTruthy();
  });

  it('Should disable and enable sketchpad', () => {
    imageSketchpad = new ImageSketchpad(image, { enabled: false });

    expect(imageSketchpad['options']['enabled']).toBeFalsy();

    imageSketchpad.enable();

    expect(imageSketchpad['options']['enabled']).toBeTruthy();

    imageSketchpad.disable();

    expect(imageSketchpad['options']['enabled']).toBeFalsy();

    imageSketchpad.enable();

    expect(imageSketchpad['options']['enabled']).toBeTruthy();
  });

  it('Should trigger canvas adjust from element on window resize', () => {
    imageSketchpad = new ImageSketchpad(image);
    window.dispatchEvent(new Event('resize'));

    expect(mockCanvasAdjustFromElement).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new Event('resize'));

    expect(mockCanvasAdjustFromElement).toHaveBeenCalledTimes(2);

    imageSketchpad.canvas.element.width = 800;
    window.dispatchEvent(new Event('resize'));

    expect(mockCanvasAdjustFromElement).toHaveBeenCalledTimes(2);
  });

  it('Should add and clear a stroke', () => {
    imageSketchpad = new ImageSketchpad(image);

    expect(imageSketchpad['strokes']).toHaveLength(0);

    imageSketchpad['strokes'].push(imageSketchpad['createStroke']([]));

    expect(imageSketchpad['strokes']).toHaveLength(1);

    imageSketchpad.clear();

    expect(imageSketchpad['strokes']).toHaveLength(0);
  });

  it('Should undo and redo an added stroke', () => {
    imageSketchpad = new ImageSketchpad(image);
    const stroke = imageSketchpad['createStroke']([]);
    imageSketchpad['strokes'].push(stroke);

    expect(imageSketchpad['strokes']).toHaveLength(1);
    expect(imageSketchpad['undoneStrokes']).toHaveLength(0);

    imageSketchpad.undo();
    imageSketchpad.undo();

    expect(imageSketchpad['strokes']).toHaveLength(0);
    expect(imageSketchpad['undoneStrokes']).toHaveLength(1);

    imageSketchpad.redo();
    imageSketchpad.redo();

    expect(imageSketchpad['strokes']).toHaveLength(1);
    expect(imageSketchpad['undoneStrokes']).toHaveLength(0);
    expect(imageSketchpad['strokes'][0]).toBe(stroke);
  });

  it('Should add a point to a stroke', () => {
    imageSketchpad = new ImageSketchpad(image);
    const stroke = imageSketchpad['createStroke']([]);
    const point = { x: 8, y: 8 };

    imageSketchpad['strokes'].push(stroke);
    imageSketchpad['pushPoint'](point, stroke);
    imageSketchpad['pushPoint'](point);

    expect((imageSketchpad['strokes'][0] as Stroke)['points']).toHaveLength(2);
  });

  it('Gets a point from event', () => {
    imageSketchpad = new ImageSketchpad(image);

    const pointerEvent = new PointerEvent('pointerdown', { clientX: 0, clientY: 0 });

    expect(imageSketchpad['getPointFromCursor'](pointerEvent)).toMatchSnapshot();
  });

  // it('Should run listeners', () => {
  //   const mouseDown = new MouseEvent('mousedown', { clientX: 0, clientY: 0 });
  //   const mouseMove = new MouseEvent('mousemove', { clientX: 0, clientY: 0 });
  //   const mouseUp = new MouseEvent('mouseup', { clientX: 0, clientY: 0 });

  //   // const touch = <Touch>{ pageX: 0, pageY: 0 };

  //   // const e = document.createEvent('TouchEvent');
  //   // e.touches = [{pageX: pageX, pageY: pageY}];

  //   // const touchList = new TouchList();
  //   // touchList[0] = touch;
  //   // touchList['length = 1;
  //   // const touchDown = new TouchEvent('touchstart', { touches: [touch] });
  //   // const touchMove = new TouchEvent('touchmove', { touches: [touch] });
  //   // const touchEnd = new TouchEvent('touchend', { touches: [touch] });

  //   // touchDown.touches = [];

  //   const touch = new Touch({
  //     identifier: 1,
  //     target: new EventTarget(),
  //     pageX: 0,
  //     pageY: 0,
  //   });

  //   // const touchDown = new TouchEvent('touchstart', {
  //   //   touches: [
  //   //     {
  //   //       identifier: 1,
  //   //       target: new EventTarget(),
  //   //       pageX: 0,
  //   //       pageY: 0,
  //   //       altitudeAngle: 0,
  //   //       azimuthAngle: 0,
  //   //       clientX: 0,
  //   //       clientY: 0,
  //   //       screenX: 0,
  //   //       screenY: 0,
  //   //       force: 0,
  //   //       radiusX: 0,
  //   //       radiusY: 0,
  //   //       rotationAngle: 0,
  //   //       touchType: 'direct',
  //   //     },
  //   //   ],
  //   //   view: window,
  //   //   cancelable: true,
  //   //   bubbles: true,
  //   // });

  //   console.log(touch);
  //   // console.log(touchDown.touches.item(0));

  //   imageSketchpad = new ImageSketchpad(image);
  //   imageSketchpad.canvas.element.dispatchEvent(mouseDown);
  //   imageSketchpad.canvas.element.dispatchEvent(mouseMove);
  //   imageSketchpad.canvas.element.dispatchEvent(mouseUp);
  //   // imageSketchpad.canvas.element.dispatchEvent(touchDown);
  //   // imageSketchpad.canvas.element.dispatchEvent(touchMove);
  //   // imageSketchpad.canvas.element.dispatchEvent(touchEnd);

  //   expect(imageSketchpad['strokes']).toHaveLength(2);

  //   imageSketchpad.disable();
  //   imageSketchpad.canvas.element.dispatchEvent(mouseDown);
  //   imageSketchpad.canvas.element.dispatchEvent(mouseMove);
  //   imageSketchpad.canvas.element.dispatchEvent(mouseUp);

  //   expect(imageSketchpad['strokes']).toHaveLength(2);
  // });

  it('Should load data sketchpad json attribute', async () => {
    defaultObj.options.lineWidth = 7;
    defaultObj.strokes = undefined;

    image.dataset['sketchpadJson'] = JSON.stringify(defaultObj);
    imageSketchpad = new ImageSketchpad(image);

    defaultObj.strokes = [];

    // eslint-disable-next-line radar/no-identical-functions
    const jsonString = await imageSketchpad.toJsonAsync();

    expect(jsonString).toMatchSnapshot();
  });

  it('Should load data sketchpad options json attribute', async () => {
    defaultObj.options.lineWidth = 7;

    image.dataset['sketchpadJson'] = JSON.stringify(defaultObj);
    imageSketchpad = new ImageSketchpad(image);

    // eslint-disable-next-line radar/no-identical-functions
    const jsonString = await imageSketchpad.toJsonAsync();

    expect(jsonString).toMatchSnapshot();
  });

  it('Should merge the sketch with the image', async () => {
    imageSketchpad = new ImageSketchpad(image);

    return imageSketchpad.mergeImageWithSketch().then((imageB64) => {
      expect(imageB64).toBe(base64String);

      return imageB64;
    });
  });

  it('Should download the sketch with the image', async () => {
    imageSketchpad = new ImageSketchpad(image);

    // eslint-disable-next-line radar/no-identical-functions
    const imageB64 = await imageSketchpad.download();

    expect(imageB64).toBe(base64String);

    return imageB64;
  });

  it('Should download the sketch with the base64 image', async () => {
    image.src = 'data:image/png;base64,' + base64String;

    imageSketchpad = new ImageSketchpad(image);

    // eslint-disable-next-line radar/no-identical-functions
    const imageB64 = await imageSketchpad.download();

    expect(imageB64).toBe(base64String);

    return imageB64;
  });

  // it('Start, draw, stop stroke by mouse event', () => {
  //   imageSketchpad = new ImageSketchpad(image);

  //   imageSketchpad['startStrokeHandler'](new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));

  //   expect(imageSketchpad['sketching']).toBeTruthy();
  //   expect(imageSketchpad['activeStroke']).toBe(imageSketchpad['strokes'][0]);
  //   expect(imageSketchpad['strokes']).toHaveLength(1);
  //   expect((imageSketchpad['strokes'][0] as Stroke)['points']).toHaveLength(1);

  //   imageSketchpad['drawStrokeHandler'](new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));

  //   expect((imageSketchpad['strokes'][0] as Stroke)['points']).toHaveLength(2);

  //   imageSketchpad['endStrokeHandler'](new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));

  //   expect((imageSketchpad['strokes'][0] as Stroke)['points']).toHaveLength(3);
  //   expect(image.dataset['sketchpadJson']).toMatchSnapshot();

  //   imageSketchpad['drawStrokeHandler'](new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
  //   imageSketchpad['endStrokeHandler'](new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));

  //   expect((imageSketchpad['strokes'][0] as Stroke)['points']).toHaveLength(3);
  // });

  // it('Start, draw, stop stroke by touch event', () => {
  //   imageSketchpad = new ImageSketchpad(image);

  //   const touch = <Touch>{ identifier: 1, target: new EventTarget(), pageX: 0, pageY: 0 };
  //   const touchDown = new TouchEvent('touchstart', { touches: [touch] });
  //   const touchMove = new TouchEvent('touchmove', { touches: [touch] });
  //   const touchEnd = new TouchEvent('touchend', { touches: [touch] });

  //   imageSketchpad['startStrokeHandler'](touchDown);
  //   imageSketchpad['drawStrokeHandler'](touchMove);
  //   imageSketchpad['endStrokeHandler'](touchEnd);

  //   expect((imageSketchpad['strokes'][0] as Stroke)['points']).toHaveLength(2);
  //   expect(image.dataset['sketchpadJson']).toMatchSnapshot();
  // });

  it('Should throw an error if we try loading a bad JSON string', async () => {
    imageSketchpad = new ImageSketchpad(image, {});

    await expect(imageSketchpad.loadJson('BAD_JSON')).rejects.toThrow(Error);
  });

  it('Should throw an error we load it on non image html elements', () => {
    expect(() => {
      imageSketchpad = new ImageSketchpad(<HTMLImageElement>document.createElement('div'));
    }).toThrow();

    expect(imageSketchpad).toBeNull();
  });

  it('Should throw an error if we try double initialization', () => {
    imageSketchpad = new ImageSketchpad(image);
    imageSketchpad = null;

    expect(() => {
      imageSketchpad = new ImageSketchpad(image);
    }).toThrow();

    expect(imageSketchpad).toBeNull();
  });
});
