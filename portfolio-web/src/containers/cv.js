import React from "react";
import CardColumns from "react-bootstrap/CardColumns";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { cvTexts, apiInfo } from "../content";

export default class CV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.schoolRef = React.createRef();
    this.workRef = React.createRef();
    this.skillRef = React.createRef();
    this.leadRef = React.createRef();
  }

  componentDidMount() {
    fetch(apiInfo.domain + "/contents/schools", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          schools: response.schools,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(apiInfo.domain + "/contents/works", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          works: response.works,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(apiInfo.domain + "/contents/leaderships", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          leaderships: response.leaderships,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(apiInfo.domain + "/contents/skills", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        let skill_arr = [];
        for (var s in response.skills) {
          skill_arr.push({ name: s, value: response.skills[s] });
        }
        this.setState({
          skills: skill_arr,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const scrollToSchool = () =>
      window.scrollTo(0, this.schoolRef.current.offsetTop);
    const scrollToWork = () =>
      window.scrollTo(0, this.workRef.current.offsetTop);
    const scrollToSkill = () =>
      window.scrollTo(0, this.skillRef.current.offsetTop);
    const scrollToLead = () =>
      window.scrollTo(0, this.leadRef.current.offsetTop);

    return (
      <>
        <Container fluid className="container">
          <Row className="justify-content-center">
            <p>{cvTexts.note}</p>
          </Row>
          <Row className="justify-content-center">
            <Button
              onClick={scrollToSchool}
              variant="light"
              className="scroll-button"
            >
              Education
            </Button>
            <Button
              onClick={scrollToWork}
              variant="light"
              className="scroll-button"
            >
              Experiences
            </Button>
            {/* <Button
              onClick={scrollToLead}
              variant="light"
              className="scroll-button"
            >
              Activities and Leaderships
            </Button> */}
            <Button
              onClick={scrollToSkill}
              variant="light"
              className="scroll-button"
            >
              Skills
            </Button>
          </Row>
          <Row ref={this.schoolRef}>
            <h2>Education</h2>
          </Row>
          <Row>
            <CardColumns className="card-columns">
              {this.state.schools &&
                this.state.schools.map((school) => {
                  return (
                    <Card key={school.id}>
                      <Card.Body>
                        <Card.Title>{school.name}</Card.Title>
                        <Card.Subtitle className="text-muted">
                          <p>
                            {school.start_date
                              .substring(0, 7)
                              .replace("-", ".") +
                              "~" +
                              school.end_date.substring(0, 7).replace("-", ".")}
                          </p>
                        </Card.Subtitle>
                        <Card.Text>
                          <i>
                            {school.program_one}
                            <br />
                            {school.program_two}
                          </i>
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer
                        style={{ fontSize: "small", textAlign: "right" }}
                      >
                        {school.location.city}, {school.location.country}
                      </Card.Footer>
                    </Card>
                  );
                })}
            </CardColumns>
          </Row>
          <Row ref={this.workRef}>
            <h2>Experiences</h2>
          </Row>
          {this.state.works &&
            this.state.works.map((work) => {
              let stacks = work.stack.map((s) => {
                return <li key={s.id}>{s.name}</li>;
              });
              let description = work.role_description
                .split("\n")
                .map((d, index) => {
                  return <li key={index}>{d}</li>;
                });
              return (
                <Row key={work.id}>
                  <Card style={{ width: "100%" }}>
                    <Card.Body style={{ padding: "20px" }}>
                      <Card.Title>
                        {work.role}, {work.name}
                      </Card.Title>
                      <Card.Subtitle className="text-muted">
                        <p>
                          {work.start_date.substring(0, 7).replace("-", ".") +
                            "~" +
                            work.end_date.substring(0, 7).replace("-", ".")}
                        </p>
                      </Card.Subtitle>
                      <p>{description}</p>
                      <ul className="stacks">{stacks}</ul>
                    </Card.Body>
                    <Card.Footer
                      style={{ fontSize: "small", textAlign: "right" }}
                    >
                      {work.location.city} , {work.location.country}
                    </Card.Footer>
                  </Card>
                </Row>
              );
            })}
          <Row ref={this.leadRef}>
            {/* <h2>Activities and Leaderships</h2> */}
          </Row>
          <Row ref={this.skillRef}>
            <h2>Skills</h2>
          </Row>
          <Row>
            <CardColumns className="card-columns">
              {this.state.skills &&
                this.state.skills.map((s, i) => {
                  let skillStack = s.value.map((stack, i) => {
                    return <li key={i}>{stack}</li>;
                  });

                  return (
                    <Card key={i}>
                      <Card.Body>
                        <Card.Title>{s.name}</Card.Title>
                        <ul className="stacks">{skillStack}</ul>
                      </Card.Body>
                    </Card>
                  );
                })}
            </CardColumns>
          </Row>
        </Container>

        <style type="text/css">{`
        .container {
          padding: 20px;
        }
        .container > * {
          margin: 10px;
        }
        .scroll-button {
          color: white;
          background-color: #457b9d;
          border-color: #457b9d;
          border-radius: 20px;
          margin-right: 10px;
          margin-bottom: 5px;
        }
        .scroll-button:hover {
          background-color: dark-grey;
        }
        .stacks {
            list-style: none;
            text-indent: 0;
            margin:0;
            padding: 0;
        }
  
        .stacks > li {
          display: inline-block;
          background-color: #457b9d;
          color: white;
          font-size: small;
          margin: 2px;
          padding: 3px 10px;
          width: fit-content;
          border-radius: 15px;
        }
        
          `}</style>
      </>
    );
  }
}
