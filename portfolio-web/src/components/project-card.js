import React from "react";

import Card from "react-bootstrap/Card";

export default function ProjectCard({
  name,
  keywords,
  stack,
  course_name,
  start_date,
  end_date,
  description,
  project_url,
  source_url,
  extra,
}) {
  if (start_date != null) {
    let start_dateobj = new Date(start_date)
    start_date = String(start_dateobj.getFullYear()) + '.' + String(start_dateobj.getMonth() + 1)
  }
  if (end_date == null) {end_date = "Current"}
  else {
    let end_dateobj = new Date(end_date)
    end_date = String(end_dateobj.getFullYear()) + '.' + String(end_dateobj.getMonth() + 1)
  }

  let demo_link, source_link;
  console.log(project_url);
  if (project_url !== null && project_url !== "") {
    demo_link = <Card.Link href={project_url}>demo</Card.Link>;
  }
  if (source_url !== null && source_url !== "") {
    source_link = <Card.Link href={source_url}>source code</Card.Link>;
  }
  let stacks = stack.map((name) => { return (<li key={name}>{name}</li>)})
  let keywords_li = keywords.map((name) => { return (<li key={name}>{name}</li>)})
  
  let course;
  if (course_name) course ='- ' + course_name

  return (
    <>
      <Card className="card">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2">
            {course}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {start_date} ~ {end_date}
          </Card.Subtitle>
          <Card.Text
            dangerouslySetInnerHTML={{ __html: description }}
          ></Card.Text>
          {demo_link}
          {source_link}
        </Card.Body>
        <Card.Footer>
          <ul className='stacks'>
            {stacks}
            {keywords_li}
          </ul>
        </Card.Footer>
      </Card>
      {/* <p>{name}</p>
      <p>{stack}</p> */}
      <style type="text/css">
        {`
     
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
      
      `}
      </style>
    </>
  );
}
