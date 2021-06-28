import mergeImages from 'merge-images';

import { Canvas } from '../src/Canvas';
import { DefaultOptions, ImageSketchpad } from '../src/ImageSketchpad';

const mockCanvasAdjustFromElement = jest.fn();

jest.mock('merge-images');

jest.mock('../src/Canvas', () => {
  return {
    Canvas: jest.fn().mockImplementation(() => {
      const element = <HTMLCanvasElement>global.document.createElement('canvas');
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

describe('Testing ImageSketchpad Class', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let defaultObj: any;
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

  it('Should return sketchpad default data as json', () => {
    imageSketchpad = new ImageSketchpad(image);

    return imageSketchpad.toJsonAsync().then((jsonString) => {
      expect(jsonString).toMatchSnapshot();
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
    imageSketchpad = new ImageSketchpad(image);

    expect(imageSketchpad['enabled']).toBeTruthy();

    imageSketchpad.disable();

    expect(imageSketchpad['enabled']).toBeFalsy();

    imageSketchpad.enable();

    expect(imageSketchpad['enabled']).toBeTruthy();
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

    expect(imageSketchpad['strokes'][0]['points']).toHaveLength(2);
  });

  it('Gets a point from event', () => {
    imageSketchpad = new ImageSketchpad(image);
    const mouseDown = new MouseEvent('mousedown', { clientX: 0, clientY: 0 });
    const touchDown = new TouchEvent('touchstart', {
      touches: [<Touch>{ identifier: 1, target: new EventTarget(), pageX: 0, pageY: 0 }],
    });

    expect(imageSketchpad['getPointFromCursor'](mouseDown)).toMatchSnapshot();
    expect(imageSketchpad['getPointFromCursor'](touchDown)).toMatchSnapshot();
  });

  it('Should run listeners', () => {
    const mouseDown = new MouseEvent('mousedown', { clientX: 0, clientY: 0 });
    const mouseMove = new MouseEvent('mousemove', { clientX: 0, clientY: 0 });
    const mouseUp = new MouseEvent('mouseup', { clientX: 0, clientY: 0 });

    const touch = <Touch>{ identifier: 1, target: new EventTarget(), pageX: 0, pageY: 0 };
    const touchDown = new TouchEvent('touchstart', { touches: [touch] });
    const touchMove = new TouchEvent('touchmove', { touches: [touch] });
    const touchEnd = new TouchEvent('touchend', { touches: [touch] });

    imageSketchpad = new ImageSketchpad(image);
    imageSketchpad.canvas.element.dispatchEvent(mouseDown);
    imageSketchpad.canvas.element.dispatchEvent(mouseMove);
    imageSketchpad.canvas.element.dispatchEvent(mouseUp);
    imageSketchpad.canvas.element.dispatchEvent(touchDown);
    imageSketchpad.canvas.element.dispatchEvent(touchMove);
    imageSketchpad.canvas.element.dispatchEvent(touchEnd);

    expect(imageSketchpad['strokes']).toHaveLength(2);

    imageSketchpad.disable();
    imageSketchpad.canvas.element.dispatchEvent(mouseDown);
    imageSketchpad.canvas.element.dispatchEvent(mouseMove);
    imageSketchpad.canvas.element.dispatchEvent(mouseUp);

    expect(imageSketchpad['strokes']).toHaveLength(2);
  });

  it('Should load data sketchpad json attribute', () => {
    defaultObj.options.lineWidth = 7;
    defaultObj.strokes = undefined;

    image.dataset['sketchpadJson'] = JSON.stringify(defaultObj);
    imageSketchpad = new ImageSketchpad(image);

    defaultObj.strokes = [];

    return imageSketchpad.toJsonAsync().then((jsonString) => {
      expect(jsonString).toMatchSnapshot();
    });
  });

  it('Should load data sketchpad options json attribute', () => {
    defaultObj.options.lineWidth = 7;

    image.dataset['sketchpadJson'] = JSON.stringify(defaultObj);
    imageSketchpad = new ImageSketchpad(image);

    return imageSketchpad.toJsonAsync().then((jsonString) => {
      expect(jsonString).toMatchSnapshot();
    });
  });

  it('Should merge the sketch with the image', async () => {
    const base64String =
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    (<jest.Mock>mergeImages).mockResolvedValue(base64String);

    imageSketchpad = new ImageSketchpad(image);

    return imageSketchpad.mergeImageWithSketch().then((imageB64) => {
      expect(imageB64).toBe(base64String);
    });
  });

  it('Should download the sketch with the image', () => {
    const base64String =
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    (<jest.Mock>mergeImages).mockResolvedValue(base64String);

    imageSketchpad = new ImageSketchpad(image);

    return imageSketchpad.download().then((imageB64) => {
      expect(imageB64).toBe(base64String);
    });
  });

  it('Should download the sketch with the base64 image', () => {
    const base64String =
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    (<jest.Mock>mergeImages).mockResolvedValue(base64String);
    image.src = 'data:image/png;base64,' + base64String;

    imageSketchpad = new ImageSketchpad(image);

    return imageSketchpad.download().then((imageB64) => {
      expect(imageB64).toBe(base64String);
    });
  });

  it('Start, draw, stop stroke by mouse event', () => {
    imageSketchpad = new ImageSketchpad(image);

    imageSketchpad['startStrokeHandler'](new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));

    expect(imageSketchpad['sketching']).toBeTruthy();
    expect(imageSketchpad['activeStroke']).toBe(imageSketchpad['strokes'][0]);
    expect(imageSketchpad['strokes']).toHaveLength(1);
    expect(imageSketchpad['strokes'][0]['points']).toHaveLength(1);

    imageSketchpad['drawStrokeHandler'](new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));

    expect(imageSketchpad['strokes'][0]['points']).toHaveLength(2);

    imageSketchpad['endStrokeHandler'](new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));

    expect(imageSketchpad['strokes'][0]['points']).toHaveLength(3);
    expect(image.dataset['sketchpadJson']).toMatchSnapshot();

    imageSketchpad['drawStrokeHandler'](new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    imageSketchpad['endStrokeHandler'](new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));

    expect(imageSketchpad['strokes'][0]['points']).toHaveLength(3);
  });

  it('Start, draw, stop stroke by touch event', () => {
    imageSketchpad = new ImageSketchpad(image);

    const touch = <Touch>{ identifier: 1, target: new EventTarget(), pageX: 0, pageY: 0 };
    const touchDown = new TouchEvent('touchstart', { touches: [touch] });
    const touchMove = new TouchEvent('touchmove', { touches: [touch] });
    const touchEnd = new TouchEvent('touchend', { touches: [touch] });

    imageSketchpad['startStrokeHandler'](touchDown);
    imageSketchpad['drawStrokeHandler'](touchMove);
    imageSketchpad['endStrokeHandler'](touchEnd);

    expect(imageSketchpad['strokes'][0]['points']).toHaveLength(2);
    expect(image.dataset['sketchpadJson']).toMatchSnapshot();
  });

  it('Should throw an error if we try loading a bad JSON string', () => {
    imageSketchpad = new ImageSketchpad(image, {});

    return imageSketchpad.loadJson('BAD_JSON').catch((err) => {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(err).toBeInstanceOf(Error);
    });
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
