
import CountdownModel from './CountdownModel';

function CountDown(props) {
  const { timeRemaining, className, onComplete } = props;

  const getComp = ({ getTime }) => {
    const { day, hour, minute, second } = getTime(timeRemaining);
    return <div className={className}>{`${day}天${hour}:${minute}:${second}`}</div>;
  };
  return <CountdownModel Component={getComp} timeRemaining={timeRemaining} onComplete={onComplete} />;
}

export default CountDown;
