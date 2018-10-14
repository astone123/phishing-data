import axios, { AxiosResponse } from 'axios';
import * as React from 'react';
import './App.css';

import BubbleMap from './components/BubbleMap';
import DataTable from './components/DataTable';
import Search from './components/Search';
import BarChart from './components/BarChart';
import Loading from './components/Loading';

const { REACT_APP_SERVER_URL = 'http://localhost:9000' } = process.env;

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = { query: '', data: null, countries: null, targetCounts: null };

    this.notify = this.notify.bind(this);
    this.fetchPhishData = this.fetchPhishData.bind(this);
  }

  public componentWillMount() {
    /* Get the phishing data and put it into app state for components to use. */
    this.fetchPhishData();
  }

  public fetchPhishData(query = '') {
    axios
      .get(`${REACT_APP_SERVER_URL}/phish?q=${query}`)
      .then((response: AxiosResponse) =>
        this.setState({
          data: response.data.phishData as Array<IPhish>,
          countries: response.data.countryData as Array<ICountry>,
          targetCounts: response.data.targetCounts as Array<ITargetCount>
        })
      );
  }

  public notify(stateUpdate: StateUpdate) {
    this.setState(stateUpdate as any);
  }

  public componentWillUpdate(_: {}, nextState: IAppState) {
    if (this.state.query !== nextState.query) {
      this.fetchPhishData(nextState.query || '');
    }
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Phishing Sites Currently Online</h1>
        </header>
        {/* If the endpoint returns an empty array, this means that it is still fetching
        data. Render a loading indicator. */}
        {this.state.data && this.state.data.length == 0 ? (
          <>
            <h3>Server is still fetching data. Please refresh the page...</h3>
            <Loading />
          </>
        ) : (
          <>
            <Search notify={this.notify} {...this.state} />
            <BubbleMap countries={this.state.countries} />
            <DataTable {...this.state} />
            <BarChart targetCounts={this.state.targetCounts} />
          </>
        )}
      </div>
    );
  }
}

export default App;
