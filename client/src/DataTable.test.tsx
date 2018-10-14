import * as React from 'react';
import * as renderer from 'react-test-renderer';
import DataTable from './components/DataTable';

const TEST_DATA: Array<IPhish> = [
  {
    url: 'string',
    phishDetailUrl: 'string',
    submissionTime: new Date('2018-10-11T21:15:01.000Z'),
    verified: true,
    verificationTime: new Date('2018-10-11T21:15:01.000Z'),
    online: true,
    ip: 'string',
    country: 'string',
    target: 'string'
  },
  {
    url: 'string2',
    phishDetailUrl: 'string2',
    submissionTime: new Date('2018-10-11T21:15:01.000Z'),
    verified: true,
    verificationTime: new Date('2018-10-11T21:15:01.000Z'),
    online: true,
    ip: 'string2',
    country: 'string2',
    target: 'string2'
  }
];

test('Test DataTable Component', () => {
  const tree = renderer.create(<DataTable data={TEST_DATA} />).toJSON();
  expect(tree).toMatchSnapshot();
});
