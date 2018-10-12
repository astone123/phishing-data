import * as React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from 'react-vis';

const sortByCountAscending = (a: ITargetCount, b: ITargetCount) =>
  a.count < b.count ? 1 : 0;

const BarChart: React.SFC<IBarChartProps> = ({ targetCounts }) => {
  const targetCountsSorted =
    targetCounts && targetCounts.sort(sortByCountAscending);
  return (
    <div>
      <h2>Phishing Sites by Target</h2>
      <XYPlot xType="ordinal" width={900} height={500}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickLabelAngle={-45} />
        <YAxis />
        <VerticalBarSeries
          data={
            targetCountsSorted &&
            targetCountsSorted
              .map((count: ITargetCount) => ({
                x: count.target,
                y: count.count
              }))
              .filter(item => item.x !== 'Other')
              .slice(0, 15)
          }
        />
      </XYPlot>
    </div>
  );
};

export default BarChart;
