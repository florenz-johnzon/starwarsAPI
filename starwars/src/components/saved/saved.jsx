import React, { useEffect, useState } from "react";
import Head from "../head/head";
import { Layout, Card, Col, Row, Button, message } from "antd";
const { Content } = Layout;

const Saved = () => {
  const [planet, setPlanet] = useState([]);
  const [starship, setStarship] = useState([]);
  const [people, setPeople] = useState([]);

  //-------------- Load Saved Planet --------------

  useEffect(() => {
    let savedPlanet = JSON.parse(localStorage.getItem("SavedPlanet"));
    if (savedPlanet?.length > 0) {
      setPlanet(savedPlanet);
    }
  }, []);

    //-------------- Load Saved Starship --------------

  useEffect(() => {
    let savedStarship = JSON.parse(localStorage.getItem("SavedStarship"));
    if (savedStarship?.length > 0) {
      setStarship(savedStarship);
    }
  }, []);

    //-------------- Load Saved People --------------

  useEffect(() => {
    let savedPeople = JSON.parse(localStorage.getItem("SavedPeople"));
    if (savedPeople?.length > 0) {
      setPeople(savedPeople);
    }
  }, []);

  //--------------- SUCCESS MESSAGE---------------

  const success = () => {
    message.success("Item removed saved successfully!");
  };

  //--------------- REMOVE FROM PLANET ---------------

  const removePlanet = (item) => {
    let savedItems = localStorage.getItem("SavedPlanet");
    let savedArray = JSON.parse(savedItems);
    var itemIndex = savedArray.findIndex((x) => x.name === item.name); //find index of current item
    savedArray.splice(itemIndex, 1);
    localStorage.setItem("SavedPlanet", JSON.stringify(savedArray)); 
    success();
  };

  //--------------- REMOVE FROM PEOPLE ---------------
  const removePeople = (item) => {
    let savedItems = localStorage.getItem("SavedPeople");
    let savedArray = JSON.parse(savedItems);
    var itemIndex = savedArray.findIndex((x) => x.name === item.name); 
    savedArray.splice(itemIndex, 1);
    localStorage.setItem("SavedPeople", JSON.stringify(savedArray)); 
    setPeople(savedArray);
    success();
  };

  //--------------- REMOVE FROM STARSHIP ---------------
  const removeStarship = (item) => {
    let savedItems = localStorage.getItem("SavedStarship");
    let savedArray = JSON.parse(savedItems);
    var itemIndex = savedArray.findIndex((x) => x.name === item.name); 
    savedArray.splice(itemIndex, 1);
    localStorage.setItem("SavedStarship", JSON.stringify(savedArray));
    setStarship(savedArray);
    success();
  };

  return (
    <div>
      <Head />
      <Layout style={{ padding: "0 24px 24px" }}>
        <h1 style={{ color: "#0b52bb", textDecoration: "underline" }}>
          PEOPLE
        </h1>
        {people?.length > 0 ? (
          <Content
            className="site-layout-background"
            style={{
              padding: 25,
              margin: 10,
              minHeight: 200,
            }}
          >
            <div className="row">
              <div style={{ background: "#ECECEC", padding: "20px" }}>
                <Row gutter={20}>
                  {people?.map((item, index) => {
                    return (
                      <div key={index}>
                        <Col span={12}>
                          <Card title={item.name} style={{ width: 220 }}>
                            <p>
                              Gender:{" "}
                              {item?.gender.charAt(0).toUpperCase() +
                                item?.gender.slice(1)}
                            </p>
                            <p>Year of Birth: {item.birthYear}</p>
                            <p>
                              Gender :{" "}
                              {item?.gender?.charAt(0).toUpperCase() +
                                item?.gender.slice(1)}
                            </p>
                            <Button type="danger" onClick={() => {
                          removePeople(item);
                        }}>
                              Remove Item{" "}
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
        ) : (
          "Your Saved People list is empty, Please save to view here!"
        )}
        <h1 style={{ color: "#0b52bb", textDecoration: "underline" }}>
          STARSHIP
        </h1>

        {starship.length > 0 ? (
          <Content
            className="site-layout-background"
            style={{
              padding: 25,
              margin: 10,
              minHeight: 220,
            }}
          >
            <div className="row">
              <div style={{ background: "#ECECEC", padding: "20px" }}>
                <Row gutter={20}>
                  {starship?.map((item, index) => {
                    return (
                      <div key={index}>
                        <Col span={12}>
                          <Card title={item.name} style={{ width: 220 }}>
                            <p>Gender: {item?.consumables}</p>
                            <p>Cargo Capacity: {item.cargoCapacity}</p>
                            <p>Atmosphering Rate: {item.atmosphericRate}</p>
                            <Button type="danger" onClick={()=>removeStarship(item)}>
                              Remove Item
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
        ) : (
          "Your Saved Starship list is empty, Please save to view here!"
        )}

        <h1 style={{ color: "#0b52bb"}}>
          PLANET
        </h1>

        {planet.length > 0 ? (
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
                  {planet?.map((item, index) => {
                    return (
                      <div key={index}>
                        <Col span={12}>
                          <Card title={item.name} style={{ width: 220 }}>
                          <p>Gravity: {item.gravity}</p>
                          <p>Population: {item.population}</p>
                            <p>Rotation Period: {item?.rotationPeriod}</p>
                            <Button type="danger" onClick={()=>removePlanet(item)}>
                              Remove Planet
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
        ) : (
          "Your Saved Planet list is empty, Please save to view here!"
        )}
      </Layout>
    </div>
  );
};

export default Saved;
