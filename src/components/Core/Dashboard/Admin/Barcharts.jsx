import React, { Component } from 'react';
import Chart from 'chart.js/auto';

class BarChart extends Component {
  chartRef = React.createRef();
  chartInstance = null;

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.destroyChart();
    this.buildChart();
  }

  componentWillUnmount() {
    this.destroyChart();
  }

  buildChart = () => {
    const myChartRef = this.chartRef.current.getContext("2d");

    this.chartInstance = new Chart(myChartRef, {
      type: 'bar',
      data: {
        labels: ['A', 'B', 'C', 'D', 'E', 'F'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  destroyChart = () => {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  };

  render() {
    return (
      <div>
        <canvas ref={this.chartRef}  className=' w-[269px] h-[300px] lg:w-[400px] lg:h-[200px]  ' />
      </div>
    );
  }
}

export default BarChart;
