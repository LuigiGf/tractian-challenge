import Highcharts from "highcharts";
import HighchartsGauge from "highcharts/modules/solid-gauge"
import highchartsMore from "highcharts/highcharts-more"
import HighchartsReact from "highcharts-react-official";

type gaugeProps = {
  title: string;
  seriesName: string;
  seriesSuffix: string;
  data: number | undefined;
}

highchartsMore(Highcharts);
HighchartsGauge(Highcharts);
export default function GaugeChart(props: gaugeProps) {
  //setUp GaugeChart
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'solidgauge'
    },
    title: {
      text: props.title
    },
    pane: {
      center: ['50%', '85%'],
      size: '140%',
      startAngle: -90,
      endAngle: 90,
    },

    exporting: {
      enabled: false
    },

    tooltip: {
      enabled: false
    },

    // the value axis
    yAxis: {
      stops: [
        [0.1, '#DF5353'], // green
        [0.5, '#DDDF0D'], // yellow
        [0.9, '#55BF3B'] // red
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      title: {
        y: -70
      },
      labels: {
        y: 16
      },
      min: 0,
      max: 100,
    },

    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true
        }
      }
    },
    credits: {
      enabled: false
    },
    series: [{
      name: props.seriesName,
      //@ts-ignore
      data: [props.data],
      dataLabels: {
        format:
          '<div style="text-align:center">' +
          '<span style="font-size:25px">{y}</span><br/>' +
          '<span style="font-size:22px;opacity:0.4">%</span>' +
          '</div>'
      },
      tooltip: {
        valueSuffix: " " + props.seriesSuffix
      }
    }]
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
    />
  );


}