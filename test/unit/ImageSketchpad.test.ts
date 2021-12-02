import { Canvas, Stroke } from '../../src/Canvas';
import { Options, DefaultOptions, ImageSketchpad } from '../../src/ImageSketchpad';

/**
 * Doing some mockup stuff
 */
const base64String = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

jest.mock('merge-images', () => jest.fn().mockImplementation(async () => base64String));

jest.mock('../../src/Canvas', () => {
  return {
    Canvas: jest.fn().mockImplementation(() => {
      const element = global.document.createElement('canvas');
      const context = element.getContext('2d');

      return {
        element,
        context,
        insert: jest.fn().mockReturnValue(Promise.resolve()),
        adjust: jest.fn(),
        adjustFromElement: jest.fn(),
        drawStroke: jest.fn().mockReturnValue(Promise.resolve()),
        clear: jest.fn().mockReturnThis(),
      };
    }),
  };
});
/*****************************************************************************/

describe('Testing ImageSketchpad Class', () => {
  global.URL.createObjectURL = jest.fn();

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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect((<jest.Mock>Canvas).mock.results[0]?.value.adjustFromElement.mock.calls).toHaveLength(1);

    window.dispatchEvent(new Event('resize'));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect((<jest.Mock>Canvas).mock.results[0]?.value.adjustFromElement.mock.calls).toHaveLength(2);

    imageSketchpad.canvas.element.width = 800;
    window.dispatchEvent(new Event('resize'));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect((<jest.Mock>Canvas).mock.results[0]?.value.adjustFromElement.mock.calls).toHaveLength(2);
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

  it('Should run listeners', async () => {
    const eventOptions = { pointerId: 1, clientX: 0, clientY: 0, pointerType: 'mouse', button: 0, buttons: 1 };
    const pointerDown = new PointerEvent('pointerdown', eventOptions);
    const pointerMove = new PointerEvent('pointermove', eventOptions);
    const pointerUp = new PointerEvent('pointerup', eventOptions);

    imageSketchpad = new ImageSketchpad(image);
    imageSketchpad.canvas.element.onpointerdown && (await imageSketchpad.canvas.element.onpointerdown(pointerDown));
    imageSketchpad.canvas.element.onpointermove && (await imageSketchpad.canvas.element.onpointermove(pointerMove));
    imageSketchpad.canvas.element.onpointerup && (await imageSketchpad.canvas.element.onpointerup(pointerUp));

    expect(imageSketchpad['strokes']).toHaveLength(1);

    let stroke = imageSketchpad['strokes'][0];

    expect(stroke && stroke['points']).toHaveLength(3);

    imageSketchpad.disable();
    imageSketchpad.canvas.element.onpointerdown && (await imageSketchpad.canvas.element.onpointerdown(pointerDown));
    imageSketchpad.canvas.element.onpointermove && (await imageSketchpad.canvas.element.onpointermove(pointerMove));
    imageSketchpad.canvas.element.onpointerup && (await imageSketchpad.canvas.element.onpointerup(pointerUp));

    expect(imageSketchpad['strokes']).toHaveLength(1);

    stroke = imageSketchpad['strokes'][0];

    expect(stroke && stroke['points']).toHaveLength(3);

    imageSketchpad.enable();

    expect(image.dataset['sketchpadJson']).toEqual(imageSketchpad.toJson());
  });

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
    // global.URL.createObjectURL = jest.fn(() => 'details');
    // window.navigator['msSaveOrOpenBlob'] = jest.fn(() => 'details');

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

  it('Start, draw, stop stroke', async () => {
    imageSketchpad = new ImageSketchpad(image);

    let pointerEvent = new PointerEvent('pointerdown', { pointerId: 1, clientX: 0, clientY: 0 });
    await imageSketchpad['startStrokeHandler'](pointerEvent);

    expect(imageSketchpad['sketching']).toBeTruthy();
    expect(imageSketchpad['activeStroke'][pointerEvent.pointerId]).toBe(imageSketchpad['strokes'][0]);
    expect(imageSketchpad['strokes']).toHaveLength(1);
    expect((imageSketchpad['strokes'][0] as Stroke)['points']).toHaveLength(1);

    pointerEvent = new PointerEvent('pointermove', { pointerId: 1, clientX: 0, clientY: 0 });
    await imageSketchpad['drawStrokeHandler'](pointerEvent);

    expect((imageSketchpad['strokes'][0] as Stroke)['points']).toHaveLength(2);

    pointerEvent = new PointerEvent('pointerup', { pointerId: 1, clientX: 0, clientY: 0 });
    await imageSketchpad['endStrokeHandler'](pointerEvent);

    expect((imageSketchpad['strokes'][0] as Stroke)['points']).toHaveLength(3);
    expect(image.dataset['sketchpadJson']).toMatchSnapshot();

    pointerEvent = new PointerEvent('pointermove', { pointerId: 1, clientX: 0, clientY: 0 });
    await imageSketchpad['drawStrokeHandler'](pointerEvent);
    pointerEvent = new PointerEvent('pointerup', { pointerId: 1, clientX: 0, clientY: 0 });
    await imageSketchpad['endStrokeHandler'](pointerEvent);

    expect((imageSketchpad['strokes'][0] as Stroke)['points']).toHaveLength(3);
  });

  it('Should not write json to html data attribute', async () => {
    image.dataset['sketchpadJson'] = '';

    const eventOptions = { pointerId: 1, clientX: 0, clientY: 0, pointerType: 'mouse', button: 0, buttons: 1 };
    const pointerDown = new PointerEvent('pointerdown', eventOptions);
    const pointerMove = new PointerEvent('pointermove', eventOptions);
    const pointerUp = new PointerEvent('pointerup', eventOptions);

    imageSketchpad = new ImageSketchpad(image, { writeJsonToHtmlAttribute: false });
    imageSketchpad.canvas.element.onpointerdown && (await imageSketchpad.canvas.element.onpointerdown(pointerDown));
    imageSketchpad.canvas.element.onpointermove && (await imageSketchpad.canvas.element.onpointermove(pointerMove));
    imageSketchpad.canvas.element.onpointerup && (await imageSketchpad.canvas.element.onpointerup(pointerUp));

    expect(image.dataset['sketchpadJson']).toBe('');
  });

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
