
import CandleChartProEmpresas from "@components/Candlechart";
import { CompanyDetailsInfoReact } from "@components/CompanyDetailsInfo";
import './CambiarNombre2.css'


export const CambiarNombre = ({ Empresa, onClose}) => {

    

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
                        <CandleChartProEmpresas divID={Empresa?.Nombre} />
                    </h2>
                </header>
                <footer
                    className="flex flex-col mt-10 bg-lime-400 justify-center items-center py-12"
                >
                    <div className="p-2">
                        <div className="grid grid-cols-4 gap-16 text-center">
                            <CompanyDetailsInfoReact label="Max" value="15" />
                            <CompanyDetailsInfoReact label="Min" value="15" />
                            <CompanyDetailsInfoReact label="%" value="15" />
                            <CompanyDetailsInfoReact label="Value" value="15" />
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