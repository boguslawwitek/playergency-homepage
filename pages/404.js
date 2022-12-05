import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import styles from '../styles/Errors.module.scss';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Link from 'next/link';
import data from '../config.json';
import useSwr from 'swr';

const umamiAnalyticsID = data.umamiAnalyticsID;
const umamiAnalyticsSrc = data.umamiAnalyticsSrc;
const jarvibBaseURL = data.jarvibBaseURL;

const fetcher = (url) => fetch(url).then((res) => res.json());

const Custom404 = () => {
    const { t } = useTranslation('common');
    const [innerWidth, setInnerWidth] = useState(0);
    const { data: fetchAvatar, error: fetchAvatarError } = useSwr(`${jarvibBaseURL}/api/partners/playergency/discord/avatar`, fetcher);

    useEffect(() => {
      setInnerWidth(prevState => prevState = window.innerWidth);
  
      function handleResize() {
        setInnerWidth(prevState => prevState = window.innerWidth);
      }
    
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      }
  
    }, [])

    return (
        <>
            <Head>
                <title>Playergency</title>
                <link rel="icon" type="image/png" href={!fetchAvatarError && fetchAvatar && fetchAvatar.hasOwnProperty('url') && fetchAvatar.url ? fetchAvatar.url : `/images/logo.png`} />
                {umamiAnalyticsID && umamiAnalyticsSrc ? 
                <script async defer data-website-id={umamiAnalyticsID} src={umamiAnalyticsSrc}>
                </script> : null}
            </Head>
            <Nav innerWidth={innerWidth} />
            <div className={styles.container404}>
                <div className={styles.box404}>
                    <div className={styles.code404}>404</div>
                    <div className={styles.text404}>{t('error-404')}</div>
                </div>
                <Link href="/" className={styles.btn}>
                    {t('error-go-back')}
                </Link>
            </div>
            <Footer />
        </>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
})

export default Custom404;