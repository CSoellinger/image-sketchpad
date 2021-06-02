// import jQuery from 'jquery';

import { ImageSketchpad, UserOptions } from './ImageSketchpad';

/**
 * Type definition for instances object
 */
type Instances = Record<string, ImageSketchpad>;

/**
 * Save sketchpad instances to this object
 */
const instances: Instances = {};

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

// Maybe for future
//
// if (typeof jQuery !== 'undefined') {
//   (function ($: JQueryStatic) {
//     /**
//      * If global variable "jQuery" is defined we will add a new function
//      * called "$().imageSketchpad"
//      *
//      * @param options - Image sketchpad user options
//      */
//     $.fn.imageSketchpad = function (
//       options?: UserOptions
//     ): JQuery {
//       this.each((_index, element: HTMLElement) => {
//         ImageSketchpad(element as HTMLImageElement, options);
//       });

//       return this;
//     };
//   })(jQuery);
// }

export default init;
