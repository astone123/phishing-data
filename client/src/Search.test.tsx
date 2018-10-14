import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Search from './components/Search';

test('Test Bar Chart Component', () => {
  const tree = renderer.create(<Search query="" />).toJSON();
  expect(tree).toMatchSnapshot();
});
