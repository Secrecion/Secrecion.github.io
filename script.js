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
  },
];

const proyectosFCC = [
  {
    title: "Random-Quote",
    local: "./RandomQuote",
    id: "2.1",
    src: "./Resources/quotegen.png",
  },
  {
    title: "Markdown-Previewer",
    local: "./MarkdownPreviewer",
    id: "2.2",
    src: "./Resources/markdown.png",
  },
  {
    title: "Drum-Machine",
    local: "./DrumMachine",
    id: "2.3",
    src: "./Resources/drummachine.png",
  },
  {
    title: "Calculator",
    local: "./Calculator",
    id: "2.4",
    src: "./Resources/calculator.png",
  },
  {
    title: "Pomodoro-Clock",
    local: "./Pomodoro",
    id: "2.5",
    src: "./Resources/pomodoro.png",
  },
];
const proyectosD3 = [
  {
    title: "Bar Chart",
    local: "./BarChart",
    id: "3.1",
    src: "./Resources/barchart.png",
  },
  {
    title: "Scatterplot Graph",
    local: "./ScatterplotGraph",
    id: "3.2",
    src: "./Resources/scatterplotgraph.png",
  },
  {
    title: "Heat Map",
    local: "./HeatMap",
    id: "3.3",
    src: "./Resources/heatmap.png",
  },
  {
    title: "Choropleth Map",
    local: "./ChoroplethMap",
    id: "3.4",
    src: "./Resources/choroplethmap.png",
  },
  {
    title: "Treemap",
    local: "./Treemap",
    id: "3.5",
    src: "./Resources/treemap.png",
  }
]

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
        <h1 className="fcc-title">Proyectos de FCC(React):</h1>
        <div className="fcc-project">
          {proyectosFCC.map((item) => (
            <Boton item={item} />
          ))}
        </div>
      </div>

      <div className="d3">
        <h1 className="d3-title">Proyectos de Data Visualization (D3):</h1>
        <div className="d3-project">
          {proyectosD3.map((item) => (
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
      <a href={item.local} target="_blank" className="link">
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
