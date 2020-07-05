import React, { Component } from "react";

//import CollectorDashboard from "../views/CollectorDashboard";
import HighchartsReact from "highcharts-react-official";
import crossfilter from "crossfilter2";
import Grid from '@material-ui/core/Grid';
import theme, { pxToVh } from '../utils/theme';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import axios from "axios";
import Highcharts from "highcharts";

import Paper from '@material-ui/core/Paper';
require("highcharts/modules/map")(Highcharts);
var totalcustgrp, dim, totalopenar, totavgday, totoinvoice;
var tot = [];
var cards, cards2,custcount;

function preparedataforhighcharts(groups) {
  var categories = [];
  var data = [];
  var gdata = groups.top(Infinity);

  gdata.forEach((d) => {
    categories.push(d.key);
    data.push(d.value);
  });
  return {
    categories: categories,
    data: data,
  };
}

class Analytic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          height: "2000",
          renderTo: "container",
          type: "bar",
          backgroundColor: "transparent",
        },
        title: {
          text: "Total Amount By Company Code",
          style: {
            color: "white",
            fontSize: "1.25rem",
            fontWeight: "bold",
            textAlign: "left",
          },
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          categories: tot.categories,

          crosshair: false,
          
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            point: {
              events: {
                click: function () {
                  this.select(null, true);
                  var selectedpoints = this.series.chart.getSelectedPoints();
                  var filteredpoints = [];
                  for (let index = 0; index < selectedpoints.length; index++) {
                    filteredpoints.push(selectedpoints[index].category);
                  }
                  function multivalue_filter(values) {
                    return function (f) {
                      return values.indexOf(f) !== -1;
                    };
                  }
                  if (filteredpoints.length > 0) {
                    dim.filterFunction(multivalue_filter(filteredpoints));
                  } else {
                    dim.filterAll();
                  }

                  
                  debugger;
                 
                },
              },
            },
          },
        },

        yAxis: {
          visible: false,
          title: {
            text: null,
          },
        },
        tooltip: {
          enabled: false,
        },

        series: [
          {
            showInLegend: false,
            dataGrouping: {
              enabled: false,
            },
            data: tot.data,
          },
        ],
      },
    };
  }

  componentWillMount() {
    axios
      .get("http://localhost:8080/1706431/PopulateTable")
      .then((res) => {
        var customer = res.data;

        var cors = crossfilter(customer);
        console.log("data", customer);
        dim = cors.dimension((d) => d.business_code);
        var pgroup = dim.group().reduceSum((d) => d.paid_amount);
        
        console.log(pgroup);

        const custdim = cors.dimension((d) => d.customer_name);
        const group = custdim.group().reduceCount();

        function customercount(value){
            var data = value.all();
           
            var count = 0;
            for(var i = 0; i<data.length; i++){
                if (data[i].value < 1){
                    continue;
                }
                count++;
            }
            return count;

        }
         custcount = customercount(group);

       

        cards = cors.groupAll().reduce(

          function (p, v) {
            return {
              count: 0,
              card1: 0,
              card2: "",
              card3: 0,
              card4: 0,
             
            };
          },
          function (n, v) {
            ++n.count;
            n.card1 += v.actual_open_amount;
            n.card2 = v.customer_name;
            n.card3 += v.dayspast_due / 50012;
            n.card4 += v.isOpen == 0;
            return n;
          },
          function (n, v) {
            --n.count;
            n.card1 -= v.actual_open_amount;
            n.card2 = v.customer_name;
            n.card3 -= v.dayspast_due;
            n.card4 -= v.isOpen == 0;
            return n;
          }
          
        );

       
        tot = preparedataforhighcharts(pgroup);
      

        this.setState({
          options: {
            xAxis: { categories: tot.categories },
            series: [{ data: tot.data }],
          },
        });
      });
  }
  render() {
    return (
      <div style={{ height: "100%", overflowX: "scroll", overflowY: "scroll" }}>
        <HighchartsReact autoid="companycode-chart" options={this.state.options} highcharts={Highcharts} />
        
      </div>
    );
  }
}
export default Analytic;
