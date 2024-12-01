import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const CandleChartPro = ({indices}) => {
/* 
  console.log(indices) */
  
  
  useLayoutEffect(() => {
    if(indices?.length > 0) {
    // Create root element
    let root = am5.Root.new("chartdiv");

    //Ocultar el logo de Amcharts
    if (root._logo) {
      root._logo.dispose();
    }

    // Create a theme
    const myTheme = am5.Theme.new(root);
    myTheme.rule("Grid", ["scrollbar", "minor"]).setAll({
      visible: false,
    });

    // Set themes
    root.setThemes([
      am5themes_Animated.new(root),
      myTheme
    ]);

    // Generate chart data
    function generateChartData() {
      const chartData = indices.map(indice => ({
        date: new Date(indice.fecha + ' ' + indice.hora).getTime(),
        value: parseFloat(indice.valor),
        open: parseFloat(indice.valor), // Puedes ajustar esto si necesitas otro valor
        low: parseFloat(indice.valor) - 1, // Aquí puedes definir cómo calcular el low
        high: parseFloat(indice.valor) + 1 // Aquí puedes definir cómo calcular el high
      }));
      return chartData;
      }

    const data = generateChartData();
/*     console.log(data) */

    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        focusable: true,
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
      })
    );

    // Create axes
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.5,
        groupData: true,
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          pan: "zoom",
          minorGridEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {
          themeTags: ["axis"],
          animationDuration: 300,
        }),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
      })
    );

    let color = root.interfaceColors.get("background");

    // Add series
    let series = chart.series.push(
      am5xy.CandlestickSeries.new(root, {
        fill: color,
        calculateAggregates: true,
        stroke: color,
        name: "BME",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        openValueYField: "open",
        lowValueYField: "low",
        highValueYField: "high",
        valueXField: "date",
        lowValueYGrouped: "low",
        highValueYGrouped: "high",
        openValueYGrouped: "open",
        valueYGrouped: "close",
/*         legendValueText: "open: {openValueY} low: {lowValueY} high: {highValueY} close: {valueY}", */
        legendRangeValueText: "Valor: U$D{valueYClose}",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{name}\nopen: ${openValueY}\nlow: ${lowValueY}\nhigh: ${highValueY}\nclose: ${valueY}"
        })
      })
    );

    let series2 = chart.series.push(
        am5xy.CandlestickSeries.new(root, {
          fill: color,
          calculateAggregates: true,
          stroke: color,
          name: "Nasdaq",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          openValueYField: "open",
          lowValueYField: "low",
          highValueYField: "high",
          valueXField: "date",
          lowValueYGrouped: "low",
          highValueYGrouped: "high",
          openValueYGrouped: "open",
          valueYGrouped: "close",
/*           legendValueText: "open: {openValueY} low: {lowValueY} high: {highValueY} close: {valueY}", */
          legendRangeValueText: "Valor: U$D{valueYClose}",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "{name}\nopen: ${openValueY}\nlow: ${lowValueY}\nhigh: ${highValueY}\nclose: ${valueY}"
          })
        })
      );

    series.columns.template.get("themeTags").push("pro");
    series2.columns.template.get("themeTags").push("pro");

    // Add cursor
    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
      })
    );
    cursor.lineY.set("visible", false);

    // Stack axes vertically
    chart.leftAxesContainer.set("layout", root.verticalLayout);

    // Add scrollbar
    let scrollbar = am5xy.XYChartScrollbar.new(root, {
      orientation: "horizontal",
      height: 50,
    });
    chart.set("scrollbarX", scrollbar);

    let sbxAxis = scrollbar.chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        groupData: true,
        groupIntervals: [{ timeUnit: "week", count: 1 }],
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          opposite: false,
          strokeOpacity: 0,
          minorGridEnabled: true,
        }),
      })
    );

    let sbyAxis = scrollbar.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let sbseries = scrollbar.chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: sbxAxis,
        yAxis: sbyAxis,
        valueYField: "value",
        valueXField: "date",
      })
    );

    // Add legend
    let legend = yAxis.axisHeader.children.push(am5.Legend.new(root, {}));
    legend.data.push(series);
    legend.data.push(series2);

    legend.markers.template.setAll({
      width: 10,
    });

    legend.markerRectangles.template.setAll({
      cornerRadiusTR: 0,
      cornerRadiusBR: 0,
      cornerRadiusTL: 0,
      cornerRadiusBL: 0,
    });

    // Set data
    sbseries.data.setAll(data);
    series.data.setAll(data);
    series2.data.setAll(data);

    // Animate on load
    series.appear(1000);
    chart.appear(1000, 100);
  }
    // Clean up on component unmount
    return () => {
      root.dispose();
    };
  }, [indices]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default CandleChartPro;
