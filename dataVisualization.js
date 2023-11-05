Filename: dataVisualization.js

/**
 * This code demonstrates a complex data visualization using D3.js library.
 * It visualizes a scatter plot of randomly generated data points with interactivity.
 * The scatter plot includes axes, labels, tooltips, and zooming functionality.
 */
 
// Constants
const width = 800;  // Width of the visualization
const height = 400; // Height of the visualization
const margin = { top: 20, right: 20, bottom: 30, left: 50 }; // Margins of the visualization

// Generate random data
const data = Array.from({ length: 100 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  radius: Math.random() * 10
}));

// Create the SVG container
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Add a rectangle as the background
svg
  .append("rect")
  .attr("width", width)
  .attr("height", height)
  .attr("fill", "transparent")
  .on("click", resetZoom); // Reset zoom on click

// Create X scale
const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, d => d.x)])
  .range([margin.left, width - margin.right]);

// Create Y scale
const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, d => d.y)])
  .range([height - margin.bottom, margin.top]);

// Create color scale
const colorScale = d3
  .scaleSequential()
  .interpolator(d3.interpolateBlues)
  .domain([0, d3.max(data, d => d.radius)]);

// Create radius scale
const radiusScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, d => d.radius)])
  .range([2, 20]);

// Create X axis
const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

// Create Y axis
const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

// Append X axis to the SVG
const xAxisElement = svg
  .append("g")
  .attr("transform", `translate(0, ${height - margin.bottom})`)
  .call(xAxis);

// Append Y axis to the SVG
const yAxisElement = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, 0)`)
  .call(yAxis);

// Add X axis label
svg
  .append("text")
  .attr("x", width / 2)
  .attr("y", height - margin.bottom / 2)
  .text("X Axis")
  .attr("text-anchor", "middle")
  .attr("fill", "black");

// Add Y axis label
svg
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("y", margin.left / 2)
  .text("Y Axis")
  .attr("text-anchor", "middle")
  .attr("fill", "black");

// Add data points to the scatter plot
svg
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.x))
  .attr("cy", d => yScale(d.y))
  .attr("r", d => radiusScale(d.radius))
  .attr("fill", d => colorScale(d.radius))
  .on("mouseover", showTooltip)
  .on("mouseout", hideTooltip);

// Update the scatter plot with zooming functionality
svg.call(
  d3
    .zoom()
    .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]])
    .scaleExtent([1, 8])
    .on("zoom", handleZoom)
);

// Function to handle zooming and update axes
function handleZoom() {
  const transform = d3.event.transform;

  // Update X and Y scales with new zooming and translation
  const newXScale = transform.rescaleX(xScale);
  const newYScale = transform.rescaleY(yScale);

  // Update X and Y axes based on new scales
  xAxisElement.call(xAxis.scale(newXScale));
  yAxisElement.call(yAxis.scale(newYScale));

  // Update data points with new scales and translation
  svg
    .selectAll("circle")
    .attr("cx", d => newXScale(d.x))
    .attr("cy", d => newYScale(d.y))
    .attr("r", d => radiusScale(d.radius) / transform.k);
}

// Function to reset zoom
function resetZoom() {
  svg.transition().call(d3.zoom().transform, d3.zoomIdentity);
}

// Function to show tooltip on mouseover
function showTooltip(d) {
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("pointer-events", "none")
    .style("opacity", 0)
    .html(`<strong>X:</strong> ${d.x}<br><strong>Y:</strong> ${d.y}`)
    .style("left", `${d3.event.pageX}px`)
    .style("top", `${d3.event.pageY}px`);

  tooltip
    .transition()
    .style("opacity", 1)
    .style("pointer-events", "auto");
}

// Function to hide tooltip on mouseout
function hideTooltip() {
  d3
    .select(".tooltip")
    .transition()
    .style("opacity", 0)
    .style("pointer-events", "none")
    .remove();
}