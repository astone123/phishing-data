import * as React from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';

const wrapperStyles = {
  width: '100%',
  maxWidth: 980,
  margin: '0 auto'
};

const getTooltipText = (country: ICountry) => {
  return `${country.name}: ${country.count} ${
    country.count > 1 ? 'sites' : 'site'
  } online`;
};

const DEFAULT_CENTER = [0, 20];
const ZOOM_LEVEL = 3;
const SCALE_MAXIMUM = 170;
const SCALE_MINIMUM = 8;
const SCALE_MULTIPLIER = 0.35;

class BubbleMap extends React.Component<
  IBubbleMapProps,
  { center: Array<number>; zoom: number }
> {
  constructor(props: IBubbleMapProps) {
    super(props);
    this.state = {
      center: DEFAULT_CENTER,
      zoom: 1
    };
    this.handleZoom = this.handleZoom.bind(this);
    this.resetZoom = this.resetZoom.bind(this);
  }

  scale(count: number) {
    if (count < SCALE_MINIMUM) {
      return SCALE_MINIMUM;
    }

    if (count > SCALE_MAXIMUM) {
      return SCALE_MAXIMUM;
    }

    return count * SCALE_MULTIPLIER;
  }

  componentDidMount() {
    setTimeout(() => ReactTooltip.rebuild(), 2000);
  }

  componentWillReceiveProps() {
    ReactTooltip.rebuild();
  }

  handleZoom(event: React.MouseEvent<SVGCircleElement>) {
    const target = event.target as SVGCircleElement;
    const { countries } = this.props;
    const country =
      countries && countries[target.getAttribute('data-country-index') || 0];
    this.setState({ center: country.coordinates, zoom: ZOOM_LEVEL });
  }

  resetZoom() {
    this.setState({ center: DEFAULT_CENTER, zoom: 1 });
  }

  render() {
    return (
      <div className="map-container" style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{ scale: 205 }}
          width={980}
          height={551}
          style={{
            width: '100%',
            height: 'auto'
          }}
        >
          <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
            <Geographies geography="/world-50m.json">
              {(geographies: any, projection: any) =>
                geographies.map(
                  (geography: any, i: any) =>
                    geography.id !== 'ATA' && (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        style={{
                          default: {
                            fill: '#ECEFF1',
                            stroke: '#607D8B',
                            strokeWidth: 0.75,
                            outline: 'none'
                          },
                          hover: {
                            fill: '#ECEFF1',
                            stroke: '#607D8B',
                            strokeWidth: 0.75,
                            outline: 'none'
                          },
                          pressed: {
                            fill: '#ECEFF1',
                            stroke: '#607D8B',
                            strokeWidth: 0.75,
                            outline: 'none'
                          }
                        }}
                      />
                    )
                )
              }
            </Geographies>
            <Markers>
              {this.props.countries &&
                this.props.countries.map((country, i) => (
                  <Marker key={i} marker={country}>
                    <circle
                      cx={0}
                      cy={0}
                      r={this.scale(country.count)}
                      data-tip={getTooltipText(country)}
                      data-country-index={i}
                      onClick={this.handleZoom}
                    />
                  </Marker>
                ))}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
        <ReactTooltip />
        <button className="button-reset" onClick={this.resetZoom}>
          Reset Map
        </button>
      </div>
    );
  }
}

export default BubbleMap;
