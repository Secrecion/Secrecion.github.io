// Variables
let url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
let req = new XMLHttpRequest();
let data;
let values;

let yScale;
let xScale;
let xAxisScale;
let yAxisScale;

const width = 800;
const height = 600;
const padding = 40;

let svg = d3.select("svg");

//Funciones

function drawSvg() {
  svg
    .attr("width", width)
    .attr("height", height)
    //Agregar Titulo
    .append("text")
    .text("USA GDP (1947-2015)")
    .attr("id", "title")
    .attr("x", "320")
    .attr("y", "50");
}

function escalas() {
  yScale = d3.scaleLinear()
  .domain([0, d3.max(values,(item)=>item[1])])
  .range([0, height-(2*padding)]);

  xScale=d3.scaleLinear()
  .domain([0, values.length-1])
  .range([padding, width - padding]);

  let dateArray = values.map((item) => {
    return new Date(item[0]);
  });

  console.log(dateArray);

  xAxisScale = d3
    .scaleTime()
    .domain([d3.min(dateArray), d3.max(dateArray)])
    .range([padding, width - padding]);

  yAxisScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(values, (item) => {
        return item[1];
      }),
    ])
    .range([height - padding, padding]);
}

function generateAxes() {
  let xAxis = d3.axisBottom(xAxisScale);
  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis);

  let yAxis = d3.axisLeft(yAxisScale);
  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);
}

function drawBars() {

    let tooltip=d3.select('body')
    .append('div')
    .attr('id','tooltip')
    .style('visibility', 'hidden')
    .style('width','auto')
    .style('height', 'auto');

svg.selectAll("rect")
.data(values)
.enter()
.append("rect")
.attr("class","bar")
.attr("data-date",(item)=>item[0])
.attr("data-gdp",(item)=>item[1])
.attr("width",(width-(2*padding))/values.length)
.attr("height",(item)=>yScale(item[1]))
.attr("x",(item,i)=>xScale(i))
.attr("y",(item)=>(height-padding)-yScale(item[1]))

.on('mouseover', (values, item)=>{
tooltip.transition()
.style("visibility","visible")

tooltip.text(item[0])

document.querySelector('#tooltip').setAttribute('data-date',item[0])
})

.on('mouseout',()=>{
tooltip.transition()
.style("visibility","hidden")
})

}

//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// Http Request

// d3.json(url,
// function(data){
//     values=data.data;
//     drawSvg();
//   escalas(values);
//   drawBars(values);
//   generateAxes();
//  });

req.open("GET", url, true);
req.onload = function () {
  data = JSON.parse(req.responseText);
  values = data.data;
  console.log(values);
  drawSvg();
  escalas();
  drawBars();
  generateAxes();
};
req.send();
