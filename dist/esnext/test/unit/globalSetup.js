export default async () => {
    if (!global.PointerEvent) {
        class PointerEvent extends MouseEvent {
            height;
            isPrimary;
            pointerId;
            pointerType;
            pressure;
            tangentialPressure;
            tiltX;
            tiltY;
            twist;
            width;
            constructor(type, params = {}) {
                super(type, params);
                this.pointerId = params.pointerId;
                this.width = params.width;
                this.height = params.height;
                this.pressure = params.pressure;
                this.tangentialPressure = params.tangentialPressure;
                this.tiltX = params.tiltX;
                this.tiltY = params.tiltY;
                this.pointerType = params.pointerType;
                this.isPrimary = params.isPrimary;
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
        global.PointerEvent = PointerEvent;
    }
    if (typeof HTMLElement.prototype.setPointerCapture !== 'function') {
        HTMLElement.prototype.setPointerCapture = function (pointerId) {
            return pointerId;
        };
    }
};
