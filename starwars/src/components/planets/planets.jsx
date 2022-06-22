import React, { useEffect, useState } from "react";
import Footer from "../footer/footer";
import Head from "../head/head";
import axios from "axios";
import {
  Layout,
  Card,
  Col,
  Row,
  Modal,
  Button,
  message,
} from "antd";
const { Content } = Layout;

const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); //Modal
  const [showPlanetsData, setShowPlanetsData] = useState([]);

  useEffect(() => {
    axios.get("https://swapi.dev/api/planets/").then((response) => {
      let planetsData = response.data.results;
      setPlanets(planetsData);
      console.log("Planets", planetsData);
    });
  }, []);

//--------------- PLANET DETAILS MODAL ---------------

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const showModal = (planet) => {
    setShowPlanetsData(planet);
    console.log(planet);
    setIsModalVisible(true);
  };

  //date formatter for local time
  const dateTimeFormatter = (data) => {
    if (data) {
      return new Date(
        new Date(data).getTime() -
          new Date(data).getTimezoneOffset() * 60 * 1000
      );
    }
  };

//--------------- SUCCESS / ERROR MESSAGE ---------------
  
  const success = () => {
    message.success(
      "Planet saved successfully!"
    );
  };
  const error = () => {
    message.error("Planet already saved! Try saving another item!");
  };

  const _ = require("lodash");

//--------------------- SAVE PLANET ------------------------

  const save = (planet) => {
    let newSavedItem = {
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      gravity: planet.gravity
    };

    let oldSaved = localStorage.getItem("SavedPlanet");
    if (!oldSaved) {
      localStorage.setItem("SavedPlanet", JSON.stringify([newSavedItem]));
    } else {
      let savedPlanet = JSON.parse(oldSaved);
      let dupItem = _.find(savedPlanet, function(obj) {   //Check if item already taken
        if (obj.name === planet.name) {
          return true;
        }
      });
      if (!dupItem) {
      savedPlanet.push(newSavedItem);
      localStorage.setItem("SavedPlanet", JSON.stringify(savedPlanet));
      success()} else{
        error();
      }
  }
}

  return (
    <div>
      <Head />
      <Layout style={{ padding: "0 24px 24px" }}>
        <h1 style={{ color: "#0b52bb", textDecoration: "underline" }}>
          Planets
        </h1>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 250,
          }}
        >
          <div className="row">
            <div style={{ background: "#ECECEC", padding: "20px" }}>
              <Row gutter={16}>
                {planets?.map((planet, index) => {
                  return (
                    <div key={index}>
                      <Col span={12}>
                        <Card title={planet.name} style={{ width: 290 }}>
                          <p>Population: {planet.population}</p>
                          <p>
                            Terrain:{" "}
                            {planet?.terrain?.charAt(0).toUpperCase() +
                              planet?.terrain?.slice(1)}
                          </p>
                          <p>Rotation Period : {planet.rotation_period}</p>
                          <Button
                            type="primary"
                            onClick={() => showModal(planet)}
                          >
                            Know More
                          </Button>
                          <Button
                            style={{ backgroundColor: "#4CAF50" }}
                            onClick={() => save(planet)}
                          >
                            Save Item
                          </Button>
                        </Card>
                      </Col>
                    </div>
                  );
                })}
              </Row>
            </div>
          </div>
        </Content>
        <Modal
          title={showPlanetsData.name}
          visible={isModalVisible}
          onOk={handleOk}
          okText="Done"
          closable={false}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <p>
            Climate:{" "}
            {showPlanetsData?.climate?.charAt(0).toUpperCase() +
              showPlanetsData?.climate?.slice(1)}
          </p>

          <p>Gravity: {showPlanetsData.gravity}</p>
          <p>
            Orbital Period: {showPlanetsData.orbital_period}
            {showPlanetsData.currencySymbol}
          </p>
          <p>
            Created On:{" "}
            {dateTimeFormatter(showPlanetsData?.created)?.toLocaleString(
              "en-US",
              {
                hour12: true,
                month: "long", 
                day: "numeric", 
                year: "numeric", 
              }
            )}
          </p>

          <p>
            Edited On:{" "}
            {dateTimeFormatter(showPlanetsData?.edited)?.toLocaleString(
              "en-US",
              {
                hour12: true,
                month: "long", 
                day: "numeric", 
                year: "numeric", 
              }
            )}
          </p>
        </Modal>
      </Layout>

      <Footer />
    </div>
  );
};

export default Planets;
