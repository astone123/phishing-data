import * as React from 'react';
import ReactTable, { RowInfo } from 'react-table';
import * as moment from 'moment';
import 'react-table/react-table.css';

const formatTimestamp = (timestamp: Date) => moment(timestamp).format('LLLL');

const DataTable: React.SFC<IWithData> = ({ data }) =>
  data ? (
    <div>
      <ReactTable
        getTdProps={(_: any, rowInfo: RowInfo) => {
          return {
            onClick: () => {
              const rowData = rowInfo.original as IPhish;
              window.open(rowData.phishDetailUrl, '_blank');
            }
          };
        }}
        data={data}
        columns={[
          {
            Header: 'IP',
            accessor: 'ip'
          },
          {
            Header: 'Target',
            accessor: 'target'
          },
          {
            Header: 'Verified',
            id: 'verified',
            accessor: (phish: IPhish) => (phish.verified ? 'True' : 'False')
          },
          {
            Header: 'Country',
            accessor: 'country'
          },
          {
            Header: 'Submission Time',
            id: 'submissionTime',
            accessor: (phish: IPhish) => formatTimestamp(phish.submissionTime)
          }
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
      <br />
    </div>
  ) : null;

export default DataTable;
