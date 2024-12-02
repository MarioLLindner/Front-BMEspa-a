"use client";
import CandleChartProEmpresas from "@components/Candlechart";
import { CompanyDetailsInfoReact } from "@components/CompanyDetailsInfo";
import './CambiarNombre2.css'


export const CambiarNombre = ({ Empresa, onClose, cotizaciones }) => {

    console.log("cotizacionesen cambiarNombre: ", cotizaciones)

    const valores = Array.isArray(cotizaciones)
        ? cotizaciones
            .filter(c => c?.cotizacion !== undefined)
            .map(c => parseFloat(c.cotizacion))
        : [];

    // Calcular valores requeridos si existen datos
    const valorMaximo = valores.length > 0 ? Math.max(...valores) : 0;
    const valorMinimo = valores.length > 0 ? Math.min(...valores) : 0;
    const ultimoValor = valores.length > 0 ? valores[valores.length - 1] : 0;
    const porcentajeFluctuacion =
        valorMinimo > 0
            ? ((valorMaximo - valorMinimo) / valorMinimo) * 100
            : 0;
    console.log("Porcentaje de Fluctuación:", porcentajeFluctuacion.toFixed(2) + "%");

    
    const fluctuacionFiltrada = porcentajeFluctuacion.toFixed(2)

    return (

        <article
            className={`EmpDetalle ${Empresa ? "display-block" : "hidden"} border-black border-y-2 relative flex-row h-full w-screen flex-shrink-0`}
        >
            <div className="w-[100%] h-full">
                <button
                    id="close-button"
                    className="absolute top-4 left-6 bg-red-500 text-white py-2 px-4 rounded-full font-bold"
                    onClick={onClose}
                >
                    Cerrar
                </button>
                <header className="px-28 pt-16">
                    <h2
                        className="text-7xl font-bold uppercase mb-12 tracking-tighter"
                    >
                        {cotizaciones && cotizaciones.length > 0 ? (
                            <CandleChartProEmpresas divID={Empresa?.Nombre} cotizaciones={cotizaciones} />
                        ) : (
                            <p>No hay datos disponibles para mostrar el gráfico.</p>
                        )}
                    </h2>
                </header>
                <footer
                    className="flex flex-col mt-10 bg-lime-400 justify-center items-center py-12"
                >
                    <div className="p-2">
                        <div className="grid grid-cols-4 gap-16 text-center">
                            <CompanyDetailsInfoReact label={Empresa?.info[1].label} value={valorMaximo} />
                            <CompanyDetailsInfoReact label={Empresa?.info[0].label} value={valorMinimo} />
                            <CompanyDetailsInfoReact label={Empresa?.info[2].label} value={ultimoValor} />
                            <CompanyDetailsInfoReact
                                label={
                                    <>
                                        % de Fluctuación
                                        {porcentajeFluctuacion !== 0 && (
                                            <span
                                                className={`ml-2 font-bold ${porcentajeFluctuacion > 0 ? "text-red-500" : "text-green-500"
                                                    }`}
                                            >
                                                {porcentajeFluctuacion > 0 ? "▼" : "▲"}
                                            </span>
                                        )}
                                    </>
                                } value={fluctuacionFiltrada} />
                        </div>
                    </div>
                    <a
                        className="py-4 px-14 text-lime-400 bg-[#171717] uppercase font-bold text-3xl rounded-full"
                        href={Empresa?.link}>Link
                    </a>
                </footer>
            </div>
        </article>)
} 