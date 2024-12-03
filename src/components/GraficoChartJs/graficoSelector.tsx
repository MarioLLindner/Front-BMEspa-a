import React from 'react';
import { useTranslation } from 'react-i18next';

interface GraficoSelectorProps {
  tipoGrafico: 'diario' | 'mensual' | 'anual';
  setTipoGrafico: (tipo: 'diario' | 'mensual' | 'anual') => void;
}

const GraficoSelector: React.FC<GraficoSelectorProps> = ({ tipoGrafico, setTipoGrafico }) => {
  const { t } = useTranslation(); // Usar useTranslation

  return (
    <div className="flex justify-center gap-3 mb-5">
      <button
        className={`py-2 px-4 rounded-lg text-sm font-semibold transition ${tipoGrafico === 'diario'
            ? 'bg-lime-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-lime-700'
          }`}
        onClick={() => setTipoGrafico('diario')}
      >
        {t('buttons.daily_chart')}
      </button>
      <button
        className={`py-2 px-4 rounded-lg text-sm font-semibold transition ${
          tipoGrafico === 'mensual'
            ? 'bg-lime-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-lime-700'
        }`}
        onClick={() => setTipoGrafico('mensual')}
      >
        {t('buttons.monthly_chart')}
      </button>
      <button
        className={`py-2 px-4 rounded-lg text-sm font-semibold transition ${
          tipoGrafico === 'anual'
            ? 'bg-lime-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-lime-700'
        }`}
        onClick={() => setTipoGrafico('anual')}
      >
        {t('buttons.annual_chart')}
      </button>
    </div>
  );
};

export default GraficoSelector;