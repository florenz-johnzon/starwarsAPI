import React, { useEffect, useState } from "react";
import { Layout, Card, Col, Row, Modal, Button, message } from "antd";
import Head from "../head/head";
import Footer from "../footer/footer";
import axios from "axios";
import "../../App.css";
const { Content } = Layout;

const Starships = () => {
  const [starships, setStarships] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showStarshipsData, setShowStarshipsData] = useState([]);

  useEffect(() => {
    axios.get("https://swapi.dev/api/starships/").then((response) => {
      let starshipsData = response.data.results;
      setStarships(starshipsData);
      console.log("Starship", starshipsData);
    });
  }, []);

  //--------------- STARSHIP DETAILS MODAL ---------------

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const showModal = (starship) => {
    setShowStarshipsData(starship);
    console.log(starship);
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
    message.success("Starship saved successfully!");
  };
  const error = () => {
    message.error("Starship already saved! Try saving another item!");
  };

  const _ = require("lodash");

    //--------------------- SAVE STARSHIP ------------------------

  const save = (starship) => {
    let newSavedItem = {
      name: starship.name,
      consumables: starship.consumables,
      cargoCapacity: starship.cargo_capacity,
      atmosphericRate: starship.max_atmosphering_speed,
    };

    let oldSaved = localStorage.getItem("SavedStarship");
    if (!oldSaved) {
      localStorage.setItem("SavedStarship", JSON.stringify([newSavedItem]));
    } else {
      let savedStarship = JSON.parse(oldSaved);
      let dupItem = _.find(savedStarship, function(obj) { //Check if item already saved
        if (obj.name === starship.name) {
          return true;
        }
      });
      if (!dupItem) {
        savedStarship.push(newSavedItem);
        localStorage.setItem("SavedStarship", JSON.stringify(savedStarship));
        success();
      } else {
        error();
      }
    }
  };

  return (
    <div>
      <Head />
      <Layout style={{ padding: "0 24px 24px" }}>
        <h1 style={{ color: "#0b52bb", textDecoration: "underline" }}>
          Starships
        </h1>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <div className="row">
            <div style={{ background: "#ECECEC", padding: "20px" }}>
              <Row gutter={16}>
                {starships?.map((starship, index) => {
                  return (
                    <div key={index}>
                      <Col span={12}>
                        <Card title={starship.name} style={{ width: 290 }}>
                          <p>Cost: {starship.cost_in_credits}</p>
                          <p>Consumable: {starship.consumables}</p>
                          <p>Cargo Capacity : {starship.cargo_capacity}</p>
                          <Button
                            type="primary"
                            onClick={() => showModal(starship)}
                          >
                            Know More
                          </Button>
                          <Button
                            style={{ backgroundColor: "#4CAF50" }}
                            onClick={() => save(starship)}
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
          title={showStarshipsData.name}
          visible={isModalVisible}
          onOk={handleOk}
          okText="Done"
          closable={false}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <div className="flex-container">
            <p>Manufacturer: {showStarshipsData.manufacturer}</p>
            <p>Passengers: {showStarshipsData.passengers}</p>
            <p>Hyperdrive Rating : {showStarshipsData.hyperdrive_rating}</p>

            <p>
              Created On:{" "}
              {dateTimeFormatter(showStarshipsData?.created)?.toLocaleString(
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
              {dateTimeFormatter(showStarshipsData?.edited)?.toLocaleString(
                "en-US",
                {
                  hour12: true,
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </p>
          </div>
        </Modal>
      </Layout>
      <Footer />
    </div>
  );
};

export default Starships;
