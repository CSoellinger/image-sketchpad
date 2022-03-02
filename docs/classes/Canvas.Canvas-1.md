[image-sketchpad - v1.0.4](../index.md) / [Modules](../modules.md) / [Canvas](../modules/Canvas.md) / Canvas

# Class: Canvas

[Canvas](../modules/Canvas.md).Canvas

Canvas helper class. Inserts {@link HTMLCanvasElement|element} and handles position and size adjustments.

## Table of contents

### Constructors

- [constructor](Canvas.Canvas-1.md#constructor)

### Properties

- [element](Canvas.Canvas-1.md#element)

### Methods

- [adjust](Canvas.Canvas-1.md#adjust)
- [adjustFromElement](Canvas.Canvas-1.md#adjustfromelement)
- [clear](Canvas.Canvas-1.md#clear)
- [drawStroke](Canvas.Canvas-1.md#drawstroke)
- [insert](Canvas.Canvas-1.md#insert)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new Canvas**()

Creates an instance of the canvas helper class.

#### Defined in

[Canvas/index.ts:20](https://github.com/CSoellinger/image-sketchpad/blob/main/src/Canvas/index.ts#L20)

## Properties

### <a id="element" name="element"></a> element

• `Readonly` **element**: `HTMLCanvasElement`

Reference to the HTML canvas {@link HTMLCanvasElement|element}.

#### Defined in

[Canvas/index.ts:10](https://github.com/CSoellinger/image-sketchpad/blob/main/src/Canvas/index.ts#L10)

## Methods

### <a id="adjust" name="adjust"></a> adjust

▸ **adjust**(`width`, `height`, `top`, `left`): `void`

Adjusts canvas size and position.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | New width for canvas. |
| `height` | `number` | New height for canvas. |
| `top` | `number` | New top position for canvas. |
| `left` | `number` | New left position for canvas. |

#### Returns

`void`

#### Defined in

[Canvas/index.ts:47](https://github.com/CSoellinger/image-sketchpad/blob/main/src/Canvas/index.ts#L47)

___

### <a id="adjustfromelement" name="adjustfromelement"></a> adjustFromElement

▸ **adjustFromElement**(`element`): `void`

Adjust canvas size and position from existing element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `HTMLElement` | Existing {@link HTMLElement\|element} as reference. |

#### Returns

`void`

#### Defined in

[Canvas/index.ts:62](https://github.com/CSoellinger/image-sketchpad/blob/main/src/Canvas/index.ts#L62)

___

### <a id="clear" name="clear"></a> clear

▸ **clear**(): [`Canvas`](Canvas.Canvas-1.md)

Clear the canvas area.

#### Returns

[`Canvas`](Canvas.Canvas-1.md)

#### Defined in

[Canvas/index.ts:69](https://github.com/CSoellinger/image-sketchpad/blob/main/src/Canvas/index.ts#L69)

___

### <a id="drawstroke" name="drawstroke"></a> drawStroke

▸ **drawStroke**(`stroke`, `ratio`): `Promise`<`void`\>

Draw stroke as a path on canvas area.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stroke` | [`Stroke`](../modules/Canvas.md#stroke) | [Stroke](../modules/Canvas.md#stroke) object with meta data. |
| `ratio` | `number` | Image/canvas ratio. |

#### Returns

`Promise`<`void`\>

#### Defined in

[Canvas/index.ts:81](https://github.com/CSoellinger/image-sketchpad/blob/main/src/Canvas/index.ts#L81)

___

### <a id="insert" name="insert"></a> insert

▸ **insert**(`refElement`): `void`

Inserts canvas html element right after the reference element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `refElement` | `HTMLElement` | Reference {@link HTMLElement\|element} where we want position the canvas. |

#### Returns

`void`

#### Defined in

[Canvas/index.ts:30](https://github.com/CSoellinger/image-sketchpad/blob/main/src/Canvas/index.ts#L30)
