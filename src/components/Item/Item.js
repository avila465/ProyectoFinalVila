import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const Item = ({llave,nombre,imagen,precio}) =>{
    return(
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={imagen} alt={imagen}/>
          <Card.Body>
            <Card.Title>{nombre}</Card.Title>
            <Card.Text>Precio: $ {precio}</Card.Text>
            <Link to={`/item/${llave}`}><Button variant="primary">Ver Detalle</Button></Link>
          </Card.Body>
        </Card>
    )
}
export default Item;
Item.propTypes ={
  llave: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  imagen: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
}