import React, { useState } from "react"
import {CambiarNombre} from "../CambiarNombre/CambiarNombre2.jsx";
import './Empresas.css'

export const ListaEmpresas = ({ empresas }) => {
    const [EmpresaActual, setEmpresaActual] = useState(null);
    const [showingList, setShowingList] = useState(null)

    const HandleEmpresaClick = empresa => {
        setEmpresaActual(empresa)
        console.log("Empresa seleccionada:", empresa);
        setShowingList(false)
    }

    return (
        <div className="flex">
            <div id="company-list" className={`w-screen flex-shrink-0 `}>
                {
                    empresas.map((emp, index) => (
                        <div className="flex flex-row w-full justify-between">
                            <article className="relative border-t-2 last:border-b-2 border-black w-full">
                                <button
                                    data-id={index}
                                    className="group pl-[60px] ml-14 flex"
                                    onClick={() => HandleEmpresaClick(emp)}
                                >
                                    <div className="-z-20 absolute left-0 h-full w-[60px] bg-lime-400 group-hover:w-full transition-all duration-700 ease-proyect-timing" />
                                    <div
                                        className="h-full w-full bg-cover bg-center bg-no-repeat
                                    opacity-0 transition-opacity duration-700 ease-proyect-timing 
                                    -z-10 absolute inset-0 delay-700  
                                     group-hover:opacity-100"
                                        style={{ backgroundImage: `url(${emp.image})` }}
                                    />
                                    <div className="py-8">
                                        <h3 className="uppercase tracking-tighter text-8xl font-bold">
                                            {emp.Nombre}
                                        </h3>
                                        <h4 className="uppercase text-2xl text-left group-hover:opacity-0 transition-opacity duration-700 ease-proyect-timing">
                                            {emp.RefranEmpresa}
                                        </h4>
                                    </div>
                                    <div className="absolute right-0 border-l border-black h-full w-[300px] flex items-center justify-center">
                                        <svg
                                            className="arrow text-black group-hover:text-white group-hover:-translate-x-4 transition duration-700 ease-proyect-timing"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="58"
                                            height="23"
                                            fill="none"
                                            viewBox="0 0 58 23"
                                        >
                                            <path
                                                stroke="currentColor"
                                                d="M0 11.458h56.842M46.304 1l10.538 10.538-10.538 10.538"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            </article>
                        </div>
                    ))
                }
            </div>
                <CambiarNombre Empresa={EmpresaActual} onClose={() => setEmpresaActual(null)}/>
        </div>

    )
}