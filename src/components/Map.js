import React, { useEffect, createRef } from "react";
import {
  select,
  geoPath,
  scaleLinear,
  scaleThreshold,
  range,
  schemeReds,
  axisBottom,
  json,
} from "d3";
import { stateIdToState } from "utils/map-utils";
import { appendSvg } from "utils/chart-utils";
import "./Map.css";
const topojson = require("topojson");

export const Map = ({ stateToData, totalPositives }) => {
  const container = createRef();

  useEffect(() => {
    const svg = appendSvg(container.current, 960, 600, "map");
    const path = geoPath();
    const x = scaleLinear().domain([0, 10]).rangeRound([650, 910]);

    const color = scaleThreshold().domain(range(0, 9)).range(schemeReds[9]);

    const g = svg
      .append("g")
      .attr("class", "key")
      .attr("transform", "translate(0,40)");

    g.selectAll("rect")
      .data(
        color.range().map((d) => {
          d = color.invertExtent(d);
          if (d[0] == null) d[0] = x.domain()[0];
          if (d[1] == null) d[1] = x.domain()[1];
          return d;
        })
      )
      .enter()
      .append("rect")
      .attr("height", 8)
      .attr("x", (d) => x(d[0]))
      .attr("width", (d) => x(d[1]) - x(d[0]))
      .attr("fill", (d) => color(d[0]));

    g.append("text")
      .attr("class", "caption")
      .attr("x", x.range()[0])
      .attr("y", -6)
      .attr("fill", "#9fa6b2")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text("Cases");

    g.call(
      axisBottom(x)
        .tickSize(13)
        .tickFormat((x, i) => (i ? x : x + "%"))
        .tickValues(color.domain())
    )
      .select(".domain")
      .remove();

    json("https://d3js.org/us-10m.v1.json").then(ready);

    function ready(us) {
      const tooltip = select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      svg
        .append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter()
        .append("path")
        .attr("fill", (d) => {
          const state = stateIdToState[d.id].code;
          const stateData = stateToData[state];
          const rate = stateData.positive / totalPositives;
          return color((d.rate = rate * 100));
        })
        .attr("d", path)
        .on("mouseover", (event, d) => {
          const state = stateIdToState[d.id].code;
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .html(`${state} - ${d.rate.toFixed(2)}%`)
            .style("left", `${event.pageX}px`)
            .style("top", `${event.pageY}px`);
        })
        .on("mouseout", () => {
          tooltip.transition().duration(200).style("opacity", 0);
        });
    }
  }, []);

  return <div ref={container} />;
};
