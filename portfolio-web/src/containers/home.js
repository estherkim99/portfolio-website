import React from "react";
import Links from "../components/links";
import Button from "react-bootstrap/Button";
import mainPhoto from "../static/undraw_dev_focus_b9xo.svg";

export default function Home() {
  return (
    <>
      <div className="home">
        <img src={mainPhoto} alt="main"/>
        <h2>
          I'm an aspiring software engineer studying computer science at Brown
          University, with interests in machine learning, image
          processing, and web development.
        </h2>
        <div className="buttons">
          {/* <Button variant="custom" href="/about">
            About me
          </Button> */}
          <Button variant="custom" href="/#/cv">
            CV
          </Button>
          <Button variant="custom" href="/#/projects">
            Projects
          </Button>
        </div>
        <div className="links">
          <Links />
        </div>
      </div>
      <style type="text/css">{`
      h2 {
          font-size: large;
          margin-top: 50px;
      }
    .btn-custom {
        background-color: #1d3557;
        color: white;
        margin: 0px 10px;
        width: 100px;
        border-radius: 15px;
    }
    .btn-custom:hover {
      color: lightgray;
    }
    .home {
        height: 90vh;
        width: 100vw;
        text-align: center;
        padding: 20vh 10vw;
    }
    .home > img {
        height: 30vh;
    }
    .buttons {
        margin-top: 30px;
    }
    .links {
        margin: 30px 0px;
    }
    `}</style>
    </>
  );
}
