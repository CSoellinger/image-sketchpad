[image-sketchpad - v1.0.4](../index.md) / [Modules](../modules.md) / ImageSketchpad

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

### <a id="options" name="options"></a> Options

Ƭ **Options**: `Object`

Image sketchpad options.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | Enable or disable sketchpad on init.  **`defaultvalue`** `true` |
| `lineCap` | `CanvasLineCap` | Line cap.  **`defaultvalue`** `round` |
| `lineColor` | `string` | Line color.  **`defaultvalue`** `#000` |
| `lineJoin` | `CanvasLineJoin` | Line join.  **`defaultvalue`** `round` |
| `lineMaxWidth` | `number` | Line max width.  **`defaultvalue`** `-1` |
| `lineMiterLimit` | `number` | Line miter limit.  **`defaultvalue`** `10` |
| `lineWidth` | `number` | Line width.  **`defaultvalue`** `5` |
| `writeJsonToHtmlAttribute` | `boolean` | Setting this to true(default) will add a data attribute with the sketchpad json data. This is the same string like you would get with [ImageSketchpad.toJson()](../classes/ImageSketchpad.ImageSketchpad-1.md#tojson).  **`defaultvalue`** `true` |

#### Defined in

[ImageSketchpad/Options.ts:4](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/Options.ts#L4)

___

### <a id="useroptions" name="useroptions"></a> UserOptions

Ƭ **UserOptions**: `Partial`<[`Options`](ImageSketchpad.md#options)\>

Image sketchpad user options setting all properties as not required (Partial).

#### Defined in

[ImageSketchpad/Options.ts:66](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/Options.ts#L66)

## Variables

### <a id="defaultoptions" name="defaultoptions"></a> DefaultOptions

• `Const` **DefaultOptions**: `Readonly`<[`Options`](ImageSketchpad.md#options)\>

Image sketchpad default options.

#### Defined in

[ImageSketchpad/Options.ts:71](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/Options.ts#L71)
