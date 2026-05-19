// referencing SeanSobey repo
const { ChartJSNodeCanvas, ChartCallback } = require("chartjs-node-canvas");
const { ChartConfiguration } = require("chart.js/auto");
const path = require("path");
const fs = require("fs");

const generateBarChart = async () => {
    const width = 400;
    const height = 400;

    const configuration = {
        type: "bar",
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: "votes",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  'rgba(0, 0, 0, 0.7)',
                  'rgba(0, 0, 0, 0.7)',
                  'rgba(0, 0, 0, 0.7)',
                  'rgba(0, 0, 0, 0.7)',
                  'rgba(0, 0, 0, 0.7)',
                  'rgba(0, 0, 0, 0.7)',
                ],
                borderColor: [
                  'rgba(0, 0, 0, 0.7)',
                  'rgba(0, 0, 0, 0.7)',
                  'rgba(0, 0, 0, 0.7)',
                  'rgba(0, 0, 0, 0.7)',
                  'rgba(0, 0, 0, 0.7)',
                  'rgba(0, 0, 0, 0.7)',
                ],
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
    await fs.writeFileSync('./chart-images/chart.png', buffer, 'base64');
};

module.exports = {
  generateBarChart
}