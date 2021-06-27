import { Canvas, Point, Stroke } from '../src/Canvas';

describe('Testing Canvas Class', () => {
  let canvasClass: Canvas;
  let stroke: Stroke;

  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <img id="Image" src="../media/fish.png" id="Image">
        <div></div>
      </div>`.trim();

    canvasClass = new Canvas();
    stroke = { points: [], cap: 'round', join: 'round', color: '#000', maxWidth: 10, width: 5, miterLimit: 1 };
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should initialize without problems', () => {
    expect.assertions(2);

    expect(canvasClass).toBeInstanceOf(Canvas);
    expect(canvasClass.element).toBeInstanceOf(HTMLCanvasElement);
  });

  it('Should create a canvas element next to the the given reference element', async () => {
    const refElement = document.getElementById('Image');

    canvasClass.insert(<HTMLElement>refElement);

    expect.assertions(1);

    expect(document.querySelector('#Image + canvas')).toBeInstanceOf(HTMLCanvasElement);
  });

  it('Should draw a stroke from point to point', async () => {
    stroke.points.push(<Point>{ x: 10, y: 10 }, <Point>{ x: 20, y: 20 });

    const refElement = document.getElementById('Image');

    canvasClass.insert(<HTMLElement>refElement);
    await expect(canvasClass.drawStroke(stroke, 1)).resolves.toBeUndefined();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx = <any>canvasClass.element.getContext('2d');
    const path = ctx.__getPath();

    expect(path).toMatchSnapshot();
  });

  it("Should set line width to maxWidth if it's bigger", async () => {
    stroke = Object.assign(stroke, { width: 15 });
    stroke.points.push(<Point>{ x: 10, y: 10 }, <Point>{ x: 20, y: 20 });

    const refElement = document.getElementById('Image');

    canvasClass.insert(<HTMLElement>refElement);
    await expect(canvasClass.drawStroke(stroke, 1)).resolves.toBeUndefined();
  });

  it('Should clear the canvas', () => {
    expect.assertions(1);
    expect(canvasClass.clear()).toBeInstanceOf(Canvas);
  });

  it('Should do nothing if we try drawing a stroke with only one point', async () => {
    stroke.points.push(<Point>{ x: 10, y: 10 });

    expect.assertions(1);

    await expect(canvasClass.drawStroke(stroke, 1)).resolves.toBeUndefined();
  });
});
