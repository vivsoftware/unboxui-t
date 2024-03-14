import React from 'react'
import { Container, Row } from 'reactstrap'
import ContactForm from '../../Components/Pages/ContactUs/ContactForm'
import ContactSidebar from '../../Components/Pages/ContactUs/ContactSidebar'

const ContactContain = () => {
    return (
        <section className="contact-section">
            <Container>
                <Row className="g-4">
                    <ContactForm />
                    <ContactSidebar />
                </Row>
            </Container>
        </section>
    )
}

export default ContactContain