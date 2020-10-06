import React from "react";
import { socialMediaLinks } from "../content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faLinkedinIn,
  faGoogle,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
library.add(faGoogle, faGithub, faLinkedinIn, faFacebookF);

export default function Links() {
  return (
    <div className="social-media">
      <a href={socialMediaLinks.github} className="github">
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a href={socialMediaLinks.linkedin} className="linkedin">
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
      <a href={`mailto:${socialMediaLinks.gmail}`} className="google">
        <FontAwesomeIcon icon={faGoogle} />
      </a>
      <a href={socialMediaLinks.facebook} className="facebook">
        <FontAwesomeIcon icon={faFacebookF} />
      </a>
      <style type='text/css'>
          {`
          .facebook  {
            background-color: #3b5998;
          }
          .linkedin  {
            background-color: #0e76a8;
          }
          .github {
            background-color: #333;
          }
          .google {
            background-color: #ea4335;
          }
          .social-media {
            text-align: center;
          }
          .social-media > a {
            color: #FFFFFF;
            border-radius: 1.5em;
            display: inline-block;
            font-size: 1.5em;
            line-height: 1.5em;
            margin: 0px 5px;
            text-align: center;
            width: 1.5em;
          }
          
          .social-media a:hover{
            opacity: 0.5;
            transition: 0.5s ease-in;
          }
          
        //   @media (max-width: 768px) {
        //     .social-media-div {
        //       
        //     }
        //   }
      `}
      </style>
    </div>
  );
}
