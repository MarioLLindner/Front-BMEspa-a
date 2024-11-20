import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FetchData = ({ codEmpresas, children }) => {
    const [empresas, setEmpresas] = useState([]);
    const [cotizaciones, setCotizaciones] = useState([]);

    useEffect(() => {
        const fetchEmpresasYCotizaciones = async () => {
            try {
                console.log('Iniciando solicitud a BuscarMisEmpresas');
                const empresasResponse = await axios.get('http://localhost:8080/cotizaciones/BuscarMisEmpresas');
                console.log('Empresas para cotizaciones:', empresasResponse.data);
                setEmpresas(empresasResponse.data);

                console.log('Iniciando solicitud a filtrarCotdemiDB');
                const cotizacionesResponses = await Promise.all(
                    empresasResponse.data.map(cod => axios.get(`http://localhost:8080/Cotizaciones/filtrarCotdemiDB/${cod}`))
                );
                const allCotizaciones = cotizacionesResponses.flatMap(response => response.data);
                console.log('Cotizaciones recibidas:', allCotizaciones);
                setCotizaciones(allCotizaciones);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchEmpresasYCotizaciones();
    }, [codEmpresas]);

    return (
        <>
            {empresas.length > 0 ? (
                console.log('Pasando empresas:', empresas),
                console.log('Pasando cotizaciones:', cotizaciones),
                React.Children.map(children, child => {
                    return React.cloneElement(child, { empresas, cotizaciones });
                })
            ) : (
                console.log('Empresas aún no están disponibles')
            )}
        </>
    );
};

export default FetchData;
