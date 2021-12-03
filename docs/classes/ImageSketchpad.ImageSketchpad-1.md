[image-sketchpad - v1.0.3](../index.md) / [Modules](../modules.md) / [ImageSketchpad](../modules/ImageSketchpad.md) / ImageSketchpad

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

### constructor

• **new ImageSketchpad**(`image`, `options?`)

Creates an instance of image sketchpad.

**`example`**

Run image sketchpad

# VanillaJS

```
const imageEl = document.getElementById('Image');
const sketchPad = new ImageSketchpad(imageEl, { lineWidth: 5, lineMaxWidth: 10, lineColor: '#ff0000' });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | `HTMLImageElement` | Image html element. |
| `options?` | `Partial`<[`Options`](../modules/ImageSketchpad.md#options)\> | Sketchpad options as javascript object. |

#### Defined in

[ImageSketchpad/index.ts:77](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L77)

## Properties

### canvas

• `Readonly` **canvas**: [`Canvas`](Canvas.Canvas-1.md)

Canvas helper class

#### Defined in

[ImageSketchpad/index.ts:18](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L18)

## Methods

### clear

▸ **clear**(): [`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

Clears the image sketchpad

#### Returns

[`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

#### Defined in

[ImageSketchpad/index.ts:199](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L199)

___

### destroy

▸ **destroy**(): `void`

Destroy the instance and remove the canvas.

#### Returns

`void`

#### Defined in

[ImageSketchpad/index.ts:309](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L309)

___

### disable

▸ **disable**(): [`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

Disables image sketchpad

#### Returns

[`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

#### Defined in

[ImageSketchpad/index.ts:143](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L143)

___

### download

▸ **download**(`originalSize?`): `Promise`<`string`\>

Download merged image with sketch as png file

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `originalSize` | `boolean` | `true` | Download image with original size |

#### Returns

`Promise`<`string`\>

#### Defined in

[ImageSketchpad/index.ts:290](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L290)

___

### enable

▸ **enable**(): [`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

Enables image sketchpad

#### Returns

[`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

#### Defined in

[ImageSketchpad/index.ts:134](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L134)

___

### loadJson

▸ **loadJson**(`json`): `Promise`<[`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)\>

Load a sketch from a json string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `string` | JSON string to parse. |

#### Returns

`Promise`<[`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)\>

#### Defined in

[ImageSketchpad/index.ts:173](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L173)

___

### mergeImageWithSketch

▸ **mergeImageWithSketch**(`originalSize?`): `Promise`<`string`\>

Merges image with sketch and returns a base64 string as promise.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `originalSize` | `boolean` | `true` | Download image with original size. |

#### Returns

`Promise`<`string`\>

#### Defined in

[ImageSketchpad/index.ts:245](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L245)

___

### redo

▸ **redo**(): [`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

ReDo the last UnDone drawing on your sketch

#### Returns

[`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

#### Defined in

[ImageSketchpad/index.ts:225](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L225)

___

### setOptions

▸ **setOptions**(`options`): [`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

Set sketchpad options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Partial`<[`Options`](../modules/ImageSketchpad.md#options)\> | Sketchpad options. |

#### Returns

[`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

#### Defined in

[ImageSketchpad/index.ts:125](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L125)

___

### toJson

▸ **toJson**(): `string`

Get a json string which can be used to load a sketch again

#### Returns

`string`

#### Defined in

[ImageSketchpad/index.ts:152](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L152)

___

### toJsonAsync

▸ **toJsonAsync**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[ImageSketchpad/index.ts:164](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L164)

___

### undo

▸ **undo**(): [`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

UnDo the last drawing on your sketch

#### Returns

[`ImageSketchpad`](ImageSketchpad.ImageSketchpad-1.md)

#### Defined in

[ImageSketchpad/index.ts:209](https://github.com/CSoellinger/image-sketchpad/blob/main/src/ImageSketchpad/index.ts#L209)
