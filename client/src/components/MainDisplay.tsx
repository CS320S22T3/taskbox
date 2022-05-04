import React, { Component } from "react";
import { Nav, Container, Tabs, Tab, Row, Col } from "react-bootstrap";
import { isPropertySignature } from "typescript";
import TaskComponent from "./TaskComponent";
import TaskLayer from "./TaskLayer";
import TaskContext, { withTasks } from "../context/TaskContext";
import UserContext from "../context/UserContext";
import { withSession } from "../context/UserContext";


class MainDisplay extends React.Component<any, any> {

    userIsAssigner = (e: any) => {
        for (let [key, value] of this.props.tasks) {
            if (value.assigner === this.props.user.id) {
                return <TaskComponent task={value} />
            }
        }
        return
    }

    render() {
        return (
            <Container>
                <Tabs defaultActiveKey="assigned-to-user">
                    <Tab eventKey="assigned-to-user" title="Assigned to me">
                        {this.userIsAssigner(1)}
                    </Tab>
                    <Tab eventKey="assigned-by-user" title="Assigned by me">

                    </Tab>
                </Tabs>

            </Container>
        );
    }

}
export default withTasks(withSession(MainDisplay));
