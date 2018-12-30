import React, { Component } from "react";
import styled from "styled-components";
import Map from "./Map";
import BlogEditor from "./Editor/BlogEditor";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Sidebar = styled.div`
  width: 10%;
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

const LinkStyled = styled(Link)`
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
  position: fixed;
  margin-left: 10%;
  width: 90%;
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
      <Router>
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
              <LinkStyled to="/createPage">Editor</LinkStyled>
              <LinkStyled to="/">Map</LinkStyled>
              <LinkStyled to="">Clients</LinkStyled>
              <LinkStyled to="">Contact</LinkStyled>
            </Sidebar>

            <Container>
              <Route path="/" exact component={Map} />
              <Route path="/createPage" component={BlogEditor} />
            </Container>
          </Panel>
        </Main>
      </Router>
    );
  }
}

export default App;
