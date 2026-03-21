import './Card.css';

function Card({ children, className = '', onClick }) {
  return (
    <div className={`card-component ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

export default Card;

