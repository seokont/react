import { useHistory } from "react-router-dom";

function HomeButton() {
  let history = useHistory();

  function handleClick() {
    history.push("/poker");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}

export default HomeButton;