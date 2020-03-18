import React, { useEffect, createRef } from 'react';
import { format } from 'date-fns';
import {
  line,
  bisector,
  select,
  scaleLinear,
  max,
  scaleTime,
  extent,
  axisBottom,
  axisLeft,
  mouse
} from 'd3';

export const LineChart = ({ data = [] }) => {
  const container = createRef();

  useEffect(() => {
    // set the dimensions and margins of the graph
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = container.current.offsetWidth;
    const height = 400;

    if (data.length) {
      const x = scaleTime()
        .domain(extent(data, d => d.date))
        .nice()
        .range([margin.left, width - margin.right]);

      const y = scaleLinear()
        .domain([0, max(data, d => d.positive)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      const xAxis = g =>
        g.attr('transform', `translate(0,${height - margin.bottom})`).call(
          axisBottom(x)
            .ticks(width / 80)
            .tickSizeOuter(0)
        );

      const yAxis = g =>
        g
          .attr('transform', `translate(${margin.left},0)`)
          .call(axisLeft(y))
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

      const callout = (g, positive) => {
        if (!positive) return g.style('display', 'none');

        g.style('display', null)
          .style('pointer-events', 'none')
          .style('font', '10px sans-serif');

        const path = g
          .selectAll('path')
          .data([null])
          .join('path')
          .attr('fill', 'white')
          .attr('stroke', 'black');

        const text = g
          .selectAll('text')
          .data([null])
          .join('text')
          .call(text =>
            text
              .selectAll('tspan')
              .data((positive + '').split(/\n/))
              .join('tspan')
              .attr('x', 0)
              .attr('y', (_, i) => `${i * 1.1}em`)
              .style('font-weight', (_, i) => (i ? null : 'bold'))
              .text(d => d)
          );

        const { y, width: w, height: h } = text.node().getBBox();

        text.attr('transform', `translate(${-w / 2},${15 - y})`);
        path.attr('d', `M${-w / 2 - 10},5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
      };

      const d3bisect = () => {
        const bisect = bisector(d => d.date).left;
        return mx => {
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
      };

      const d3line = line()
        .defined(d => !isNaN(d.positive))
        .x(d => x(d.date))
        .y(d => y(d.positive));

      const svg = select(container.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      svg.append('g').call(xAxis);
      svg.append('g').call(yAxis);
      svg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', d3line);

      const tooltip = svg.append('g');

      svg.on('touchmove mousemove', function() {
        const b = d3bisect();
        const { date, positive } = b(mouse(this)[0]);
        if (date && positive) {
          tooltip
            .attr('transform', `translate(${x(date)},${y(positive)})`)
            .call(callout, `${format(date, 'MM/dd')} - ${positive}`);
        }
      });

      svg.on('touchend mouseleave', () => tooltip.call(callout, null));
    }
  }, [data.length]);

  return <div ref={container} />;
};