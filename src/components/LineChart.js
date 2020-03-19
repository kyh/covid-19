import React, { useEffect, createRef } from 'react';
import { format } from 'date-fns';
import { select, mouse } from 'd3';
import {
  createScales,
  createAxis,
  createTooltipEvents,
  createLineFn
} from 'utils/chart-utils';
import './LineChart.css';

const defaultOptions = {
  margin: {
    top: 20,
    right: 30,
    bottom: 30,
    left: 40
  },
  tooltip: true,
  xAxis: true,
  yAxis: true
};

export const LineChart = ({ data = [], options = defaultOptions }) => {
  const container = createRef();

  useEffect(() => {
    const mergedOptions = { ...defaultOptions, ...options };
    // set the dimensions and margins of the graph
    const margin = {
      top: 20,
      right: 30,
      bottom: 30,
      left: 40,
      ...mergedOptions.margin
    };
    const width = mergedOptions.width || container.current.offsetWidth;
    const height = mergedOptions.height || 300;

    if (data.length) {
      const { x, y } = createScales(data, width, height, margin);
      const { xAxis, yAxis } = createAxis(data, width, height, margin, x, y);
      const { line, area } = createLineFn(x, y);

      const svg = select(container.current)
        .append('svg')
        .classed('chart', true)
        .attr('width', width)
        .attr('height', height);

      const defs = svg.append('defs');

      const gradient = defs
        .append('linearGradient')
        .attr('id', 'svgGradient')
        .attr('x1', '0%')
        .attr('x2', '100%')
        .attr('y1', '0%')
        .attr('y2', '100%');

      gradient
        .append('stop')
        .attr('class', 'start')
        .attr('offset', '0%')
        .attr('stop-color', '#f56565')
        .attr('stop-opacity', 1);

      gradient
        .append('stop')
        .attr('class', 'end')
        .attr('offset', '80%')
        .attr('stop-color', 'white')
        .attr('stop-opacity', 1);

      if (mergedOptions.xAxis) {
        svg.append('g').call(xAxis);
      }
      if (mergedOptions.yAxis) {
        svg.append('g').call(yAxis);
      }
      svg
        .append('path')
        .classed('growth-background', true)
        .datum(data)
        .attr('fill', 'url(#svgGradient)')
        .attr('d', area);
      svg
        .append('path')
        .classed('growth-line', true)
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke-width', 1.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', line);

      const point = svg
        .append('circle')
        .style('display', 'none')
        .classed('cursor-point', true)
        .attr('r', 3);
      const cursorLine = svg
        .append('line')
        .style('display', 'none')
        .classed('cursor-line', true)
        .attr('stroke', 'black');

      if (mergedOptions.tooltip) {
        const { onMouseEvent, callout } = createTooltipEvents(data, x, y);
        const tooltip = svg.append('g').classed('cursor-tooltip', true);

        svg.on('touchmove mousemove', function() {
          const { date, positive } = onMouseEvent(mouse(this)[0]);
          if (date && positive) {
            tooltip
              .attr('transform', `translate(${x(date)},${0})`)
              .call(callout, `${format(date, 'MM/dd')} - ${positive}`);
            cursorLine
              .style('display', null)
              .attr('y1', 0)
              .attr('x1', x(date))
              .attr('y2', height - margin.bottom)
              .attr('x2', x(date));
            point
              .style('display', null)
              .attr('cx', x(date))
              .attr('cy', y(positive));
          }
        });

        svg.on('touchend mouseleave', () => {
          tooltip.style('display', 'none');
          point.style('display', 'none');
          cursorLine.style('display', 'none');
        });
      }
    }
  }, [data.length]);

  return <div ref={container} />;
};
