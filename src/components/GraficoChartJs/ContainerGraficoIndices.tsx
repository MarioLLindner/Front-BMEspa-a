import React, { useState, useEffect } from 'react';
import GraficoSelector from './graficoSelector';
import GraficoCotizacionesIndices from './GraficoChartJ';
import { useTranslation } from 'react-i18next';
import '../../i18n';

interface iIndice {
    Nombre: string;
    Abreviacion: string;
    logo: string;
    valor: { fecha: string; hora: string; cotizacion: number }[];
}

interface BodyIndicesProps {
    ArrayIndices: iIndice[];
}

const BodyIndices: React.FC<BodyIndicesProps> = ({ ArrayIndices }) => {
    const { t, i18n } = useTranslation();

    const [selectedIndices, setSelectedIndices] = useState<string[]>(['BME']);
    const [tipoGrafico, setTipoGrafico] = useState<'diario' | 'mensual' | 'anual'>('mensual');
    const [fechaSeleccionada, setFechaSeleccionada] = useState<string>(new Date().toISOString().split('T')[0]);
    const [mesSeleccionado, setMesSeleccionado] = useState<string>(new Date().toISOString().split('T')[0].slice(0, 7));
    const [cargando, setCargando] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const colors = [
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFA533',
        '#8E44AD', '#3498DB', '#E74C3C', '#2ECC71', '#F39C12',
        '#9B59B6', '#1ABC9C', '#34495E', '#27AE60', '#E67E22',
        '#2980B9', '#C0392B', '#D35400', '#7D3C98', '#16A085',
    ];

    const colorMap: { [key: string]: string } = {};
    ArrayIndices.forEach((indice, i) => {
        colorMap[indice.Abreviacion] = colors[i % colors.length];
    });

    const obtenerDatosGrafico = () => {
        const agrupadoPorIndice: { [key: string]: { labels: string[]; dataValues: number[] } } = {};

        ArrayIndices.forEach(indice => {
            if (selectedIndices.includes(indice.Abreviacion)) {
                indice.valor.forEach(cot => {
                    const fecha = cot.fecha.split('T')[0];
                    if (!agrupadoPorIndice[indice.Abreviacion]) {
                        agrupadoPorIndice[indice.Abreviacion] = { labels: [], dataValues: [] };
                    }

                    if (tipoGrafico === 'diario' && fecha === fechaSeleccionada) {
                        const hora = cot.hora.split(':')[0];
                        const clave = `${hora}:00`;
                        if (!agrupadoPorIndice[indice.Abreviacion].labels.includes(clave)) {
                            agrupadoPorIndice[indice.Abreviacion].labels.push(clave);
                            agrupadoPorIndice[indice.Abreviacion].dataValues.push(cot.cotizacion);
                        }
                    } else if (tipoGrafico === 'mensual' && fecha.startsWith(mesSeleccionado)) {
                        if (!agrupadoPorIndice[indice.Abreviacion].labels.includes(fecha)) {
                            agrupadoPorIndice[indice.Abreviacion].labels.push(fecha);
                            agrupadoPorIndice[indice.Abreviacion].dataValues.push(cot.cotizacion);
                        }
                    } else if (tipoGrafico === 'anual') {
                        const añoMes = fecha.slice(0, 7);
                        if (!agrupadoPorIndice[indice.Abreviacion].labels.includes(añoMes)) {
                            agrupadoPorIndice[indice.Abreviacion].labels.push(añoMes);
                            agrupadoPorIndice[indice.Abreviacion].dataValues.push(cot.cotizacion);
                        }
                    }
                });
            }
        });

        const datasets = Object.keys(agrupadoPorIndice).map(indice => ({
            label: indice,
            data: agrupadoPorIndice[indice].dataValues,
            labels: agrupadoPorIndice[indice].labels,
            borderColor: colorMap[indice],
            backgroundColor: `${colorMap[indice]}33`,
            fill: true,
        }));

        return datasets;
    };

    const cambiarDia = (incremento: number) => {
        const nuevaFecha = new Date(fechaSeleccionada);
        nuevaFecha.setDate(nuevaFecha.getDate() + incremento);
        setFechaSeleccionada(nuevaFecha.toISOString().split('T')[0]);
    };

    const cambiarMes = (incremento: number) => {
        const [year, month] = mesSeleccionado.split('-').map(Number);
        const nuevaFecha = new Date(year, month - 1 + incremento); // Manipula directamente mes y año
        const nuevoMes = nuevaFecha.toISOString().slice(0, 7); // Asegura el formato 'YYYY-MM'
        setMesSeleccionado(nuevoMes);
    };

    const toggleIndice = (indice: string) => {
        setSelectedIndices(prev =>
            prev.includes(indice) ? prev.filter(i => i !== indice) : [...prev, indice],
        );
    };

    const datosGrafico = obtenerDatosGrafico();
    console.log("DATOS GRAFICOS", datosGrafico)

    return (
        <>
        <div className="max-w-[95%] mx-auto p-5 bg-white rounded-lg shadow-md">
        <h1 className="text-center font-bold text-2xl mb-5">{t('body_indices.title')}</h1>
            <GraficoSelector tipoGrafico={tipoGrafico} setTipoGrafico={setTipoGrafico} />
            <div className="flex flex-wrap gap-2 mt-5">
                {ArrayIndices.map(indice => (
                    <button
                    key={indice.Abreviacion}
                    onClick={() => toggleIndice(indice.Abreviacion)}
                    className={`py-2 px-4 text-sm rounded-lg transition transform border-2 ${
                      selectedIndices.includes(indice.Abreviacion)
                        ? `bg-blue-500 text-white border-${colorMap[indice.Abreviacion]}`
                        : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    {indice.Abreviacion}
                  </button>
                ))}
            </div>
            {tipoGrafico === 'diario' && (
                <div className="flex gap-2 mt-3">
                    <button className="bg-blue-500 text-white rounded-lg py-2 px-4 transition hover:bg-blue-700" onClick={() => cambiarDia(-1)}>
                        {t('buttons.previous_day')}
                    </button>
                    <button className="bg-blue-500 text-white rounded-lg py-2 px-4 transition hover:bg-blue-700" onClick={() => cambiarDia(1)}>
                        {t('buttons.next_day')}
                    </button>
                    <p>{t('selected_date')}: {fechaSeleccionada}</p>
                </div>
            )}
            {tipoGrafico === 'mensual' && (
                <div className="flex gap-2 mt-3">
                    <button className="bg-blue-500 text-white rounded-lg py-2 px-4 transition hover:bg-blue-700" onClick={() => cambiarMes(-1)}>
                        {t('buttons.previous_month')}
                    </button>
                    <button className="bg-blue-500 text-white rounded-lg py-2 px-4 transition hover:bg-blue-700" onClick={() => cambiarMes(1)}>
                        {t('buttons.next_month')}
                    </button>
                    <p>{t('selected_month')}: {mesSeleccionado}</p>
                </div>
            )}
            {datosGrafico.length > 0 ? (
                <GraficoCotizacionesIndices datos={datosGrafico} tipoGrafico={tipoGrafico} />
            ) : (
                !cargando && <p className="error-message">{t('no_data')}</p>
            )}
        </div>
        </>
    );
};

export default BodyIndices;
