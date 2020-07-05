
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import theme, { pxToRem } from '../utils/theme';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const styles = (theme) => ({
    card: {
      padding: "6px 0px 0px 10px",
     
    },
  });
  
  const options = {
    chart: {
      type: "bar",
      backgroundColor:'#29465B'
    },
    title: {
      text: "Total Open Amount by Country Code",
    },
    subtitle: {
      text: "1706431",
      style: {
        color: "#645F5F",
        fontWeight: "bold",
      },
    },
    xAxis: {
      categories: ["USA", "CAN", "INDIA", "UK"],
      title: {
        text: "Transmission Type",
        style: {
          color: "#645F5F",
          fontWeight: "bold",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Count",
        style: {
          color: "#645F5F",
          fontWeight: "bold",
        },
      },
    },
    tooltip: {
      valueSuffix: " cases",
    },
    credits:{
        enabled:false,
  
    },
    legend: {
      layout: "vertical",
  
      align: "center",
  
      enable: false,
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              console.log("data");
            },
          },
        },
      },
    },
    series: [
      {
        data: [1, 2, 3, 4],
        color: "#6699CC",
      },
    ],
  };
  class Analytic extends Component{
    render(){    
        return(
            <HighchartsReact
            
          highcharts={Highcharts}
          constructorType={"chart"}
          options={options}
        />
        );

    }
}
export default withStyles(styles, { withTheme: true })(Analytic);

