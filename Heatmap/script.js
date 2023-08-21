const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
let req = new XMLHttpRequest();
let data;
let values = [];
let baseTemp;
let tooltip;

let yScale;
let xScale;

const width = 1000;
const height = 600;
const padding = 60;

let svg = d3.select("svg");
let container = d3.select("#container");
let legend = d3.select("#legend")
.attr("width","200")
.attr("height","100");

let drawSvg = () => {
  svg
    .attr("width", width)
    .attr("height", height)
    //Agregar Titulo
    .append("text")
    .text("Monthly Global Land Surface Temperature")
    .attr("id", "title")
    .attr("x", "320")
    .attr("y", "20");

  container
  .attr("id", "description")
  .text("Descripcion");

    tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden")
    .style("width", "auto")
    .style("height", "auto");
};

let escalas = () => {
  let minYear = d3.min(values, (d) => d.year);
  let maxYear = d3.max(values, (d) => d.year);

  let minMonth = new Date(0,0,0,0,0,0,0);
  let maxMonth = new Date(0,12,0,0,0,0,0);

  xScale = d3
    .scaleLinear()
    .domain([minYear, maxYear+1])
    .range([padding, width - padding]);

  yScale = d3
    .scaleTime()
    .domain([minMonth, maxMonth])
    .range([padding,(height-padding)]);
};

let generateAxes = () => {
  let xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  svg
    .append("g")
    .attr("id", "x-axis")
    .call(xAxis)
    .attr("transform", "translate(0," + (height - padding) + ")");

  let yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%B"));
  svg
    .append("g")
    .attr("id", "y-axis")
    .call(yAxis)
    .attr("transform", "translate(" + padding + ", 0)");
};

let drawMap = () => {
  let minVariance = d3.min(values, (d) => d.variance);
  let maxVariance = d3.max(values, (d) => d.variance);
  let stepVariance = (maxVariance - minVariance) / 4;

  let minYear = d3.min(values, (d) => d.year);
  let maxYear = d3.max(values, (d) => d.year);

  legend
  .append("g")
  .append("rect")
  .attr("fill","navy")
  .attr("width","30")
  .attr("height","30")
  .attr("x",10)
  .attr("y", 10);

  legend
  .append("g")
  .append("rect")
  .attr("fill","green")
  .attr("width","30")
  .attr("height","30")
  .attr("x",50)
  .attr("y", 10);
  
  legend
  .append("g")
  .append("rect")
  .attr("fill","orange")
  .attr("width","30")
  .attr("height","30")
  .attr("x",90)
  .attr("y", 10);
  
  legend
  .append("g")
  .append("rect")
  .attr("fill","red")
  .attr("width","30")
  .attr("height","30")
  .attr("x",130)
  .attr("y", 10);
   
  legend
  .append("g")
  .append("text")
  .text("Varianza Cuarto")
  .attr("x",10)
  .attr("y", 70);

  svg
    .selectAll("rect")
    .data(values)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("data-month", (item) => item.month-1)
    .attr("data-year", (item) => item.year)
    .attr("data-temp", (item) => baseTemp + item.variance)
    .attr("width", (width - 2 * padding) / (maxYear - minYear + 1))
    .attr("height", (height - 2 * padding) / (12))
    .attr("x", (item) => xScale(item.year))
    .attr("y", (item) => yScale(new Date(0,item.month-1,0,0,0,0,0)))
    .attr("fill", (item) => {
      if (item.variance < minVariance + stepVariance) {
        return "navy";
      } else if (item.variance < minVariance + 2 * stepVariance) {
        return "green";
      } else if (item.variance < minVariance + 3 * stepVariance) {
        return "orange";
      } else {
        return "red";
      }
    })

    .on("mouseover", (values, item) => {
        tooltip.transition().style("visibility", "visible");
        tooltip.text(
            "Año: "+
          item.year +
            " Mes Número: " +
            item.month +
            " Temperatura: " +
            (baseTemp+item.variance)
        )
        //.attr("data-year",item.Year);
        document.querySelector("#tooltip").setAttribute("data-year", item.year);
      })
  
      .on("mouseout", () => {
        tooltip.transition().style("visibility", "hidden");
      });

};

req.open("GET", url, true);
req.onload = function () {
  data = JSON.parse(req.responseText);
  values = data.monthlyVariance;
  baseTemp = data.baseTemperature;

  drawSvg();
  escalas();
  drawMap();
  generateAxes();
};
req.send();
