const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
let req = new XMLHttpRequest();
let values;
let svg = d3.select("svg");

function drawSvg(values) {
  const padding = 40;
  const width = 800;
  const height = 600;

  var ft = d3.timeFormat("%M:%S");
  var y = d3.timeFormat("%Y");

  const minDate = d3.min(values, (item) => item.Year);
  const maxDate = d3.max(values, (item) => item.Year);
  const minTime = d3.min(values, (item) => new Date(item.Seconds * 1000));
  const maxTime = d3.max(values, (item) => new Date(item.Seconds * 1000));
  console.log(minDate);
  console.log(maxDate);
  console.log(minTime);
  console.log(maxTime);

  //SVG

  svg
    .attr("width", width)
    .attr("height", height)
    //TITLE
    .append("text")
    .text("Dopping in Profesional Bycicle Racing")
    .attr("id", "title")
    .attr("x", "320")
    .attr("y", "50");

  let tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden")
    .style("width", "auto")
    .style("height", "auto");

  //SCALES

  var xScale = d3
    .scaleLinear()
    .domain([minDate - 1, maxDate + 1])
    .range([padding, width - padding]);

  var yScale = d3
    .scaleTime()
    .domain([maxTime, minTime])
    .range([height - padding, padding]);

  //AXIS

  let xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  svg
    .append("g")
    .attr("id", "x-axis")
    .call(xAxis)
    .attr("transform", "translate(0," + (height - padding) + ")");

  let yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));
  svg
    .append("g")
    .attr("id", "y-axis")
    .call(yAxis)
    .attr("transform", "translate(" + padding + ", 0)");

  //POINTS

  svg
    .selectAll("circle")
    .data(values)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("r", 5)
    .attr("data-xvalue", (d) => d.Year)
    .attr("data-yvalue", (d) => new Date(d.Seconds * 1000))
    .attr("cx", (d) => xScale(d.Year))
    .attr("cy", (d) => yScale(new Date(d.Seconds) * 1000))
    .attr("fill", (d) => (d.Doping != "" ? "red" : "green"))

    .on("mouseover", (values, item) => {
      tooltip.transition().style("visibility", "visible");
      tooltip.text(
        item.Year +
          " " +
          item.Name +
          " " +
          item.Time +
          " " +
          (item.Doping != "" ? item.Doping + "." : "No Allegations.")
      )
      //.attr("data-year",item.Year);
      document.querySelector("#tooltip").setAttribute("data-year", item.Year);
    })

    .on("mouseout", () => {
      tooltip.transition().style("visibility", "hidden");
    });
}

req.open("GET", url, true);
req.onload = function () {
  values = JSON.parse(req.responseText);
  console.log(values);
  drawSvg(values);
};
req.send();
