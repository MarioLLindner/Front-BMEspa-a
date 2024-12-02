import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../i18n';

export const Texto = ({ props }: any) => {
    const { t } = useTranslation();

    return (
        <a>{t(props)}</a>
    );
};
