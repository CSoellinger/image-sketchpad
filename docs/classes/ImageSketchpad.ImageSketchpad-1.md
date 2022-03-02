[image-sketchpad - v1.0.4](../index.md) / [Modules](../modules.md) / [ImageSketchpad](../modules/ImageSketchpad.md) / ImageSketchpad

# Class: ImageSketchpad

[ImageSketchpad](../modules/ImageSketchpad.md).ImageSketchpad

Image sketchpad main class. It handles creation of canvas element, drawing on
it, and merge it with the image and handle the data as json out- or input.

## Table of contents

### Constructors

- [constructor](ImageSketchpad.ImageSketchpad-1.md#constructor)

### Properties

- [canvas](ImageSketchpad.ImageSketchpad-1.md#canvas)

### Methods

- [clear](ImageSketchpad.ImageSketchpad-1.md#clear)
- [destroy](ImageSketchpad.ImageSketchpad-1.md#destroy)
- [disable](ImageSketchpad.ImageSketchpad-1.md#disable)
- [download](ImageSketchpad.ImageSketchpad-1.md#download)
- [enable](ImageSketchpad.ImageSketchpad-1.md#enable)
- [loadJson](ImageSketchpad.ImageSketchpad-1.md#loadjson)
- [mergeImageWithSketch](ImageSketchpad.ImageSketchpad-1.md#mergeimagewithsketch)
- [redo](ImageSketchpad.ImageSketchpad-1.md#redo)
- [setOptions](ImageSketchpad.ImageSketchpad-1.md#setoptions)
- [toJson](ImageSketchpad.ImageSketchpad-1.md#tojson)
- [toJsonAsync](ImageSketchpad.ImageSketchpad-1.md#tojsonasync)
- [undo](ImageSketchpad.ImageSketchpad-1.md#undo)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new ImageSketchpad**(`image`, `options?`)

Creates an instance of image sketchpad.

**`example`**

Run image sketchpad

# VanillaJS

```
const imageEl = document.getElementById('Image');
const sketchPad = ImageSketchpad(imageEl, { lineWidth: 5, lineMaxWidth: 10, lineColor: '#ff0000' });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | `HTMLImageElement` | Image html element. |
| `options?` | `Partial`<[`Options`](../modules/ImageSketchpad.md#options)\> | Sketchpad options as javascript object. |

#### Defined in

[ImageSketchpad/index.ts:78](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L78)

## Properties

### <a id="canvas" name="canvas"></a> canvas

• `Readonly` **canvas**: [`Canvas`](Canvas.Canvas-1.md)

Canvas helper class.

#### Defined in

[ImageSketchpad/index.ts:18](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L18)

## Methods

### <a id="clear" name="clear"></a> clear

▸ **clear**(): [`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

Clears the image sketchpad.

#### Returns

[`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

#### Defined in

[ImageSketchpad/index.ts:200](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L200)

___

### <a id="destroy" name="destroy"></a> destroy

▸ **destroy**(): `void`

Destroy the instance and remove the canvas.

#### Returns

`void`

#### Defined in

[ImageSketchpad/index.ts:311](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L311)

___

### <a id="disable" name="disable"></a> disable

▸ **disable**(): [`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

Disables image sketchpad.

#### Returns

[`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

#### Defined in

[ImageSketchpad/index.ts:144](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L144)

___

### <a id="download" name="download"></a> download

▸ **download**(`originalSize?`): `Promise`<`string`\>

Download merged image with sketch as png file.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `originalSize` | `boolean` | `true` | Download image with original size. |

#### Returns

`Promise`<`string`\>

#### Defined in

[ImageSketchpad/index.ts:289](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L289)

___

### <a id="enable" name="enable"></a> enable

▸ **enable**(): [`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

Enables image sketchpad.

#### Returns

[`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

#### Defined in

[ImageSketchpad/index.ts:135](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L135)

___

### <a id="loadjson" name="loadjson"></a> loadJson

▸ **loadJson**(`json`): `Promise`<[`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)\>

Load a sketch from a json string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `string` | JSON string to parse. |

#### Returns

`Promise`<[`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)\>

#### Defined in

[ImageSketchpad/index.ts:174](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L174)

___

### <a id="mergeimagewithsketch" name="mergeimagewithsketch"></a> mergeImageWithSketch

▸ **mergeImageWithSketch**(`originalSize?`): `Promise`<`string`\>

Merges image with sketch and returns a base64 string as promise.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `originalSize` | `boolean` | `true` | Download image with original size. |

#### Returns

`Promise`<`string`\>

#### Defined in

[ImageSketchpad/index.ts:244](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L244)

___

### <a id="redo" name="redo"></a> redo

▸ **redo**(): [`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

ReDo the last UnDone drawing on your sketch.

#### Returns

[`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

#### Defined in

[ImageSketchpad/index.ts:226](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L226)

___

### <a id="setoptions" name="setoptions"></a> setOptions

▸ **setOptions**(`options`): [`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

Set sketchpad options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Partial`<[`Options`](../modules/ImageSketchpad.md#options)\> | Sketchpad options. |

#### Returns

[`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

#### Defined in

[ImageSketchpad/index.ts:126](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L126)

___

### <a id="tojson" name="tojson"></a> toJson

▸ **toJson**(): `string`

Get a json string which can be used to load a sketch again.

#### Returns

`string`

#### Defined in

[ImageSketchpad/index.ts:153](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L153)

___

### <a id="tojsonasync" name="tojsonasync"></a> toJsonAsync

▸ **toJsonAsync**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[ImageSketchpad/index.ts:165](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L165)

___

### <a id="undo" name="undo"></a> undo

▸ **undo**(): [`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

UnDo the last drawing on your sketch.

#### Returns

[`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

#### Defined in

[ImageSketchpad/index.ts:210](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L210)
