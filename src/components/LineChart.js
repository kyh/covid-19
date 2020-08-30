import React, { useEffect, createRef } from 'react';
import { format } from 'date-fns';
import { select, pointer } from 'd3';
import {
  createScales,
  createAxis,
  createTooltipEvents,
  createLineFn,
  appendSvg,
  appendDefs,
  appendTooltip
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
      right: 0,
      bottom: 30,
      left: 30,
      ...mergedOptions.margin
    };
    const width = mergedOptions.width || container.current.offsetWidth;
    const height = mergedOptions.height || 300;

    if (data.length) {
      const { x, y } = createScales(data, width, height, margin);
      const { xAxis, yAxis } = createAxis(width, x, y);
      const { line, area } = createLineFn(x, y);
      let svg = select(container.current).select('.chart');

      if (svg.empty()) {
        svg = appendSvg(container.current, width, height);
        appendDefs(svg);
      }

      if (mergedOptions.xAxis) {
        const xAxisSvg = svg.selectAll('.x-axis');
        if (xAxisSvg.empty()) {
          svg
            .append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .attr('class', 'x-axis')
            .call(xAxis);
        } else {
          xAxisSvg
            .transition()
            .duration(1500)
            .call(xAxis);
        }
      }

      if (mergedOptions.yAxis) {
        const yAxisSvg = svg.selectAll('.y-axis');
        if (yAxisSvg.empty()) {
          svg
            .append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .attr('class', 'y-axis')
            .call(yAxis)
            .call(g => g.select('.domain').remove());
        } else {
          yAxisSvg
            .transition()
            .duration(1500)
            .call(yAxis)
            .call(g => g.select('.domain').remove());
        }
      }

      const valueArea = svg.selectAll('.growth-background').data([data]);
      valueArea.exit().remove();
      valueArea
        .enter()
        .append('path')
        .attr('class', 'growth-background')
        .attr('fill', 'url(#svgGradient)')
        .attr('d', area)
        .merge(valueArea)
        .transition()
        .duration(1500)
        .attr('d', area);

      const valueLine = svg.selectAll('.growth-line').data([data]);
      valueLine.exit().remove();
      valueLine
        .enter()
        .append('path')
        .attr('class', 'growth-line')
        .attr('fill', 'none')
        .attr('stroke-width', 1.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', line)
        .merge(valueLine)
        .transition()
        .duration(1500)
        .attr('d', line);

      if (mergedOptions.tooltip) {
        const { onMouseEvent, callout } = createTooltipEvents(data, x, y);
        const { tooltip, point, cursorLine } = appendTooltip(svg);

        svg.on('touchmove mousemove', (event) => {
          const { date, positive } = onMouseEvent(pointer(event)[0]);
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
  }, [data]);

  return <div ref={container} />;
};
