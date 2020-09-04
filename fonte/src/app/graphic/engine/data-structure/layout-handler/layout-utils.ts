import { BoundingBox } from '../../core/cytoscape/types';

export const adjustBoundingBox =
  (boundingBox: BoundingBox, adjustXFactor: number, adjustYFactor: number): BoundingBox => {
    return {
      x1: boundingBox.x1 + adjustXFactor,
      y1: boundingBox.y1 + adjustYFactor,
      x2: boundingBox.x2 + adjustXFactor,
      y2: boundingBox.y2 + adjustYFactor,
      w: boundingBox.w,
      h: boundingBox.h,
    };
};

const INNER_CONTAINER_ELEMENT_PADDING = 10;
export const containerBoundingBox = (containerElement: any) => adjustBoundingBox(
  containerElement.boundingBox(),
  INNER_CONTAINER_ELEMENT_PADDING * 2,
  INNER_CONTAINER_ELEMENT_PADDING * (containerElement.children().length + 1),
);

const INNER_OBJECT_ELEMENT_PADDING = 10;
export const objectBoundingBox = (objectElement: any) => adjustBoundingBox(
  objectElement.boundingBox(),
  INNER_OBJECT_ELEMENT_PADDING * 2,
  INNER_OBJECT_ELEMENT_PADDING * (objectElement.children().length + 1),
);

const INNER_PRIMITIVES_CONTAINER_ELEMENT_PADDING = 10;
export const primitivesContainerBoundingBox = (primitivesContainerElement: any) => adjustBoundingBox(
  primitivesContainerElement.boundingBox(),
  INNER_PRIMITIVES_CONTAINER_ELEMENT_PADDING * 2,
  INNER_PRIMITIVES_CONTAINER_ELEMENT_PADDING * 2,
);
