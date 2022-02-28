[image-sketchpad - v1.0.4](../index.md) / [Modules](../modules.md) / Canvas

# Module: Canvas

## Table of contents

### Classes

- [Canvas](../classes/Canvas.Canvas-1.md)

### Type aliases

- [Point](Canvas.md#point)
- [Stroke](Canvas.md#stroke)

## Type aliases

### Point

Ƭ **Point**: `Object`

Point - A point on the canvas set by coordinates.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | X coordinate of point. |
| `y` | `number` | Y coordinate of point. |

#### Defined in

[Canvas/Draw.ts:4](https://github.com/CSoellinger/image-sketchpad/blob/main/src/Canvas/Draw.ts#L4)

___

### Stroke

Ƭ **Stroke**: `Object`

Stroke - A line between two or more [Points](Canvas.md#point).

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cap` | `CanvasLineCap` | {@link CanvasLineCap|Canvas line cap} of the stroke: "butt" | "round" | "square". |
| `color` | `string` | Color of the stroke. |
| `join` | `CanvasLineJoin` | {@link CanvasLineJoin|Canvas line join} of the stroke: "bevel" | "miter" | "round". |
| `maxWidth` | `number` | Max width of the stroke. |
| `miterLimit` | `number` | Miter limit of the stroke. |
| `points` | [`Point`](Canvas.md#point)[] | [Points](Canvas.md#point) of stroke. |
| `width` | `number` | Width of the stroke. |

#### Defined in

[Canvas/Draw.ts:19](https://github.com/CSoellinger/image-sketchpad/blob/main/src/Canvas/Draw.ts#L19)
