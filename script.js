function Header() {
  return (
    <div className="header">
      <img
        src="./Resources/Tyler.logo.png"
        alt="jabon"
        className="logo-header"
      />
    </div>
  );
}

const header = document.getElementById("header");
const head = ReactDOM.createRoot(header);
head.render(<Header />);

const proyectosAlura = [
  {
    title: "Coder",
    local: "./AluraLatam/Coder",
    id: "1.1",
    src: "./Resources/coder.png",
  }
];

const proyectosFCC = [
  {
    title: "Random-Quote",
    local: "./RandomQuote",
    id: "2.1",
    src: "./Resources/quotegen.png"
  },
  {
    title: "Markdown-Previewer",
    local: "./MarkdownPreviewer",
    id: "2.2",
    src: "./Resources/markdown.png"
  },
  {
    title: "Drum-Machine",
    local: "./DrumMachine",
    id: "2.3",
    src: "./Resources/drummachine.png"
  },
];

function App() {
  return (
    <div className="app">
      <div className="alura">
        <h1 className="alura-title">Proyectos de Alura:</h1>
        <div className="alura-project">
          {proyectosAlura.map((item) => (
            <Boton item={item} />
          ))}
        </div>
      </div>

      <div className="fcc">
        <h1 className="fcc-title">Proyectos de FCC:</h1>
        <div className="fcc-project">
          {proyectosFCC.map((item) => (
            <Boton item={item} />
          ))}
        </div>
      </div>

    </div>
  );
}

function Boton({ item }) {
  return (
    <div className="boton">
      <a href={item.local} target="_blank"className="link">
        <div id={item.id} className="btn-div">
          <img src={item.src} className="btn-img" />
          <p className="btn-name">{item.title}</p>
        </div>
      </a>
    </div>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

function Footer() {
  return (
    <div className="footer">
        <p className="footer-phrase">"You're not your fucking khakis"</p>
      <img src="./Resources/Soap1.png" alt="jabon" className="logo-footer" />
    </div>
  );
}

const footer = document.getElementById("footer");
const foot = ReactDOM.createRoot(footer);
foot.render(<Footer />);
