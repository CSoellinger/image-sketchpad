# Image Sketchpad (responsive)

![preview](./media/preview.gif)

Draw on any image inside your desktop or mobile browser.

- Get image with drawing as base64 string or download it directly (original or browser sized)
- Get sketches as JSON data
  - Load the sketches by the JSON
  - Load by method or `data-sketchpad-json` attribute
- Set [options](https://github.com/CSoellinger/image-sketchpad/blob/main/docs/modules/ImageSketchpad.md#Options) like line width or color
- Responsive: draw on the image and resize the browser. If the image resizes your sketch will do too. Also JSON data considered the image ratio so you can draw on a tiny image version (css resized!) and load the JSON data on a bigger version of the image.

---

1. [Demo](#demo)
2. [Install](#install)
3. [Usage](#usage)
   1. [Browser: VanillaJS](#browser-vanillajs)
4. [Documentation](#documentation)
   1. [Sketchpad Options](#sketchpad-options)
   2. [Sketchpad Methods after init](#sketchpad-methods-after-init)
5. [ToDo](#todo)

---

## Demo

You can try a working example online: [DEMO](https://csoellinger.github.io/image-sketchpad/demo.html)

## Install

```bash
npm install image-sketchpad --save

# yarn add image-sketchpad
```

## Usage

I have included different files for different usages

### Browser: VanillaJS

First include the JS file at the bottom of your html page

```html
    <script src="image-sketchpad.min.js"></script>
  </body>
</html>
```

Second initialize the sketchpad and bind it to an image

```html
    <img src="..." id="Image" />

    <script src="image-sketchpad.min.js"></script>
    <script>
        var img = document.getElementById('Image');
        var sketchpadOptions = {};
        var sketchPad = ImageSketchpad(img, sketchpadOptions);
    </script>
  </body>
</html>
```

That's it!

## Documentation

- [HTML Version](https://csoellinger.github.io/image-sketchpad/)
- [Markdown Version](https://github.com/CSoellinger/image-sketchpad/blob/main/docs/modules.md)

### Sketchpad Options

[Available Options](https://github.com/CSoellinger/image-sketchpad/modules/ImageSketchpad#Options)

### Sketchpad Methods after init

[Methods](./docs/classes/ImageSketchpad.ImageSketchpad-1.md#Methods)

## ToDo

- Test with some kind like electron
- Write e2e tests
- Do not force PNG as image output format
