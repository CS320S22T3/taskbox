import React, { Component } from "react";
import { Nav, Container, Tabs, Tab, Row, Col } from "react-bootstrap";
import { isPropertySignature } from "typescript";
import TempTask from "./TempTask";


class MainDisplay extends React.Component<any, any> {

    render() {
        return (
            <Container>
                <Tabs defaultActiveKey="assigned-to-user">
                    <Tab eventKey="assigned-to-user" title="Assigned to me">
                        <TempTask task="These are tasks assigned to you" />
                    </Tab>
                    <Tab eventKey="assigned-by-user" title="Assigned by me">
                        <TempTask task="These are tasks assigned by you" />
                    </Tab>
                </Tabs>

            </Container>
        );
    }

}
export default MainDisplay;
