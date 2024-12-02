'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const LanguageSwitcher = () => {
    const { t } = useTranslation();

    const changeLanguage = (lng) => {
        if (typeof i18n.changeLanguage === "function") {
            i18n.changeLanguage(lng);
        } else {
            console.error("El método changeLanguage no está disponible en i18n.");
        }
    };

    return (
        <select
            onChange={(e) => changeLanguage(e.target.value)}
            className="p-1 border rounded-md bg-gray-900 border-gray-500 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
            <option>{t('idioma')}</option>
            <option value="es">Español</option>
            <option value="en">English</option>
        </select>
    );
};

export default LanguageSwitcher;
