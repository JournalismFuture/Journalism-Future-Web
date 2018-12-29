import React, { Component } from "react";
import styled from "styled-components";
import Map from "./Map";

const Sidebar = styled.div`
  width: 160px;
  height: 100%;
  position: fixed;
  z-index: 1;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 20px;
`;

const Panel = styled.div``;

const Navbar = styled.div`
  width: 100%;
  background-color: #111;
  color: #ffffff;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const Link = styled.a`
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  :hover {
    color: #f1f1f1;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  margin-left: 160px;

  position: relative;
  width: 100%;
  height: 100vh;
`;

const LI = styled.div`
  float: left;
`;

const Link2 = styled.a`
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  font-size: 25px;
  color: #818181;
  text-decoration: none;
  :hover {
    color: #f1f1f1;
  }
`;

class App extends Component {
  render() {
    return (
      <Main>
        <Navbar>
          <LI>
            <Link2 href="#">Linkbout</Link2>
          </LI>
          <LI>
            <Link2 href="#">Linkbout</Link2>
          </LI>
        </Navbar>

        <Panel>
          <Sidebar>
            <Link href="#">Linkbout</Link>
            <Link href="#">Services</Link>
            <Link href="#">Clients</Link>
            <Link href="#">Contact</Link>
          </Sidebar>

          <Container>
            <Map />
          </Container>
        </Panel>
      </Main>
    );
  }
}

export default App;
