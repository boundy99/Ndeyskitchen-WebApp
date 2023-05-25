export default function Image(props) {
  return (
    <img
      className={props.className}
      alt="image"
      src={require('../images/' + props.src)}
    />
  );
}
