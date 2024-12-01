import { useTranslation } from 'react-i18next'; 
import '../../i18n'; 

export const Texto = ({props}) => {
    const text:string = props
     const { t, i18n } = useTranslation(); 
    return (
        <a>{t(text)}</a>
    )
}