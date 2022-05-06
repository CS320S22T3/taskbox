/* eslint-disable react/jsx-key */
import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";

const TORTypes = ["Sick Time", "Jury Duty", "Vacation Time", "Parental Leave"];
function TOR(info: any): Array<Array<string>> {
  return [
    ["Type", TORTypes[info.type]],
    ["Start date", new Intl.DateTimeFormat().format(new Date(info.start_date))],
    ["End date", new Intl.DateTimeFormat().format(new Date(info.start_date))],
    ["Notes", info.notes],
  ];
}

function TR(info: any): Array<Array<string>> {
  return [
    ["Type", TORTypes[info.type]],
    ["Start date", new Intl.DateTimeFormat().format(new Date(info.start_date))],
    ["End date", new Intl.DateTimeFormat().format(new Date(info.start_date))],
    ["Notes", info.notes],
  ];
}

function PRR(info: any): Array<Array<string>> {
  return [
    ["Type", TORTypes[info.type]],
    ["Start date", new Intl.DateTimeFormat().format(new Date(info.start_date))],
    ["End date", new Intl.DateTimeFormat().format(new Date(info.start_date))],
    ["Notes", info.notes],
  ];
}

function formatTask(task: any): Array<Array<string>> {
  return [
    ["ID", task.id],
    [
      "Created date",
      new Intl.DateTimeFormat().format(new Date(task.created_date)),
    ],
    ["Due date", new Intl.DateTimeFormat().format(new Date(task.due_date))],
  ];
}
const INFO_FUNCTIONS = {
  time_off_requests: TOR,
  training_assignments: TR,
  performance_review_requests: PRR,
};

const INFO_NAMES = {
  time_off_requests: "Time Off Request",
  training_assignments: "Training Assignment",
  performance_review_requests: "Performance Review Request",
};

function TaskCard(props: { task: any }) {
  const task = props.task;
  console.log(task.info_type);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{`Task #${task.id} (${
          INFO_NAMES[task.info_type as keyof typeof INFO_NAMES] as string
        })`}</Card.Title>
        <ListGroup>
          {formatTask(task).map((pair: any) => (
            <ListGroupItem>{`${pair[0]}: ${pair[1]}`}</ListGroupItem>
          ))}
        </ListGroup>
        <br></br>
        <ListGroup>
          {(
            INFO_FUNCTIONS[task.info_type as keyof typeof INFO_FUNCTIONS] as (
              x: any
            ) => any
          )(task.info).map((pair: any) => (
            <ListGroupItem>{`${pair[0]}: ${pair[1]}`}</ListGroupItem>
          ))}
        </ListGroup>
        <br></br>
        <Button variant="primary">Update Task</Button>
      </Card.Body>
    </Card>
  );
}

export default function TaskGrid(props: any) {
  return (
    <Container mx-auto mt-4>
      <Row>
        <Col md-4>
          {props.tasks.map((t: any) => (
            <TaskCard task={t} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}
