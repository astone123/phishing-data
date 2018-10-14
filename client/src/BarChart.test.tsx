import * as React from 'react';
import * as renderer from 'react-test-renderer';
import BarChart from './components/BarChart';

const TEST_DATA: Array<ITargetCount> = [
  { target: 'Test Company', count: 20 },
  { target: 'Test Company 2', count: 5 },
  { target: 'Test Company 3', count: 30 },
  { target: 'Test Company 4', count: 3 }
];

test('Test Bar Chart Component', () => {
  const tree = renderer.create(<BarChart targetCounts={TEST_DATA} />).toJSON();
  expect(tree).toMatchSnapshot();
});
