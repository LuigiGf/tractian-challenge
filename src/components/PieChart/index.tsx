import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type pieChartProps = {
  title: string;
  dataName: string;
  data: {
    name: string;
    y: number;
    color: string;
  }[]
}

export default function PieChart(props: pieChartProps) {

  //setUp PieChart
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: props.title
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    //@ts-ignore
    series: [{
      name: props.dataName,
      colorByPoint: true,
      data: props.data
    }]
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      className="pieChartGraph"
    />
  );
}