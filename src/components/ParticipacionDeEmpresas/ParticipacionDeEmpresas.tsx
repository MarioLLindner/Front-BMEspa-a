import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";


interface Empresa {
    Nombre: string;
    cantidadAcciones: string;
  }
  

  const PieChartComponent = ({ empresas }:any) => {
    useLayoutEffect (() => {
        console.log("Empresas",empresas)
    // Create root element
    const root = am5.Root.new("chartdiv2");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        radius: am5.percent(90),
        innerRadius: am5.percent(50),
        layout: root.horizontalLayout,
      })
    );

    // Create series
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "sales",
        categoryField: "country",
      })
    );

    // Map empresas data to match chart's expected format
    const chartData = empresas.map((empresa:any) => ({
        country: empresa.Nombre,
        sales: parseFloat(empresa.cantidadAcciones), // Convertir cantidadAcciones a número
      }));
  
      // Set data
      series.data.setAll(chartData);

    // Disable labels and ticks
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    // Adding gradients
    series.slices.template.set("strokeOpacity", 0);
    series.slices.template.set(
      "fillGradient",
      am5.RadialGradient.new(root, {
        stops: [
          { brighten: -0.8 },
          { brighten: -0.8 },
          { brighten: -0.5 },
          { brighten: 0 },
          { brighten: -0.5 },
        ],
      })
    );

    // Create legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerY: am5.percent(50),
        y: am5.percent(50),
        layout: root.verticalLayout,
      })
    );

    // Set value labels align to right
    legend.valueLabels.template.setAll({ textAlign: "right" });
    // Set width and max width of labels
    legend.labels.template.setAll({
      maxWidth: 140,
      width: 140,
      oversizedBehavior: "wrap",
    });

    legend.data.setAll(series.dataItems);

    // Play initial series animation
    series.appear(1000, 100);

    // Cleanup function to dispose of the chart on unmount
    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv2" style={{ width: "100%", height: "500px" }} />;
};

export default PieChartComponent;
