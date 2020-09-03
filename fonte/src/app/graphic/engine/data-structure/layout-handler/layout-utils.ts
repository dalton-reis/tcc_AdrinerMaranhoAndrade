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
export const containerBoundingBox = containerElement => adjustBoundingBox(
  containerElement.boundingBox(),
  INNER_CONTAINER_ELEMENT_PADDING * 2,
  INNER_CONTAINER_ELEMENT_PADDING * (containerElement.children().length + 1),
);
