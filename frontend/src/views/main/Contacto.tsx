
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const Contacto = () => {
    return(
        <>
        <section id="contacto" className="app-section contact-section">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title mb-3">📩 ¡Conversemos!</h2>
            <p className="section-text lead">
              ¿Estás listo para elevar tu aprendizaje? Estamos aquí para apoyarte en cada paso. Contáctanos y descubre cómo podemos colaborar.
            </p>
          </div>
          <div className="row">
            {/* Tarjeta: Correo Electrónico */}
            <div className="col-md-4 mb-3">
              <div className="card contact-card text-center">
                <div className="card-body">
                  <div className="icon-wrapper mb-3">
                    <div className="icon-circle bg-danger">
                      <i className="bi bi-envelope" style={{ fontSize: '2rem', color: '#fff' }}></i>
                    </div>
                  </div>
                  <h5 className="card-title">Correo Electrónico</h5>
                  <p className="card-text text-dark">Envíanos un mensaje para consultas o propuestas.</p>
                  <Link to="mailto:rec.proyect@gmail.com" className="btn btn-danger">
                    ✉️ Enviar Correo
                  </Link>
                </div>
              </div>
            </div>
            {/* Tarjeta: WhatsApp */}
            <div className="col-md-4 mb-3">
              <div className="card contact-card text-center">
                <div className="card-body">
                  <div className="icon-wrapper mb-3">
                    <div className="icon-circle bg-success">
                      <i className="bi bi-whatsapp" style={{ fontSize: '2rem', color: '#fff' }}></i>
                    </div>
                  </div>
                  <h5 className="card-title">WhatsApp</h5>
                  <p className="card-text text-dark">Contáctanos para respuestas rápidas.</p>
                  <Link to="https://wa.me/573104713054" target="_blank" className="btn btn-success">
                    💬 Enviar Mensaje
                  </Link>
                </div>
              </div>
            </div>
            {/* Tarjeta: Ubicación */}
            <div className="col-md-4 mb-3">
              <div className="card contact-card text-center">
                <div className="card-body">
                  <div className="icon-wrapper mb-3">
                    <div className="icon-circle bg-primary">
                      <i className="bi bi-geo-alt" style={{ fontSize: '2rem', color: '#fff' }}></i>
                    </div>
                  </div>
                  <h5 className="card-title">Visítanos</h5>
                  <p className="card-text text-dark">Av. Principal 1234, Ciudad</p>
                  <Link to="#mapa" className="btn btn-primary">
                    📍 Ver Mapa
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}