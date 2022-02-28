import { ImageSketchpad } from './ImageSketchpad';
/**
 * Initialize new sketchpad or return an already initialized.
 *
 * @param element  - HTML image element.
 * @param options  - Image sketchpad options. {@link ImageSketchpad.DefaultOptions | Default Options}
 */
declare const init: (element: HTMLImageElement, options?: Partial<import("./ImageSketchpad").Options> | undefined) => ImageSketchpad;
export default init;
