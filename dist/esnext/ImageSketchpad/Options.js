/**
 * Image sketchpad (default) options
 */
export class Options {
    constructor() {
        /**
         * Line width
         */
        this.lineWidth = 5;
        /**
         * Line max width
         */
        this.lineMaxWidth = -1;
        /**
         * Line color
         */
        this.lineColor = '#000';
        /**
         * Line cap
         */
        this.lineCap = 'round';
        /**
         * Line join
         */
        this.lineJoin = 'round';
        /**
         * Line miter limit
         */
        this.lineMiterLimit = 10;
    }
}
