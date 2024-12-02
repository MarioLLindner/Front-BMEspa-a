import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const CandleChartProEmpresas = ({ divID, cotizaciones }) => {
  useLayoutEffect(() => {
    // Create root element
    let root = am5.Root.new(divID);

    const myTheme = am5.Theme.new(root);
    myTheme.rule("Grid", ["scrollbar", "minor"]).setAll({
      visible: false
    });

    root.setThemes([
      am5themes_Animated.new(root),
      myTheme
    ]);

    // Prepare the data from cotizaciones
    const chartData = cotizaciones.map(cotizacion => ({
      date: new Date(cotizacion.fecha + ' ' + cotizacion.hora).getTime(),
      value: parseFloat(cotizacion.cotizacion),
      open: parseFloat(cotizacion.cotizacion), // Puedes ajustar esto si necesitas otro valor
      low: parseFloat(cotizacion.cotizacion) - 1, // Aquí puedes definir cómo calcular el low
      high: parseFloat(cotizacion.cotizacion) + 1 // Aquí puedes definir cómo calcular el high
    }));

    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        focusable: true,
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0
      })
    );

    // Create axes
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.5,
        groupData: true,
        baseInterval: { timeUnit: "hour", count: 1 }, // Cambia esto si necesitas agrupar por día
        renderer: am5xy.AxisRendererX.new(root, {
          pan: "zoom",
          minorGridEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {
          themeTags: ["axis"],
          animationDuration: 300
        })
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      fontSize:30, 
    });

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" })
      })
    );

    yAxis.get("renderer").labels.template.setAll({
      fontSize:30, 
    });


    // Add series
    let series = chart.series.push(
      am5xy.CandlestickSeries.new(root, {
        name: divID,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        openValueYField: "open",
        lowValueYField: "low",
        highValueYField: "high",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "open: {openValueY}\nlow: {lowValueY}\nhigh: {highValueY}\nclose: {valueY}",
          }),
        })
      
    );


   

// Configuración del fondo del tooltip (ajuste de dimensiones y bordes)
series.get("tooltip").get("background").setAll({
  minWidth: 150, // Ancho mínimo
  minHeight: 120, // Alto mínimo
  maxWidth: 200, // Ancho máximo
  fill: am5.color(0x228B22), // Fondo verde (puede ajustarse si lo prefieres)
  fillOpacity: 0.95,
  stroke: am5.color(0x000000), // Bordes negros
  strokeWidth: 1,
});

// Configuración del tooltip de la serie
series.get("tooltip").label.setAll({
  fontSize: 34, // Tamaño equilibrado de fuente
  fontWeight: "500", // Negrita para mayor claridad
  fill: am5.color(0xffffff), // Texto blanco
  textAlign: "left", // Alinear a la izquierda para mayor legibilidad
  lineHeight: 1.5, // Espaciado entre líneas
});

// Ajustes adicionales para los tooltips del eje X
xAxis.get("tooltip").label.setAll({
  fontSize: 30, // Tamaño de fuente más visible
  fontWeight: "500",
  fill: am5.color(0xffffff), // Texto blanco
  textAlign: "center", // Centrado
  lineHeight: 1.5, // Espaciado entre líneas
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x000000), // Fondo negro
    fillOpacity: 0.9,
  }),
});

    

    // Add cursor
    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis
      })
    );
    cursor.lineY.set("visible", false);

    // Add scrollbar
    let scrollbar = am5xy.XYChartScrollbar.new(root, {
      orientation: "horizontal",
      height: 50
    });
    chart.set("scrollbarX", scrollbar);

    

    // Add data to the series
    series.data.setAll(chartData);

    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);

    // Clean up on component unmount
    return () => {
      root.dispose();
    };
  }, [divID, cotizaciones]);

  return <div id={divID} style={{ width: "100%", height: "600px" }}></div>;
};

export default CandleChartProEmpresas;