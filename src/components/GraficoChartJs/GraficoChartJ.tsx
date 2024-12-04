import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface GraficoProps {
  datos: Array<{
    label: string; 
    data: number[]; 
    labels: string[]; 
    borderColor: string; 
    backgroundColor: string; 
    fill: boolean;
  }>;
  tipoGrafico: 'diario' | 'mensual' | 'anual';
}

const GraficoCotizacionesIndices: React.FC<GraficoProps> = ({ datos, tipoGrafico }) => {
  const data = {
    labels: datos[0]?.labels || [], 
    datasets: datos.map(dataset => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: dataset.borderColor, 
      backgroundColor: dataset.backgroundColor,
      fill: dataset.fill,
    })),
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: tipoGrafico === 'diario' ? 'Hora' : 'Fecha'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Cotización'
        }
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, 
      },
    }
  };

  return (
    <div className="max-w-[85%] w-[1700px] h-[600px] flex justify-center mx-auto p-5 bg-white rounded-lg shadow-md mt-5 overflow-x-auto">
      <Line data={data} options={options} />
    </div>
  );
};

export default GraficoCotizacionesIndices;