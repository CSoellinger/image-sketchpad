declare module 'draw-to-canvas' {
  function drawToCanvas(canvasOne: HTMLCanvasElement, canvasTwo: HTMLCanvasElement, pos?: number[]): void;
  export = drawToCanvas;
};

declare module 'file-save-browser' {
  function FileDownload(base64: string, type: string, name: string): Promise<void>;
  export = FileDownload;
}
