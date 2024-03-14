import React from "react";
import { Col, Container, Row } from "reactstrap";
import { JustForYou, RobotCollection } from "../../Constant";
import SectionHeader from "../../Element/SectionHeader";
import VRSliders from "./VRSlider";
const ElectronicVR = ({ productData }) => {
    return (
        <section className="ratio_asos">
            <Container fluid={true} className="home-page" >
                <Row>
                    <Col>
                        <SectionHeader title={RobotCollection} subTitle={JustForYou} />
                        <VRSliders FilterVrProduct={productData} />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
export default ElectronicVR;