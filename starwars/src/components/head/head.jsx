import React from 'react';
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } =Layout;

const Head = () => {
   const navigate= useNavigate();

//----------- Navigation Functions -----------

  const home = () =>{
    navigate("/home")
  }

  const people = () =>{
    navigate("/people")
  }

  const planets = () =>{
    navigate("/planets")
  }

  const starships = () =>{
    navigate("/starships")
  }

  const saved = () =>{
    navigate("/saved")
  }

  return <div>
      <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" style={{fontFamily: "cursive"}}>
        <Menu.Item key ="0" disabled>
           Hey 
          </Menu.Item>
          <Menu.Item key="1" onClick={home}>
            HOME 
          </Menu.Item>
          <Menu.Item key="2" onClick={people}>
            PEOPLE
          </Menu.Item>
          <Menu.Item key="3" onClick={planets}>
            PLANETS
          </Menu.Item>
          <Menu.Item key="4" onClick={starships}>
            STARSHIPS
          </Menu.Item>
          <Menu.Item key="5" onClick={saved}>
            SAVED 
          </Menu.Item>
        </Menu>
      </Header>
      </Layout>
  </div>
};

export default Head;
