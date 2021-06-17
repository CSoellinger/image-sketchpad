import { ImageSketchpad, UserOptions } from './ImageSketchpad';

/**
 * Save sketchpad instances to this object
 */
const instances: Record<string, ImageSketchpad> = {};

/**
 * Initialize new sketchpad or return an already initialized.
 *
 * @param element - HTML image element
 * @param options - Image sketchpad options
 */
const init = (element: HTMLImageElement, options?: UserOptions): ImageSketchpad => {
  if (element?.dataset?.sketchpad && instances[element.dataset.sketchpad]) {
    return instances[element.dataset.sketchpad];
  }

  const newInstance = new ImageSketchpad(element, options);

  if (element?.dataset?.sketchpad) {
    instances[element.dataset.sketchpad] = newInstance;
  }

  return newInstance;
};

export default init;
