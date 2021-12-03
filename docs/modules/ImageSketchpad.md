[image-sketchpad - v1.0.3](../index.md) / [Modules](../modules.md) / ImageSketchpad

# Module: ImageSketchpad

## Table of contents

### Classes

- [ImageSketchpad](../classes/ImageSketchpad.ImageSketchpad-1.md)

### Type aliases

- [Options](ImageSketchpad.md#options)
- [UserOptions](ImageSketchpad.md#useroptions)

### Variables

- [DefaultOptions](ImageSketchpad.md#defaultoptions)

## Type aliases

### Options

Ƭ **Options**: `Object`

Image sketchpad options

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | Enable or disable sketchpad on init |
| `lineCap` | `CanvasLineCap` | Line cap |
| `lineColor` | `string` | Line color |
| `lineJoin` | `CanvasLineJoin` | Line join |
| `lineMaxWidth` | `number` | Line max width |
| `lineMiterLimit` | `number` | Line miter limit |
| `lineWidth` | `number` | Line width |
| `writeJsonToHtmlAttribute` | `boolean` | Setting this to true(default) will set a json string to the canvas html attribute. You get the same string by calling [ImageSketchpad.toJson()](../classes/ImageSketchpad.ImageSketchpad-1.md#tojson) |

#### Defined in

[ImageSketchpad/Options.ts:4](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/Options.ts#L4)

___

### UserOptions

Ƭ **UserOptions**: `Partial`<[`Options`](ImageSketchpad.md#options)\>

Image sketchpad user options with all properties as not required

#### Defined in

[ImageSketchpad/Options.ts:65](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/Options.ts#L65)

## Variables

### DefaultOptions

• **DefaultOptions**: `Readonly`<[`Options`](ImageSketchpad.md#options)\>

Image sketchpad default options

#### Defined in

[ImageSketchpad/Options.ts:51](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/Options.ts#L51)
