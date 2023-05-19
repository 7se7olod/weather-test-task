import {ChartOptions} from "../../types/chart-options.type";

export const DEFAULT_CHART_OPTIONS: ChartOptions = {
  series: [
    {
      name: "My-series",
      data: [],
    }
  ],
    chart: {
  height: 350,
    type: "bar"
},
  title: {
    text: "График погоды"
  },
  xaxis: {
    categories: ['100', '200', '300', '400', '500']
  },

}
