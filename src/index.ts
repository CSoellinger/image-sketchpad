import { ImageSketchpad } from './ImageSketchpad';
import type { UserOptions } from './ImageSketchpad';

/**
 * Save sketchpad instances to this object
 *
 * @internal
 */
const instances: Record<string, ImageSketchpad> = {};

/**
 * Initialize new sketchpad or return an already initialized.
 *
 * @param element  - HTML image element.
 * @param options  - Image sketchpad options. {@link ImageSketchpad.DefaultOptions | Default Options}
 */
const init = (element: HTMLImageElement, options?: UserOptions): ImageSketchpad => {
  if (element?.dataset['sketchpad'] && instances[element?.dataset['sketchpad']]) {
    return <ImageSketchpad>instances[element?.dataset['sketchpad']];
  }

  const newInstance = new ImageSketchpad(element, options);

  if (element?.dataset['sketchpad']) {
    instances[element.dataset['sketchpad']] = newInstance;
  }

  return newInstance;
};

export default init;
