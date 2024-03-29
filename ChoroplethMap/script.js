const countyUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const educationUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

let countyData;
let educationData;

let canvas = d3.select("#canvas");
let tooltip=d3.select("#tooltip");

let drawMap = () => {
  canvas
    .selectAll("path")
    .data(countyData)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr("fill", (countyDataItem) => {
      let id = countyDataItem.id;
      let county = educationData.find((item) => {
        return item.fips === id;
      });
      let percentage = county.bachelorsOrHigher;
      if (percentage <= 15) {
        return "tomato";
      } else if (percentage <= 30) {
        return "orange";
      } else if (percentage <= 45) {
        return "lightgreen";
      } else {
        return "limegreen";
      }
    })
    .attr("data-fips", (countyDataItem) => countyDataItem.id)
    .attr("data-education", (countyDataItem) => {
      let id = countyDataItem.id;
      let county = educationData.find((item) => {
        return item.fips === id;
      });
      return county.bachelorsOrHigher;
    })

    .on("mouseover", (countyData, countyDataItem) => {
      tooltip.transition()
      .style("visibility", "visible");

        let id = countyDataItem.id;
        let county = educationData.find((item) => {
          return item.fips === id;
        })
        tooltip.text(county.fips+"-"+county.area_name+"-"+county.state+"-"+county.bachelorsOrHigher+"%");
      //.attr("data-education",county.bachelorsOrHigher);
      document.querySelector("#tooltip").setAttribute("data-education", county.bachelorsOrHigher);
    })

    .on("mouseout", () => {
      tooltip.transition().style("visibility", "hidden");
    });
};

d3.json(countyUrl).then((data, error) => {
  if (error) {
    console.log(log);
  } else {
    countyData = topojson.feature(data, data.objects.counties).features;
    console.log(countyData);

    d3.json(educationUrl).then((data, error) => {
      if (error) {
        console.log(log);
      } else {
        educationData = data;
        console.log(educationData);
        drawMap();
      }
    });
  }
});
