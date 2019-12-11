import '../../components/overview/cc-tile-consumption.js';
import notes from '../../.components-docs/cc-tile-consumption.md';
import { createContainer } from '../lib/dom.js';
import { enhanceStoriesNames } from '../lib/story-names.js';
import { sequence } from '../lib/sequence.js';

function createComponent (consumption) {
  const component = document.createElement('cc-tile-consumption');
  component.style.width = '275px';
  component.style.display = 'inline-grid';
  component.style.marginBottom = '1rem';
  component.style.marginRight = '1rem';
  component.consumption = consumption;
  return component;
}

export default {
  title: '2. Overview|<cc-tile-consumption>',
  parameters: { notes },
};

export const skeleton = () => {
  return createComponent();
};

export const error = () => {
  const component = createComponent();
  component.error = true;
  return component;
};

export const dataLoaded = () => {
  return createContainer([
    'Fresh new app',
    createComponent({ yesterday: 0, last30Days: 0 }),
    'nano app',
    createComponent({ yesterday: 0.3, last30Days: 6.1 }),
    'XS app',
    createComponent({ yesterday: 0.72, last30Days: 14.64 }),
  ]);
};

export const simulations = () => {
  const errorComponent = createComponent();
  const component = createComponent();

  sequence(async wait => {
    await wait(2000);
    errorComponent.error = true;
    component.consumption = { yesterday: 0.72, last30Days: 14.64 };
  });

  return createContainer([
    'Loading, then error',
    errorComponent,
    'Loading, then some data',
    component,
  ]);
};

enhanceStoriesNames({ skeleton, error, dataLoaded, simulations });
