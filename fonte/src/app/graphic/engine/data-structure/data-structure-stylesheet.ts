import { ElementTypes } from './data-structure-types';
import { PrimitivesContainer } from './global/primitives-container';

const stylesheet = [
  {
    selector: `#${PrimitivesContainer.id}`,
    style: {
      'shape': 'round-rectangle',
      'width': '80',
      'height': '100',
      'min-height': '100',
      'min-width': '50',
      'content': 'data(label)',
      'text-wrap': 'wrap',
      'text-valign': 'top',
      'text-halign': 'center',
      'events': 'no',
      'background-color': '#c2c2c2',
      'border-width': '3px',
      'border-color': '#b0b0b0',
    },
  }, {
    selector: 'node[labelValue]',
    style: {
      'content': 'data(labelValue)',
      'text-wrap': 'wrap',
      'text-valign': 'center',
      'text-halign': 'center',
    },
  }, {
    selector: 'node[parent]',
    style: {
      'events': 'no',
    },
  }, {
    selector: '.blocked',
    style: {
      'events': 'no',
    },
  }, {
    selector: 'node[nodeWidth]',
    style: {
      'width': 'data(nodeWidth)',
    },
  }, {
    selector: `node[type = "${ElementTypes.OBJECT}"]`,
    style: {
      'shape': 'round-rectangle',
      'border-width': '0px',
      'background-color': '#b0b0b0',
    },
  }, {
    selector: `node.entry`,
    style: {
      'background-color': '#b0b0b0',
      'border-width': '0px',
    },
  }, {
    selector: `node.entry-key`,
    style: {
      'shape': 'round-rectangle',
      'background-color': '#949494',
    },
  }, {
    selector: `node.slot`,
    style: {
      'shape': 'rectangle',
      'background-color': '#c2c2c2',
      'border-width': '0px',
    },
  }, {
    selector: `node[type = "${ElementTypes.CONTAINER}"]`,
    style: {
      'shape': 'rectangle',
      'background-color': '#999999',
      'border-width': '0px',
    },
  }, {
    selector: `node[type = "${ElementTypes.PRIMITIVE}"]`,
    style: {
      'shape': 'round-rectangle',
    },
  }, {
    selector: 'node.number',
    style: {
      'background-color': '#35db61',
    },
  }, {
    selector: 'node.boolean',
    style: {
      'background-color': '#8046c2',
    },
  }, {
    selector: 'node.string',
    style: {
      'background-color': '#eb9b1a',
    },
  },
];

export { stylesheet };
