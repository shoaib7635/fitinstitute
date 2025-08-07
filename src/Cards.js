import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Cards(props) {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src={props.image}
        style={{ height: '300px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.text}</Card.Text>

        <Link  to="/details"
          state={{
            title: props.title,
            description: props.text,
            imageUrl: props.image,
            price: props.price || 999,
            quantity: 1
          }}>
          <Button variant="primary" onClick={handleClick}>
            {props.btnText}
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Cards;
