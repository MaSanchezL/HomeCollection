import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--principal)',
      color: 'var(--complementario)',
      padding: '20px 0',
      marginTop: 'auto',
      textAlign: 'center'
    }}>
      <Container className="d-flex flex-column justify-content-center align-items-center">
        <div>
          <a href="#" className="me-3" style={{ color: 'var(--complementario)' }}><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
          <a href="#" className="me-3" style={{ color: 'var(--complementario)' }}><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
          <a href="#" style={{ color: 'var(--complementario)' }}><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
        </div>
        <p className="mt-3" style={{ margin: 0 }}>&copy; {new Date().getFullYear()} HOME COLLECTION. Todos los derechos reservados.</p>
      </Container>
    </footer>
  );
}

export default Footer;