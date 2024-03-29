import { ImageSketchpad } from './ImageSketchpad';
/**
 * Save sketchpad instances to this object
 *
 * @internal
 */
const instances = {};
/**
 * Initialize new sketchpad or return an already initialized.
 *
 * @param element  - HTML image element.
 * @param options  - Image sketchpad options. {@link ImageSketchpad.DefaultOptions | Default Options}
 */
const init = (element, options) => {
    if (element?.dataset['sketchpad'] && instances[element?.dataset['sketchpad']]) {
        return instances[element?.dataset['sketchpad']];
    }
    const newInstance = new ImageSketchpad(element, options);
    if (element?.dataset['sketchpad']) {
        instances[element.dataset['sketchpad']] = newInstance;
    }
    return newInstance;
};
export default init;
