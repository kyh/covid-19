import React, { useEffect, createRef } from 'react';
import {
  line,
  select,
  scaleLinear,
  max,
  scaleTime,
  extent,
  axisBottom,
  axisLeft
} from 'd3';

export const LineChart = ({ data = [] }) => {
  const container = createRef();

  useEffect(() => {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = select(container.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Add X axis --> it is a date format
    const x = scaleTime()
      .domain(extent(data, d => d.date))
      .range([0, width]);

    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(axisBottom(x));

    // Add Y axis
    const y = scaleLinear()
      .domain([0, max(data, d => +d.value)])
      .range([height, 0]);
    svg.append('g').call(axisLeft(y));

    // Add the line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        line()
          .x(d => x(d.date))
          .y(d => y(d.value))
      );
  }, []);

  return <div ref={container} />;
};
