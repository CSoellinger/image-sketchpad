export const mockCanvasAdjustFromElement = jest.fn();
const mock = jest.fn().mockImplementation(() => {
    return {
        Canvas: jest.fn().mockImplementation(() => {
            const element = global.document.createElement('canvas');
            const context = element.getContext('2d');
            return {
                element,
                context,
                insert: jest.fn().mockReturnValue(Promise.resolve()),
                adjustFromElement: mockCanvasAdjustFromElement,
                drawStroke: jest.fn().mockReturnValue(Promise.resolve()),
                clear: jest.fn().mockReturnThis(),
            };
        }),
    };
});
export default mock;
// jest.mock('../../../src/Canvas', () => {
//   return {
//     Canvas: jest.fn().mockImplementation(() => {
//       const element = global.document.createElement('canvas');
//       const context = element.getContext('2d');
//       return {
//         element,
//         context,
//         insert: jest.fn().mockReturnValue(Promise.resolve()),
//         adjustFromElement: mockCanvasAdjustFromElement,
//         drawStroke: jest.fn().mockReturnValue(Promise.resolve()),
//         clear: jest.fn().mockReturnThis(),
//       };
//     }),
//   };
// });
