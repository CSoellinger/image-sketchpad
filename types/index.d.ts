import { ImageSketchpad as ImageSketchpadClass, UserOptions } from './ImageSketchpad';
/**
 * Initialize new sketchpad or return an already initialized.
 *
 * @param element - HTML image element
 * @param options - Image sketchpad options
 */
declare const ImageSketchpad: (element: HTMLImageElement, options?: UserOptions | undefined) => ImageSketchpadClass;
export default ImageSketchpad;
