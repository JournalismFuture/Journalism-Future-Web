import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import styled from "styled-components";

const MapStyle = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
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

mapboxgl.accessToken =
  "pk.eyJ1IjoibGVvbmVyYXRoIiwiYSI6ImNqcTd5M3FwajBsbTI0OHQ1ZWt3cTluMzEifQ.qpktZHW1Y1UrbSKAlfP2Jw";

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lng: -65.017,
      lat: -16.457,
      zoom: 1.5,
      editable: true
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom
    });

    map.on("mousemove", e => {
      this.setState({
        lng: e.lngLat.lng,
        lat: e.lngLat.lat
      });
    });

    map.on("click", e => {
      if (this.state.editable) {
        console.log("Trigger");
        var popup = new mapboxgl.Popup({
          offset: 25,
          closeOnClick: false
        }).setHTML(
          'Test test <button onClick={console.log("test")}>T </button>'
        );

        // create DOM element for the marker
        var el = document.createElement("div");
        el.id = "marker";
        el.className = "marker";

        // create the marker
        new mapboxgl.Marker(el)
          .setLngLat(e.lngLat)
          .setPopup(popup) // sets a popup on this marker
          .addTo(map);
      }
    });
  }

  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <Main>
        <Coord>
          <div>
            <p>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</p>
            <button
              onClick={() => this.setState({ editable: !this.state.editable })}
            >
              Toogle{" "}
            </button>{" "}
            {`:${this.state.editable}`}
          </div>
        </Coord>
        <MapStyle ref={el => (this.mapContainer = el)} />
      </Main>
    );
  }
}

export default Map;
