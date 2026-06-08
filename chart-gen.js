// referencing SeanSobey repo
const { ChartJSNodeCanvas, ChartCallback } = require("chartjs-node-canvas");
const { ChartConfiguration } = require("chart.js/auto");
const path = require("path");
const fs = require("fs");

// array of ints
const generateBarChart = async (data, label, filename) => {
    const width = 400;
    const height = 400;

    const configuration = {
        type: "bar",
        data: {
            labels: [...data.map(data => data.name)],
            datasets: [{
                label,
                data: [...data.map(data => data.interestFees)],
                backgroundColor: [...data.map(val => 'rgba(0, 0, 0, 0.7)')],
                borderColor: [...data.map(val => 'rgba(0, 0, 0, 0.7)')],
                borderWidth: 1
            }]
        },
        options: {},
        plugins: [{
          id: "background-colour",
          beforeDraw: (chart) => {
            const ctx = chart.ctx;
            ctx.save();
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
          }
        }]
    };

    const chartCallback = (ChartJS) => {
      ChartJS.defaults.responsive = true;
      ChartJS.defaults.maintainAspectRatio = false;
    };

    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });
    const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
    await fs.writeFileSync(`./chart-images/${filename}.png`, buffer, 'base64');
};

const toZero = num => num < 0 ? 0 : num;

const generatePieChart = async (data, label, filename) => {
  const width = 400;
  const height = 400;

  const configuration = {
      type: "pie",
      data: {
          labels: [
            `${parseFloat((data[1] - data[0])).toLocaleString('en-US', {style: 'currency', currency: 'USD'})} available`,
            `${parseFloat(data[0]).toLocaleString('en-US', {style: 'currency', currency: 'USD'})} total credit line`
          ],
          datasets: [{
              label,
              data: [toZero(data[1] - data[0]), data[0]],
              backgroundColor: ['rgba(123, 255, 0, 0.7)', 'rgba(229, 5, 5, 0.7)'],
              borderColor: ['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.7)'],
              borderWidth: 1
          }]
      },
      options: {},
      plugins: [{
        id: "background-colour",
        beforeDraw: (chart) => {
          const ctx = chart.ctx;
          ctx.save();
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        }
      }]
  };

  const chartCallback = (ChartJS) => {
    ChartJS.defaults.responsive = true;
    ChartJS.defaults.maintainAspectRatio = false;
  };

  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });
  const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
  await fs.writeFileSync(`./chart-images/${filename}.png`, buffer, 'base64');
};

module.exports = {
  generateBarChart,
  generatePieChart
}