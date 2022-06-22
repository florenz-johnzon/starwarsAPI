import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "../head/head";
import Footer from "../footer/footer";
import { Layout, Card, Col, Row, Modal, Button, message } from "antd";
const { Content } = Layout;

const People = () => {
  const [people, setPeople] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); //Modal
  const [showPeopleData, setShowPeopleData] = useState([]);

  useEffect(() => {
    axios.get("https://swapi.dev/api/people/").then((response) => {
      let peopleData = response.data.results;
      setPeople(peopleData);
      console.log("People", peopleData);
    });
  }, []);

  //--------------- PEOPLE DETAILS MODAL ---------------

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const showModal = (people) => {
    setShowPeopleData(people);
    console.log(people);
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
    message.success("People saved successfully!");
  };
  const error = () => {
    message.error("People already saved! Try saving another item!");
  };

  const _ = require("lodash");

  //--------------------- SAVE PEOPLE ------------------------

  const save = (people) => {
    let newSavedItem = {
      name: people.name,
      birthYear: people.birth_year,
      gender: people.gender,
    };

    let oldSaved = localStorage.getItem("SavedPeople");
    if (!oldSaved) {
      localStorage.setItem("SavedPeople", JSON.stringify([newSavedItem]));
    } else {
      let savedPeople = JSON.parse(oldSaved);
      let dupItem = _.find(savedPeople, function(obj) {
        //Check if item already taken
        if (obj.name === people.name) {
          return true;
        }
      });
      if (!dupItem) {
        savedPeople.push(newSavedItem);
        localStorage.setItem("SavedPeople", JSON.stringify(savedPeople));
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
          People
        </h1>
        <Content
          className="site-layout-background"
          style={{
            padding: 25,
            margin: 10,
            minHeight: 280,
          }}
        >
          <div className="row">
            <div style={{ background: "#ECECEC", padding: "20px" }}>
              <Row gutter={20}>
                {people?.map((people, index) => {
                  return (
                    <div key={index}>
                      <Col span={12}>
                        <Card title={people.name} style={{ width: 280 }}>
                          <p>
                            Gender:{" "}
                            {people?.gender.charAt(0).toUpperCase() +
                              people?.gender.slice(1)}
                          </p>
                          <p>Mass: {people.mass}</p>
                          <p>Height : {people.height}</p>
                          <Button
                            type="primary"
                            onClick={() => showModal(people)}
                          >
                            Know More
                          </Button>
                          <Button
                            style={{ backgroundColor: "#4CAF50" }}
                            onClick={() => save(people)}
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
          title={showPeopleData.name}
          visible={isModalVisible}
          onOk={handleOk}
          okText="Done"
          closable={false}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          {showPeopleData ? (
            <>
              <p>Year of Birth: {showPeopleData.birth_year}</p>
              <p>
                Skin Color:{" "}
                {showPeopleData?.skin_color?.charAt(0).toUpperCase() +
                  showPeopleData?.skin_color?.slice(1)}
              </p>
              <p>
                Eye Color:{" "}
                {showPeopleData?.eye_color?.charAt(0).toUpperCase() +
                  showPeopleData?.eye_color?.slice(1)}
              </p>
              <p>
                Created On:{" "}
                {dateTimeFormatter(showPeopleData?.created)?.toLocaleString(
                  "en-US",
                  {
                    hour12: true,
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </p>
            </>
          ) : (
            ""
          )}

          <p>
            Edited On:{" "}
            {dateTimeFormatter(showPeopleData?.edited)?.toLocaleString(
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

export default People;
