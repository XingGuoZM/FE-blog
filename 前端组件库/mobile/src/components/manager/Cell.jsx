import withManagerCell from "./withManagerCell";
import BehaviorManager from "./manager";

const Cell = (props) => {
  const { item } = props;
  return <div>{item}</div>;
};

export default withManagerCell(Cell, BehaviorManager);
