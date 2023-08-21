const url =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
let data;
let kickData = [];
let tooltip = d3.select("#tooltip");

const width = 1000;
const height = 600;

let canvas = d3.select("#canvas");
let container = d3.select("#container");
let legend = d3.select("#legend").attr("width", "300").attr("height", "380");

let drawSvg = () => {
  canvas.attr("width", width).attr("height", height);
};

let drawMap = () => {
  let hierarchy = d3
    .hierarchy(kickData, (node) => {
      return node.children;
    })
    .sum((node) => {
      return node["value"];
    })
    .sort((node1, node2) => {
      return node2.value - node1.value;
    });

  let createTreeMap = d3.treemap().size([1000, 600]);

  createTreeMap(hierarchy);

  let kickTiles = hierarchy.leaves();
  console.log(kickTiles);

  let block = canvas
    .selectAll("g")
    .data(kickTiles)
    .enter()
    .append("g")
    .attr("transform", (kick) => "translate(" + kick.x0 + ", " + kick.y0 + ")");

  block
    .append("rect")
    .attr("class", "tile")
    .attr("fill", (kick) => {
      let category = kick.data.category;
      if (
        category === "Product Design" ||
        category === "Games" ||
        category === "Drinks"
      ) {
        return "green";
      } else if (category === "Tabletop Games" || category === "3D Printing") {
        return "blue";
      } else if (category === "Gaming Hardware" || category === "Technology") {
        return "orange";
      } else if (category === "Video Games" || category === "Wearables") {
        return "pink";
      } else if (category === "Sound" || category === "Sculpture") {
        return "brown";
      } else if (category === "Television" || category === "Apparel") {
        return "navy";
      } else if (category === "Narrative Film" || category === "Food") {
        return "tomato";
      } else if (category === "Web" || category === "Art") {
        return "yellow";
      } else if (category === "Hardware" || category === "Gadgets") {
        return "lightgrey";
      }
    })
    .attr("data-name", (kick) => {
      return kick.data.name;
    })
    .attr("data-category", (kick) => {
      return kick.data.category;
    })
    .attr("data-value", (kick) => {
      return kick.data.value;
    })
    .attr("width", (kick) => kick.x1 - kick.x0)
    .attr("height", (kick) => kick.y1 - kick.y0);

  block
    .append("text")
    .text((kick) => kick.data.name)
    .attr("x", 5)
    .attr("y", 15);

    block.on("mouseover", (kickData, item) => {
      tooltip.transition().style("visibility", "visible");
      tooltip.text(
        "Name: " +
          item.data.name +
          " Category: " +
          item.data.category +
          " Revenue: $" +
          item.data.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      )
      .attr("data-value",item.data.value);
    })

    .on("mouseout", () => {
      tooltip.transition().style("visibility", "hidden");
    });
};

d3.json(url).then((data, error) => {
  if (error) {
    console.log(log);
  } else {
    kickData = data;
    console.log(kickData);
    drawSvg();
    drawMap();
  }
});