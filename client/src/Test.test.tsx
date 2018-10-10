import * as React from 'react';
import * as renderer from 'react-test-renderer';

const TestComponent: React.SFC<{}> = () => {
  return <div>This is a test component</div>;
};

test('Test component test', () => {
  const tree = renderer.create(<TestComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
