import React, { useState, useEffect } from 'react';
import styles from '../styles/components/LanguageSwitch.module.scss';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

const LanguageSwitch = () => {
    const router = useRouter();
    const { t } = useTranslation('common');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {

        function handleCloseMenu(e) {
            const btnLangModal = e.target.closest('#language-modal-btn');
            const langModal = e.target.closest('#language-modal');

            if(!langModal && !btnLangModal) {
                setModalIsOpen(prev => prev = false);
            }
        }

        const handleClose = (event) => {handleCloseMenu(event);}
        
        document.addEventListener('click', handleClose);
        return () => {
            document.removeEventListener('click', handleClose);
        }
    }, [])

    return (
        <div className={styles.language}>
            <button id="language-modal-btn" type="button" onClick={() => setModalIsOpen(prev => prev = !prev)} className={styles.btn}><FontAwesomeIcon icon={faGlobe} className={styles.globe} /></button>
            {modalIsOpen ? <div className={styles.modal} id="language-modal">
                <div className={styles['lang-text']}>{t('choose-lang')}</div>
                <Link href={router.asPath} locale={'pl'} className={classNames(styles['language-box'], router.locale === 'pl' ? styles['disabled-link'] : null)} onClick={modalIsOpen ? () => setModalIsOpen(false) : null}>
                    <img className={styles['lang-img']} src={`/images/flags/pl.png`} alt='' />
                    <div className={styles.text}>PL</div>
                </Link>
                <Link href={router.asPath} locale={'en'} className={classNames(styles['language-box'], router.locale === 'en' ? styles['disabled-link'] : null)} onClick={modalIsOpen ? () => setModalIsOpen(false) : null}>
                    <img className={styles['lang-img']} src={`/images/flags/en.png`} alt='' />
                    <div className={styles.text}>EN</div>
                </Link>
            </div> : null}
        </div>
    )
}

export default LanguageSwitch;