import { Canvas } from '../src/Canvas';
import { DefaultOptions, ImageSketchpad } from '../src/ImageSketchpad';

const mockCanvasInsert = jest.fn().mockReturnValue(Promise.resolve());
const mockCanvasAdjustFromElement = jest.fn();
const mockCanvasClear = jest.fn().mockReturnThis();

jest.mock('../src/Canvas', () => {
  return {
    Canvas: jest.fn().mockImplementation(() => {
      const element = <HTMLCanvasElement>global.document.createElement('canvas');
      const context = element.getContext('2d');

      return {
        element,
        context,
        insert: mockCanvasInsert,
        adjustFromElement: mockCanvasAdjustFromElement,
        clear: mockCanvasClear,
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
        <img id="Image" src="../media/fish.png" id="Image" width="1024" height="680">
        <div></div>
      </div>`.trim();

    defaultObj = { strokes: [], options: DefaultOptions };
    image = <HTMLImageElement>document.getElementById('Image');
    imageSketchpad = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<any>Canvas).mockClear();
    mockCanvasInsert.mockClear();
    mockCanvasAdjustFromElement.mockClear();
    mockCanvasClear.mockClear();
  });

  afterEach(() => {
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

    expect(imageSketchpad.toJson()).toBe(JSON.stringify(defaultObj));
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
  });

  it('Should load data sketchpad json attribute', () => {
    defaultObj.options.lineWidth = 7;
    defaultObj.strokes = undefined;

    image.dataset['sketchpadJson'] = JSON.stringify(defaultObj);
    imageSketchpad = new ImageSketchpad(image);

    defaultObj.strokes = [];
    expect(imageSketchpad.toJson()).toBe(JSON.stringify(defaultObj));
  });

  it('Should load data sketchpad options json attribute', () => {
    defaultObj.options.lineWidth = 7;

    image.dataset['sketchpadJson'] = JSON.stringify(defaultObj);
    imageSketchpad = new ImageSketchpad(image);

    expect(imageSketchpad.toJson()).toBe(JSON.stringify(defaultObj));
  });

  it('Should throw an error if we try loading a bad JSON string', () => {
    imageSketchpad = new ImageSketchpad(image, {});
    let jsonError = null;

    try {
      imageSketchpad.loadJson('BAD_JSON');
    } catch (error) {
      jsonError = error;
    }

    expect(jsonError).toBeInstanceOf(Error);
  });

  it('Should throw an error we load it on non image html elements', () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      imageSketchpad = new ImageSketchpad(<any>document.createElement('div'));
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    expect(imageSketchpad).toBeNull();
  });

  it('Should throw an error if we try double initialization', () => {
    imageSketchpad = new ImageSketchpad(image);
    imageSketchpad = null;

    try {
      imageSketchpad = new ImageSketchpad(image);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    expect(imageSketchpad).toBeNull();
  });
});
