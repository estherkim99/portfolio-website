import React from "react";
import ProjectCard from "../components/project-card";
import CardColumns from "react-bootstrap/CardColumns";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { projectTexts, apiInfo } from "../content";

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.academicRef = React.createRef();
    this.personalRef = React.createRef();
  }

  componentDidMount() {
    fetch(apiInfo.domain + "/contents/projects", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        response.projects.personal.sort(function (a, b) {
          return new Date(b.start_date) - new Date(a.start_date);
        });
        response.projects.academic.sort(function (a, b) {
          return new Date(b.start_date) - new Date(a.start_date);
        });

        this.setState({
          personal: response.projects.personal,
          academic: response.projects.academic,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const scrollToPersonal = () =>
      window.scrollTo(0, this.personalRef.current.offsetTop);
    const scrollToAcademic = () =>
      window.scrollTo(0, this.academicRef.current.offsetTop);

    return (
      <>
        <Container fluid className="container">
          <Row className="justify-content-center">
            <p>{projectTexts.note}</p>
          </Row>
          <Row className="justify-content-center">
            <Button
              onClick={scrollToPersonal}
              variant="light"
              className="scroll-button"
            >
              Personal Projects
            </Button>
            <Button
              onClick={scrollToAcademic}
              variant="light"
              className="scroll-button"
            >
              Academic Projects
            </Button>
          </Row>
          <Row className="justify-content-center">
            <p>{projectTexts.intro}</p>
          </Row>

          <Row ref={this.personalRef}>
            <h2>Personal Projects</h2>
          </Row>
          <Row>
            <CardColumns className="card-columns">
              {this.state.personal &&
                this.state.personal.map((project) => {
                  return (
                    <ProjectCard
                      key={project.id}
                      name={project.name}
                      keywords={project.keywords.map((x) => x.name)}
                      stack={project.stack.map((x) => x.name)}
                      start_date={project.start_date}
                      end_date={project.end_date}
                      description={project.description}
                      project_url={project.project_url}
                      source_url={project.source_url}
                      extra={project.extra}
                    />
                  );
                })}
            </CardColumns>
          </Row>
          <Row ref={this.academicRef}>
            <h2>Academic Projects</h2>
          </Row>
          <Row>
            <CardColumns className="card-columns">
              {this.state.personal &&
                this.state.academic.map((project) => {
                  return (
                    <ProjectCard
                      key={project.id}
                      name={project.name}
                      keywords={project.keywords.map((x) => x.name)}
                      stack={project.stack.map((x) => x.name)}
                      start_date={project.start_date}
                      end_date={project.end_date}
                      description={project.description}
                      project_url={project.project_url}
                      source_url={project.source_url}
                      extra={project.extra}
                      course_name={
                        project.course.course_code + " " + project.course.name
                      }
                    />
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
        
          `}</style>
      </>
    );
  }
}
