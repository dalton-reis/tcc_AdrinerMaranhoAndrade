import { SmalgObject } from '../../../script-engine/engine/smalg-javascript/types/smalg-object';
import { SmalgPrimitive } from '../../../script-engine/engine/smalg-javascript/types/smalg-primitive';
import { SmalgContainer } from '../../../script-engine/engine/smalg-javascript/types/smalg-container';

const stylesheet = [
  {
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
    selector: 'node[nodeWidth]',
    style: {
      'width': 'data(nodeWidth)',
    },
  }, {
    selector: `node[type = "${SmalgObject.TYPE_DESCRIPTOR}"]`,
    style: {
      'shape': 'round-rectangle',
      'border-width': '0px',
      'background-color': '#b0b0b0',
    },
  }, {
    selector: `node[type = "${SmalgObject.TYPE_DESCRIPTOR}"] .entry`,
    style: {
      'background-color': '#b0b0b0',
      'border-width': '0px',
    },
  }, {
    selector: `node[type = "${SmalgObject.TYPE_DESCRIPTOR}"] .entry-key`,
    style: {
      'shape': 'round-rectangle',
      'background-color': '#949494',
    },
  }, {
    selector: `node .slot`,
    style: {
      'shape': 'rectangle',
      'background-color': '#c2c2c2',
      'border-width': '0px',
    },
  }, {
    selector: `node[type = "${SmalgContainer.TYPE_DESCRIPTOR}"]`,
    style: {
      'shape': 'rectangle',
      'background-color': '#999999',
      'border-width': '0px',
    },
  }, {
    selector: `node[type = "${SmalgPrimitive.TYPE_DESCRIPTOR}"]`,
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
