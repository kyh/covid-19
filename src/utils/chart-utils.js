import {
  line,
  area,
  scaleLinear,
  max,
  scaleTime,
  extent,
  axisBottom,
  axisLeft,
  bisector
} from 'd3';

export const createScales = (data, width, height, margin = {}) => {
  const x = scaleTime()
    .domain(extent(data, d => d.date))
    .nice()
    .range([margin.left, width - margin.right]);

  const y = scaleLinear()
    .domain([0, max(data, d => d.positive)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  return { x, y };
};

export const createAxis = (data, width, height, margin = {}, x, y) => {
  const xAxis = g =>
    g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .classed('x-axis', true)
      .call(
        axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );

  const yAxis = g =>
    g
      .attr('transform', `translate(${margin.left},0)`)
      .classed('y-axis', true)
      .call(axisLeft(y).tickSize(-width))
      .call(g => g.select('.domain').remove())
      .call(g =>
        g
          .select('.tick:last-of-type text')
          .clone()
          .attr('x', 3)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .text(data.y)
      );

  return { xAxis, yAxis };
};

export const createTooltipEvents = (data, x, y) => {
  const callout = (g, value) => {
    g.style('display', null)
      .style('pointer-events', 'none')
      .style('font-size', '10px');

    const path = g
      .selectAll('path')
      .data([null])
      .join('path')
      .attr('fill', 'white')
      .attr('stroke', '#a0aec0');

    const text = g
      .selectAll('text')
      .data([null])
      .join('text')
      .call(text =>
        text
          .selectAll('tspan')
          .data((value + '').split(/\n/))
          .join('tspan')
          .attr('x', 0)
          .attr('y', (_, i) => `${i * 1.1}em`)
          .text(d => d)
      );

    const { y, width: w, height: h } = text.node().getBBox();

    text.attr('transform', `translate(${-w / 2},${15 - y})`);
    path.attr(
      'd',
      `M${-w / 2 - 10},5H${w / 2 + 10} a3,3 0 0 1 3,3 v${h +
        15} a3,3 0 0 1 -3,3 h-${w + 20} a3,3 0 0 1 -3,-3 v-${h +
        15} a3,3 0 0 1 3,-3 z`
    );
  };

  const bisect = bisector(d => d.date).left;
  const onMouseEvent = mx => {
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

export const createLineFn = (x, y) => {
  const d3Line = line()
    .defined(d => !isNaN(d.positive))
    .x(d => x(d.date))
    .y(d => y(d.positive));

  const d3Area = area()
    .defined(d => !isNaN(d.positive))
    .x(d => x(d.date))
    .y0(y(0))
    .y1(d => y(d.positive));

  return { line: d3Line, area: d3Area };
};
