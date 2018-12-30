import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import styled from "styled-components";

const MapStyle = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const MarkerStyled = styled(Marker)`
  background: #000000;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const Coord = styled.div`
  position: absolute;
  z-index: 10;
  display: inline-block;
  background: #ffffff;
  margin: 8px;
  padding: 8px;
  border-radius: 16px;
  color: #000;
  top: 0;
  left: 0;
`;

const Main = styled.div``;

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibGVvbmVyYXRoIiwiYSI6ImNqcTd5M3FwajBsbTI0OHQ1ZWt3cTluMzEifQ.qpktZHW1Y1UrbSKAlfP2Jw"
});

const LIGHT = "mapbox://styles/mapbox/light-v9";
const DARK = "mapbox://styles/mapbox/dark-v9";

class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lng: -65.017,
      lat: -16.457,
      zoom: 1.5,
      size: 24,
      editable: false,
      style: LIGHT,
      currentRoute: 0,
      selectedOption: "1",
      routes: []
    };
    this.addMarker = this.addMarker.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this._onClickMap = this._onClickMap.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this.getRoute = this.getRoute.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.addRoute = this.addRoute.bind(this);
    this.editMap = this.editMap.bind(this);
    this.deleteRoute = this.deleteRoute.bind(this);
    this.sliderChange = this.sliderChange.bind(this);
    this.editRoute = this.editRoute.bind(this);
  }

  sliderChange(e) {
    this.setState({ size: e.target.value });
  }

  _onMouseMove(map, e) {
    this.setState({
      lng: Math.round(e.lngLat.lng * 100) / 100,
      lat: Math.round(e.lngLat.lat * 100) / 100
    });
  }

  _onClickMap(map, e) {
    if (this.state.editable) {
      this.addMarker(e);
    }
  }

  deleteAll(index) {
    this.setState({ routes: [], currentRoute: 0, editable: false });
  }

  editRoute(index) {
    let currentRoute = index;
    console.log(index, this.state.routes);

    this.setState({
      editable: true,
      currentRoute: currentRoute
    });
  }

  deleteRoute(route) {
    let routes = this.state.routes;
    routes = routes.filter(item => item !== route);
    let currentRoute = this.state.currentRoute - 1;
    this.setState({ routes: routes, currentRoute: currentRoute });
  }

  addMarker(e) {
    let genre;
    // eslint-disable-next-line default-case
    switch (this.state.selectedOption) {
      case "1":
        genre = "#00ADB5";
        break;
      case "2":
        genre = "#F8B500";
        break;
      case "3":
        genre = "#FFF4E0";
        break;
    }

    let routes = this.state.routes;
    let route = routes[this.state.currentRoute];
    let marker = e.lngLat;
    route.markers.push(marker);
    route.genre = genre;
    routes[this.state.currentRoute] = route;
    this.setState({ routes: routes });
  }

  addRoute() {
    let newRoute = { markers: [], genre: "" };
    let routes = this.state.routes;
    routes.push(newRoute);
    this.setState({ routes, routes });
  }

  getRoute(route) {
    if (route.markers.length > 1) {
      let mappedRoute = route.markers.map(point => [point.lng, point.lat]);

      return (
        <Layer
          type="line"
          layout={{
            "line-cap": "round",
            "line-join": "round"
          }}
          paint={{ "line-color": "#4790E5", "line-width": 4 }}
        >
          <Feature coordinates={mappedRoute} />
        </Layer>
      );
    }
  }

  editMap() {
    if (!this.state.editable) {
      this.addRoute();
      this.setState({ editable: !this.state.editable });
    } else {
      let currentRoute = this.state.routes.length;
      this.setState({
        currentRoute: currentRoute,
        editable: !this.state.editable
      });
    }
  }

  handleOptionChange(e) {
    let genre;
    // eslint-disable-next-line default-case
    switch (e.target.value) {
      case "1":
        genre = "#00ADB5";
        break;
      case "2":
        genre = "#F8B500";
        break;
      case "3":
        genre = "#FFF4E0";
        break;
    }

    let routes = this.state.routes;
    let route = routes[this.state.currentRoute];
    route.genre = genre;
    routes[this.state.currentRoute] = route;

    this.setState({ routes: routes, selectedOption: e.target.value });

    console.log(this.state);
  }

  render() {
    const { lng, lat, size } = this.state;

    return (
      <Main>
        <Coord>
          <div>
            {`Lng: ${lng} `}
            {`Lat: ${lat}`}
            <hr />
            {this.state.routes.length > 0 &&
              this.state.routes.map((route, index) => {
                return (
                  <div>
                    {`Route : ${index}`}
                    <br />
                    {`Anzahl an Markern : ${route.markers.length}`}
                    <br />
                    {`Genre: ${route.genre}`}
                    <br />
                    {!this.state.editable && (
                      <button onClick={() => this.editRoute(index)}>
                        Edit
                      </button>
                    )}
                    {!this.state.editable && (
                      <button onClick={() => this.deleteRoute(route)}>
                        Delete
                      </button>
                    )}

                    <hr />
                  </div>
                );
              })}
            <br />
            {this.state.editable && (
              <form>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="1"
                      checked={this.state.selectedOption === "1"}
                      onChange={e => this.handleOptionChange(e)}
                    />
                    Politics
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="2"
                      checked={this.state.selectedOption === "2"}
                      onChange={e => this.handleOptionChange(e)}
                    />
                    Entertainment
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="3"
                      checked={this.state.selectedOption === "3"}
                      onChange={e => this.handleOptionChange(e)}
                    />
                    Sport
                  </label>
                </div>
              </form>
            )}
            <button onClick={() => this.editMap()}>
              {this.state.editable ? "Finnish" : "Add Route"}
            </button>
            <button
              onClick={() => {
                this.state.style === LIGHT
                  ? this.setState({ style: DARK })
                  : this.setState({ style: LIGHT });
              }}
            >
              {this.state.style ? "Dark Mode" : "Light Mode"}
            </button>{" "}
            <button onClick={() => this.deleteAll()}>Delete All</button>
            <br />
            Size:
            <br />
            <input
              type="range"
              min="1"
              max="100"
              value={this.state.size}
              onChange={e => this.sliderChange(e)}
            />
            {` ${size} `}
          </div>
        </Coord>
        <MapStyle>
          <Map
            style={this.state.style}
            onMouseMove={this._onMouseMove}
            onClick={this._onClickMap}
            containerStyle={{
              height: "100%",
              width: "100%"
            }}
          >
            {this.state.routes.map(route => this.getRoute(route))}
            {this.state.routes.map(route =>
              route.markers.map(marker => (
                <MarkerStyled
                  style={{
                    background: route.genre,
                    width: `${this.state.size}px`,
                    height: `${this.state.size}px`
                  }}
                  coordinates={[marker.lng, marker.lat]}
                  anchor="bottom"
                />
              ))
            )}
          </Map>
        </MapStyle>
      </Main>
    );
  }
}

export default MapView;
