import { Card, Button, Carousel, Container, Row, Col, Badge } from 'react-bootstrap';
import { Github, Globe, Whatsapp } from 'react-bootstrap-icons';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/main/styles/Portafolio.css';

// Datos del equipo
const teamMembers = [
  {
    name: "Juan David Guarin Romero",
    role: "Desarrollador Full Stack",
    bio: "Apasionado por crear soluciones escalables con las mejores tecnologías web.",
    image: "/Guarin.png",
    github: "https://github.com/teka369",
  },
  {
    name: "Valeria Zapata Vargas",
    role: "Desarrolladora Full Stack",
    bio: "Desarrolladora profesional con gran capacidad de liderazgo y experiencia en proyectos web.",
    image: "/Valeria.png",
    github: "https://github.com/AfterNixe",
  },
  {
    name: "David Blandon Caro",
    role: "Desarrollador Full Stack",
    bio: "Eficiente en su trabajo con amplio conocimiento en tecnologías front-end y back-end.",
    image: "/david.png",
    github: "https://github.com/",
  },
];

// Proyectos
const projects = [
  {
    title: "Prácticas del SENA 2024",
    description: "Plataforma para gestionar prácticas estudiantiles del SENA",
    image: "https://media.istockphoto.com/id/1089037012/es/vector/%C3%A1rbol-de-la-ciencia-y-el-libro-abierto-dise%C3%B1o-de-plantillas-de-educaci%C3%B3n-moderna.jpg?s=612x612&w=0&k=20&c=X0rv_deZID2aVrXu_CqOIxxJV_Rk7q99gUisj53T5c0=",
    technologies: ["HTML", "CSS", "JS"],
    repoUrl: "https://github.com/teka369/Practicas-SENA",
  },
];

// Componente de Miembro del Equipo
const TeamMemberCard = ({ member }: { member: typeof teamMembers[0] }) => (
  <Card className="h-100 shadow-lg border-0">
    <div className="text-center p-4">
      <div className="team-member-img-container mb-5">
        <Card.Img 
          src={member.image || "https://via.placeholder.com/500?text=Profile"} 
          alt={member.name} 
          className="team-member-img" 
        />
      </div>
      <Card.Body className="p-0">
        <Card.Title className="fw-bold mb-3 fs-3">{member.name}</Card.Title>
        <Card.Subtitle className="text-muted mb-3 fs-5">{member.role}</Card.Subtitle>
        <Card.Text className="mb-4">{member.bio}</Card.Text>
        <div className="d-flex justify-content-center gap-4">
          <Button variant="outline-dark" href={member.github} target="_blank" className="rounded-circle p-2">
            <Github className="fs-4" />
          </Button>
        </div>
      </Card.Body>
    </div>
  </Card>
);

// Componente de Proyecto
const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <Card
      className="project-card h-100 shadow-lg border-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="project-image-container">
        <Card.Img variant="top" src={project.image} className="project-image" />
        <div className={`project-overlay ${isHovered ? "show" : ""}`}>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="light" size="sm" href={project.repoUrl} target="_blank" className="rounded-pill px-3 py-2 fw-bold">
              <Github className="me-2" /> Repositorio
            </Button>
          </div>
        </div>
      </div>
      <Card.Body>
        <Card.Title className="fw-bold mb-3">{project.title}</Card.Title>
        <Card.Text className="text-muted mb-3">{project.description}</Card.Text>
        <div className="mb-2">
          {project.technologies.map((tech, index) => (
            <Badge key={index} bg="accent" className="me-2 mb-2 rounded-pill px-3 py-2">
              {tech}
            </Badge>
          ))}
        </div>
      </Card.Body>
    </Card>
  )
}

// Componente principal
const Portafolio = () => {
  return (
    <div className="portfolio-app">
      {/* Sección Hero */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <Container className="hero-content text-center">
          <h1 className="hero-title mb-4">Equipo de Desarrollo</h1>
          <p className="hero-subtitle mb-5">Transformando ideas en soluciones digitales innovadoras</p>
        </Container>
      </section>

      {/* Sección del Equipo */}
      <section className="py-5 team-section">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Nuestro Equipo</h2>
            <div className="section-underline mx-auto"></div>
            <p className="section-subtitle">Profesionales apasionados por la tecnología y la innovación</p>
          </div>

          <Row xs={1} md={2} lg={3} className="g-4">
            {teamMembers.map((member, index) => (
              <Col key={index}>
                <TeamMemberCard member={member} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Sección de Proyectos */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Practicas</h2>
            <div className="section-underline mx-auto"></div>
            <p className="section-subtitle">Practicas creativas a mano</p>
          </div>
          <Row xs={1} md={2} lg={3} className="g-4">
            {projects.map((project, index) => (
              <Col key={index}>
                <ProjectCard project={project} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Tecnologías */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Tecnologías</h2>
            <div className="section-underline mx-auto"></div>
            <p className="section-subtitle">Herramientas y frameworks que utilizamos</p>
          </div>
          <div className="d-flex flex-wrap justify-content-center gap-5">
            <i className="devicon-react-original colored tech-icon"></i>
            <i className="devicon-nextjs-plain colored tech-icon"></i>
            <i className="devicon-tailwindcss-plain colored tech-icon"></i>
            <i className="devicon-nodejs-plain colored tech-icon"></i>
            <i className="devicon-mysql-plain colored tech-icon"></i>
            <i className="devicon-html5-plain colored tech-icon"></i>
            <i className="devicon-css3-plain colored tech-icon"></i>
            <i className="devicon-javascript-plain colored tech-icon"></i>
            <i className="devicon-typescript-plain colored tech-icon"></i>
            <i className="devicon-postgresql-plain colored tech-icon"></i>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Portafolio;