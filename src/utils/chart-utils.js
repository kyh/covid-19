import {
  line,
  area,
  scaleLinear,
  max,
  scaleTime,
  timeParse,
  extent,
  axisBottom,
  axisLeft,
  bisector,
  select,
} from "d3";

export const createScales = (data, width, height, margin = {}) => {
  const x = scaleTime()
    .domain(extent(data, (d) => d.date))
    .nice()
    .rangeRound([margin.left, width - margin.right]);

  const y = scaleLinear()
    .domain([0, max(data, (d) => d.positive)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  return { x, y };
};

export const createAxis = (width, x, y) => {
  const xAxis = axisBottom(x)
    .tickArguments([width / 80, timeParse("%m/%d")])
    .tickSizeOuter(0);

  const yAxis = axisLeft(y).tickSize(-width);

  return { xAxis, yAxis };
};

export const createLineFn = (x, y) => {
  const d3Line = line()
    .defined((d) => !isNaN(d.positive))
    .x((d) => x(d.date))
    .y((d) => y(d.positive));

  const d3Area = area()
    .defined((d) => !isNaN(d.positive))
    .x((d) => x(d.date))
    .y0(y(0))
    .y1((d) => y(d.positive));

  return { line: d3Line, area: d3Area };
};

export const createTooltipEvents = (data, x, y) => {
  const callout = (g, value) => {
    g.style("display", null)
      .style("pointer-events", "none")
      .style("font-size", "10px");

    const path = g
      .selectAll("path")
      .data([null])
      .join("path")
      .attr("fill", "white")
      .attr("stroke", "#a0aec0");

    const text = g
      .selectAll("text")
      .data([null])
      .join("text")
      .call((text) =>
        text
          .selectAll("tspan")
          .data((value + "").split(/\n/))
          .join("tspan")
          .attr("x", 0)
          .attr("y", (_, i) => `${i * 1.1}em`)
          .text((d) => d)
      );

    const { y, width: w, height: h } = text.node().getBBox();

    text.attr("transform", `translate(${-w / 2},${15 - y})`);
    path.attr(
      "d",
      `M${-w / 2 - 10},5H${w / 2 + 10} a3,3 0 0 1 3,3 v${
        h + 15
      } a3,3 0 0 1 -3,3 h-${w + 20} a3,3 0 0 1 -3,-3 v-${
        h + 15
      } a3,3 0 0 1 3,-3 z`
    );
  };

  const bisect = bisector((d) => d.date).left;
  const onMouseEvent = (mx) => {
    const date = x.invert(mx);
    const index = bisect(data, date, 1);
    const a = data[index - 1];
    const b = data[index];
    if (a && b) {
      return date - a.date > b.date - date ? b : a;
    } else {
      return {};
    }
  };

  return { callout, onMouseEvent };
};

export const appendSvg = (container, width, height) => {
  const svg = select(container)
    .append("svg")
    .attr("class", "chart")
    .attr("width", width)
    .attr("height", height);

  return svg;
};

export const appendDefs = (svg) => {
  const defs = svg.append("defs");

  const gradient = defs
    .append("linearGradient")
    .attr("id", "svgGradient")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("y1", "0%")
    .attr("y2", "100%");

  gradient
    .append("stop")
    .attr("class", "start")
    .attr("offset", "0%")
    .attr("stop-color", "#f56565")
    .attr("stop-opacity", 1);

  gradient
    .append("stop")
    .attr("class", "end")
    .attr("offset", "80%")
    .attr("stop-color", "white")
    .attr("stop-opacity", 1);

  return defs;
};

export const appendTooltip = (svg) => {
  let tooltip = svg.select(".cursor-tooltip");
  let point = svg.select(".cursor-point");
  let cursorLine = svg.select(".cursor-line");

  if (tooltip.empty()) {
    cursorLine = svg
      .append("line")
      .style("display", "none")
      .attr("class", "cursor-line")
      .attr("stroke", "black");
    point = svg
      .append("circle")
      .style("display", "none")
      .attr("class", "cursor-point")
      .attr("r", 3);
    tooltip = svg.append("g").attr("class", "cursor-tooltip");
  }

  return { tooltip, point, cursorLine };
};
