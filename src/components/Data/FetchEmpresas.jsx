import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FetchData = ({ children }) => {
    const [codEmpresas, setCodEmpresas] = useState([]);
    const [cotizaciones, setCotizaciones] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Función para buscar empresas
    const fetchEmpresas = async () => {
        try {
            const response = await axios.get('http://localhost:8080/cotizaciones/BuscarMisEmpresas');
            return response.data;
        } catch (error) {
            console.error('Error al buscar empresas:', error);
            return [];
        }
    };

    // Función para buscar cotizaciones
    const fetchCotizaciones = async () => {
        try {
            const response = await axios.get('http://localhost:8080/cotizaciones/BuscarCotizaciones');
            return response.data;
        } catch (error) {
            console.error('Error al buscar cotizaciones:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                console.log('Cargando empresas y cotizaciones...');
                const [empresas, cotizaciones] = await Promise.all([
                    fetchEmpresas(),
                    fetchCotizaciones(),
                ]);

                setCodEmpresas(empresas);
                setCotizaciones(cotizaciones);
                setIsLoading(false);
                console.log('Datos cargados:', { empresas, cotizaciones });
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };

        fetchAllData();
    }, []);

    // Renderizado condicional mientras se cargan los datos
    if (isLoading) {
        return <p>Cargando datos...</p>;
    }

    return (
        <>
            {codEmpresas.length > 0 ? (
                children({ empresas: codEmpresas, cotizaciones }) // Pasamos ambos conjuntos de datos
            ) : (
                <p>No se encontraron datos.</p>
            )}
        </>
    );
};

export default FetchData;
