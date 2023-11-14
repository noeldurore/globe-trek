/*
   Filename: complexCode.js
   Description: This code demonstrates a complex web application that calculates Fibonacci series using memoization and visualizes the results in a graph.
*/

// Helper function to calculate Fibonacci series using memoization
function fibonacci(n, memo={}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo);
  return memo[n];
}

// Generate Fibonacci series
const fibonacciSeries = [];
for (let i = 1; i <= 20; i++) {
  fibonacciSeries.push(fibonacci(i));
}

// Create a canvas element for graph
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 400;
document.body.appendChild(canvas);
const context = canvas.getContext('2d');

// Function to draw the graph
function drawGraph() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw x-axis and y-axis
  context.beginPath();
  context.moveTo(50, 50);
  context.lineTo(50, 350);
  context.moveTo(50, 350);
  context.lineTo(750, 350);
  context.strokeStyle = '#000000';
  context.lineWidth = 2;
  context.stroke();
  
  // Calculate maximum value in the Fibonacci series
  const maxFibonacci = Math.max(...fibonacciSeries);
  const range = maxFibonacci - 1;
  
  // Calculate scale factors
  const xScale = (canvas.width - 100) / fibonacciSeries.length;
  const yScale = (canvas.height - 100) / range;
  
  // Plot the Fibonacci series on graph
  context.beginPath();
  context.moveTo(50, canvas.height - ((fibonacciSeries[0] - 1) * yScale + 50));
  for (let i = 1; i < fibonacciSeries.length; i++) {
    const x = 50 + i * xScale;
    const y = canvas.height - ((fibonacciSeries[i] - 1) * yScale + 50);
    context.lineTo(x, y);
  }
  context.strokeStyle = '#FF0000';
  context.lineWidth = 2;
  context.stroke();
  
  // Label the x-axis
  context.font = '16px Arial';
  context.fillStyle = '#000000';
  for (let i = 1; i < fibonacciSeries.length; i += 2) {
    const x = 50 + i * xScale;
    context.fillText(i.toString(), x, canvas.height - 30);
  }
  
  // Label the y-axis
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  for (let i = 1; i <= range; i += range / 4) {
    const y = canvas.height - (i * yScale + 50);
    context.fillText(i.toString(), 25, y);
  }
}

// Call drawGraph function when the window loads
window.addEventListener('load', drawGraph);