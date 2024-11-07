
import CandleChartProEmpresas from "@components/Candlechart";
import CompanyDetailsInfo from "@components/CompanyDetailsInfo.astro";
import './CambiarNombre2.css'

export const CambiarNombre = ({ Empresa }) => {
    return (

        <article
            class="EmpDetalle display-block border-black border-y-2 relative flex flex-row h-full w-screen flex-shrink-0"
        >
            <div class="w-[55%] h-full">
                <button
                    id="close-button"
                    class="absolute top-4 left-4 bg-red-500 text-white py-2 px-4 rounded-full font-bold"
                >
                    Cerrar
                </button>
                <header class="px-28 pt-16">
                    <h2
                        class="text-7xl font-bold uppercase mb-12 tracking-tighter"
                    >
                        <CandleChartProEmpresas client:load="react" />
                    </h2>
                </header>
                <footer
                    class="flex flex-col mt-10 bg-lime-400 justify-center items-center py-12"
                >
                    <div class="p-2">
                        <div class="grid grid-cols-4 gap-16 text-center">
                            <CompanyDetailsInfo label="Max" value="15" />
                            <CompanyDetailsInfo label="Min" value="15" />
                            <CompanyDetailsInfo label="%" value="15" />
                            <CompanyDetailsInfo label="Value" value="15" />
                        </div>
                    </div>
                    <a
                        class="py-4 px-14 text-lime-400 bg-[#171717] uppercase font-bold text-3xl rounded-full"
                        href={Empresa.link}>Link
                    </a>
                </footer>
            </div>
            <figure class="w-[45%] h-full"></figure>
            <img class="h-full max-h-[900px] max-w-[880px]" src={Empresa.image} alt={Empresa.Nombre} />
        </article>)
} 