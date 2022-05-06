import React, { Component } from "react";
import { Nav, Container, Tabs, Tab, Row, Col } from "react-bootstrap";
import { isPropertySignature } from "typescript";
import TaskComponent from "./TaskDisplay";
import TaskLayer from "./TaskLayer";
import TaskContext, { withTasks } from "../context/TaskContext";
import UserContext from "../context/UserContext";
import { withSession } from "../context/UserContext";


class MainDisplay extends React.Component<any, any> {

    userIsAssigner = (e: any) => {
        const listOfTasks = [] as React.ReactElement[];

        console.log(this.props.tasks);
        console.log(this.props);
        console.log(this.props.user);
        if (this.props.tasks === undefined) {
            return <h1>No tasks</h1>
        }
        else {
            for (const [key, value] of this.props.tasks) {
                if (value.assignee === this.props.user.id) {
                    listOfTasks.push(<TaskComponent task={value} />)
                }
            }
            if (listOfTasks.length === 0) {
                return <h1>No taks have been Assigned</h1>
            }
            return listOfTasks;
        }

    }

    userIsAssignee = (e: any) => {
        for (const [key, value] of this.props.tasks) {
            if (value.assignee === this.props.user.id) {
                return <TaskComponent task={value} />
            }
        }
        return <h1>No tasks have been assigned to you</h1>
    }

    render() {
        return (
            <Container>
                <Tabs defaultActiveKey="assigned-to-user">
                    <Tab eventKey="assigned-to-user" title="Assigned to me">
                        <h1>No tasks have been assigned to you</h1>
                        {this.userIsAssigner(1)}
                    </Tab>
                    <Tab eventKey="assigned-by-user" title="Assigned by me">
                        <h1>No tasks have been assigned by you</h1>
                    </Tab>
                </Tabs>

            </Container>
        );
    }

}
export default withSession(withTasks(MainDisplay));
