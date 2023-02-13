function App() {
  //States
  const [breakLength, setBreakLength] = React.useState(5*60);
  const [sessionLength, setSessionLength] = React.useState(25*60);
  const [displayTime, setDisplayTime] = React.useState(25*60);
  const [active, setActive] = React.useState(false);
  const [session, setSession] = React.useState("SESSION");

  //Functions

  const controlTime = () => {
    const audio=document.getElementById("beep");
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = session == "SESSION" ? false : true;
    if (!active) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime((prev) => {
            if (prev <= 0 && !onBreakVariable) {
              audio.currentTime
              audio.play();
              onBreakVariable = true;
              setSession("BREAK");
              return breakLength;
            } else if (prev <= 0 && onBreakVariable) {
              audio.currentTime
              audio.play();
              onBreakVariable = false;
              setSession("SESSION");
              return sessionLength;
            }
            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    if (active) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setActive(!active);
  };

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const increment = (type) => {
    if (type == "break" && breakLength < 3600) {
      setBreakLength((prev) => prev + 60);
    } else if (type == "session" && sessionLength < 3600) {
      setSessionLength((prev) => prev + 60);
      setDisplayTime(sessionLength+60);
    }
  };

  const decrement = (type) => {
    if (type == "break" && breakLength > 60) {
      setBreakLength((prev) => prev - 60);
    } else if (type == "session" && sessionLength > 60) {
      setSessionLength((prev) => prev - 60);
      setDisplayTime(sessionLength-60);
    }
  };

  const reset = () => {
    if (active) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setActive(false);
    setBreakLength(5 * 60);
    setSessionLength(25 * 60);
    setDisplayTime(25 * 60);
    setSession("SESSION");
    const audio=document.getElementById("beep");
    audio.pause();
    audio.currentTime=0;
  };
  //Render
  return (
    <div className="app">
      <div className="wrapper">
        <h1>Pomodoro Clock</h1>
        <div className="modules">
          <Module
            type="break"
            title="Break Length"
            long={breakLength / 60}
            increment={increment}
            decrement={decrement}
            active={active}
          />
          <Module
            type="session"
            title="Session Length"
            long={sessionLength / 60}
            increment={increment}
            decrement={decrement}
            active={active}
          />
        </div>
        <Clock
          session={session}
          displayTime={displayTime}
          formatTime={formatTime}
          controlTime={controlTime}
          active={active}
          reset={reset}
        />
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

function Module({ type, title, long, increment, decrement, active }) {
  const label = type + "-label";
  const decrementID = type + "-decrement";
  const length = type + "-length";
  const incrementID = type + "-increment";

  return (
    <div className="module">
      <div id={label}>{title}</div>
      <div className="display">
        <button
          id={decrementID}
          className="btn-small deep-purple lighten-2"
          onClick={() => decrement(type)}
        >
          <i className="material-icons">arrow_downward</i>
        </button>
        <h3 id={length}>{long}</h3>
        <button
          id={incrementID}
          className="btn-small deep-purple lighten-2"
          onClick={() => increment(type)}
        >
          <i className="material-icons">arrow_upward</i>
        </button>
      </div>
    </div>
  );
}

function Clock({
  session,
  displayTime,
  formatTime,
  controlTime,
  active,
  reset,
}) {
  return (
    <div className="clock">
      <h3 id="timer-label">{session}</h3>
      <h1 id="time-left">{formatTime(displayTime)}</h1>
      <button
        className="btn-large deep-purple lighten-2"
        id="start_stop"
        onClick={controlTime}
      >
        {active ? (
          <i className="material-icons">pause_circle_filled</i>
        ) : (
          <i className="material-icons">play_circle_filled</i>
        )}
      </button>
      <button
        className="btn-large deep-purple lighten-2"
        id="reset"
        onClick={reset}
      >
        <i className="material-icons">autorenew</i>
      </button>
    </div>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
/*ReactDOM.createRoot(document.getElementById('root')).render(<App />);*/
