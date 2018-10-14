interface IPhish {
  url: string;
  phishDetailUrl: string;
  submissionTime: Date;
  verified: boolean;
  verificationTime: Date;
  online: boolean;
  ip: string;
  country: string;
  target: string;
}

interface ICountry {
  name: string;
  coordinates: Array<number>;
  count: number;
}

interface ITargetCount {
  target: string;
  count: number;
}

interface IAppState {
  data: Array<IPhish> | null;
  countries: Array<ICountry> | null;
  targetCounts: Array<ITargetCount> | null;
  query: string | null;
}

interface IWithData {
  data: Array<IPhish> | null;
}

interface IBubbleMapProps {
  countries: Array<ICountry> | null;
}

interface IBarChartProps {
  targetCounts: Array<ITargetCount> | null;
}

interface ISearchProps {
  query: string | null;
  notify?: notify;
}

interface IWithQuery {
  query: string;
}

type PartialAppState = keyof IAppState;

type StateUpdate = { [key in PartialAppState]?: any };

type notify = (action: StateUpdate) => void;

interface Notify {
  notify: notify;
}

/* Bubble Map types */
declare module 'react-simple-maps';
declare module 'd3-scale';
declare module 'react-tooltip';
declare module 'react-vis';
