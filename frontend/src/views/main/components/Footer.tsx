import '../../../assets/main/styles/Footer.css';
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="fadeInUp">
          {/* Sección Izquierda: Información de la empresa y enlaces */}
          <Col md={6} className="company-info">
            <h5>Nombre de la Empresa</h5>
            <p>
              Somos líderes en el mercado, ofreciendo soluciones innovadoras y de alta calidad para transformar tu experiencia digital.
            </p>
            <Row>
              <Col xs={6}>
                <ul>
                  <li>
                    <a href="#inicio">Inicio</a>
                  </li>
                  <li>
                    <a href="#nosotros">Nosotros</a>
                  </li>
                  <li>
                    <a href="#servicios">Servicios</a>
                  </li>
                </ul>
              </Col>
              <Col xs={6}>
                <ul>
                  <li>
                    <a href="#contacto">Contacto</a>
                  </li>
                  <li>
                    <a href="#blog">Blog</a>
                  </li>
                  <li>
                    <a href="#faq">FAQ</a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>

          {/* Sección Derecha: Formulario de suscripción */}
          <Col md={6}>
            <h5>Suscríbete a nuestro Newsletter</h5>
            <Form className="subscription-form">
              <Form.Group controlId="formEmail">
                <Form.Label className="d-none">Correo Electrónico</Form.Label>
                <Form.Control type="email" placeholder="Introduce tu email" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Suscribirse
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Línea separadora */}
        <hr />

        <Row className="fadeInUp d-flex justify-content-between align-items-center">
          <Col md={6}>
            <p>&copy; {new Date().getFullYear()} Nombre de la Empresa. Todos los derechos reservados.</p>
          </Col>
          <Col md={6} className="text-md-right social">
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
