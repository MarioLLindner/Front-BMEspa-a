import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const i18nInstance = i18next.createInstance();

i18nInstance
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: "en",
        resources: {
            en: {
                translation: {
                    title: "Business Quotes",
                    buttons: {
                        previous_day: "Previous Day",
                        next_day: "Next Day",
                        previous_month: "Previous Month",
                        next_month: "Next Month",
                        daily_chart: "Daily Chart",
                        monthly_chart: "Monthly Chart",
                        annual_chart: "Annual Chart",
                        hora: "Hour",
                        fecha: "Date",
                        cotizacion: "Quote"
                    },
                    idioma: "Language",
                    MadridSpain: "Madrid, Spain",
                    TradingHours: "Trading Hours",
                    Allrightsreserved: "All rights reserved",
                    CookiePolicy: "Cookie Policy",
                    TermsofService: "Terms of Service",
                    PrivacyPolicy: "Privacy Policy",
                    ContactInformation: "Contact Information",
                    GlobalExchangeNetwork: "Global Exchange Network",
                    ListadeCompanias: "Listed Companies",
                    participacion: "Company Participation",
                    selected_date: "Selected Date",
                    selected_month: "Selected Month",
                    no_data:"Select an index to see its quotes",
                    empresas:"Listed Companies",
                    body_indices: {
                        title: "Stock Index Quotes"
                    },
                },
            },
            es: {
                translation: {
                    title: "Cotizaciones de Empresas",
                    buttons: {
                        previous_day: "Día Anterior",
                        next_day: "Día Siguiente",
                        previous_month: "Mes Anterior",
                        next_month: "Mes Siguiente",
                        daily_chart: "Gráfico Diario",
                        monthly_chart: "Gráfico Mensual",
                        annual_chart: "Gráfico Anual",
                        hora: "Hora",
                        fecha: "Fecha",
                        cotizacion: "Cotización"
                    },
                    idioma: "Idioma",
                    MadridSpain: "Madrid, España",
                    TradingHours: "Horarios de operación",
                    Allrightsreserved: "Todos los derechos reservados",
                    CookiePolicy: "Política de cookies",
                    TermsofService: "Términos de servicio",
                    PrivacyPolicy: "Política de privacidad",
                    ContactInformation: "Información de contacto",
                    GlobalExchangeNetwork: "Red de intercambio global",
                    ListadeCompanias: "Lista de Empresas",
                    participacion: "Participacion de las Empresas",
                    selected_date: "Fecha Seleccionada",
                    selected_month: "Mes Seleccionado",
                    no_data:"Seleccione un indice para ver sus cotizaciones",
                    empresas:"Lista de Empresas",
                    body_indices: {
                        title: "Cotizaciones de Índices Bursátiles"
                    },
                },
            },
        },
        detection: {
            order: ["querystring", "cookie", "localStorage", "navigator"],
            caches: ["cookie"],
        },
    });

export default i18nInstance;
