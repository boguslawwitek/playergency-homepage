import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import useSwr from 'swr';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from '../styles/Home.module.scss';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CookiesBanner  from '../components/CookiesBanner';
import data from '../config.json';
const umamiAnalyticsID = data.umamiAnalyticsID;
const umamiAnalyticsSrc = data.umamiAnalyticsSrc;
const jarvibBaseURL = data.jarvibBaseURL;

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { t } = useTranslation('common');
  const [innerWidth, setInnerWidth] = useState(0);
  const { data, error } = useSwr(`${jarvibBaseURL}/api/partners/playergency/discord/members`, fetcher);
  const { data: fetchAvatar, error: fetchAvatarError } = useSwr(`${jarvibBaseURL}/api/partners/playergency/discord/avatar`, fetcher);
  // const { data: homepageAdmins, error: homepageAdminsError } = useSwr(`${jarvibBaseURL}/api/partners/playergency/getHomepageAdmins`, fetcher);
  // const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // if(homepageAdmins && !homepageAdminsError && Array.isArray(homepageAdmins) && homepageAdmins.admins.length > 0) {
    //   setAdmins(prevState => prevState = homepageAdmins.admins);
    // }

    setInnerWidth(prevState => prevState = window.innerWidth);

    function handleResize() {
      setInnerWidth(prevState => prevState = window.innerWidth);
    }
  
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }

  }, []);

  let homepageAdminsList = null;
  // if(admins.length > 0) {
  //   homepageAdminsList = admins.map((admin, index) => {
  //       return (
  //         <div key={index} className={styles.admin}>
  //           <div>
  //             <div className={styles.username}>{t('lang') === 'pl' ? admin.namePL : admin.nameEN}</div>
  //             <div className={styles.role}>{t('lang') === 'pl' ? admin.rolePL : admin.roleEN}</div> 
  //           </div>
  //           <p className={styles['admin-desc']}>{t('lang') === 'pl' ? admin.descriptionPL : admin.descriptionEN}</p>
  //         </div>
  //       )
  //   });
  // }

  return (
    <>
      <Head>
        <title>Playergency</title>
        <link rel="icon" type="image/png" href={!fetchAvatarError && fetchAvatar && fetchAvatar.hasOwnProperty('url') && fetchAvatar.url ? fetchAvatar.url : `/images/logo.png`} />
        {umamiAnalyticsID && umamiAnalyticsSrc ? 
        <script async defer data-website-id={umamiAnalyticsID} src={umamiAnalyticsSrc}>
        </script> : null}

        {/* <!-- Primary Meta Tags --> */}
        <meta name="title" content="Playergency" />
        <meta name="description" content={t('meta-desc')} />
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://playergency.com" />
        <meta property="og:title" content="Playergency" />
        <meta property="og:description" content={t('meta-desc')} />
        <meta property="og:image" content="/images/games/cyberpunk.jpg" />
        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://playergency.com" />
        <meta property="twitter:title" content="Playergency" />
        <meta property="twitter:description" content={t('meta-desc')} />
        <meta property="twitter:image" content="/images/games/cyberpunk.jpg" />
      </Head>
      <Nav innerWidth={innerWidth} />
      <Header />
      <main>
        <section className={styles.section1}>
          <p>{t('home:section1-p')}</p>
          <a href="https://discord.gg/85cV6Et" target="_blank" rel="noreferrer" className={styles.btn}>
            {!error && data && data.hasOwnProperty('memberCount') && data.memberCount > 0 ? t('home:section1-btn-with-count', {memberCount: data.memberCount}) : t('home:section1-btn')}
          </a>
        </section>
        <section className={styles.section2}>
          <h3 className={styles.piority}>{t('home:section2-title')}</h3>
          <img className={styles['section-img']} src="/images/games/gta.png" alt="" />
          <h4 className={classNames(styles.h4, styles.point1)}>{t('home:section2-desc')}</h4>
          <div className={styles.features}>{t('home:section2-features')}</div>
          <div className={styles['info-container']}>
            <img className={classNames(styles['section-img'], styles['csgo-img'])} src="/images/games/csgo.png" alt="" />
            <h4 className={styles.h4}>{t('home:section2-point1')}</h4>
          </div>
          <div className={styles['info-container']}>
            {innerWidth <= 800 ? <img className={classNames(styles['section-img'], styles['lol-img'])} src="/images/games/lol.png" alt="" /> : null}
            <div>
              <h4 className={classNames(styles.h4, styles.activity)}>{t('home:section2-point2')}</h4>
              <p className={styles.additional}>{t('home:section2-point2-a')}</p>
            </div>
            {innerWidth > 800 ? <img className={classNames(styles['section-img'], styles['lol-img'])} src="/images/games/lol.png" alt="" /> : null}
          </div>
          <div className={styles['info-container']}>
            <img className={classNames(styles['section-img'], styles['mc-img'])} src="/images/games/minecraft.png" alt="" />
            <h4 className={styles.h4}>{t('home:section2-point3')}</h4>
          </div>
        </section>
        <section className={styles.section3}>
          <div className={styles.administration}>{t('admins:title')}</div>
          <div className={styles.admins}>
            {!homepageAdminsList ? <>
            <div className={styles.admin}>
              <div>
                <div className={styles.username}>{t('admins:admin1-name')}</div>
                <div className={styles.role}>{t('admins:admin1-role')}</div> 
              </div>
              <p className={styles['admin-desc']}>{t('admins:admin1-desc')}</p>
            </div>
            <div className={styles.admin}>
              <div>
                <div className={styles.username}>{t('admins:admin2-name')}</div>
                <div className={styles.role}>{t('admins:admin2-role')}</div> 
              </div>
              <p className={styles['admin-desc']}>{t('admins:admin2-desc')}</p>
            </div>
            <div className={styles.admin}>
              <div>
                <div className={styles.username}>{t('admins:admin3-name')}</div>
                <div className={styles.role}>{t('admins:admin3-role')}</div> 
              </div>
              <p className={styles['admin-desc']}>{t('admins:admin3-desc')}</p>
            </div>
            <div className={styles.admin}>
              <div>
                <div className={styles.username}>{t('admins:admin4-name')}</div>
                <div className={styles.role}>{t('admins:admin4-role')}</div> 
              </div>
              <p className={styles['admin-desc']}>{t('admins:admin4-desc')}</p>
            </div>
            <div className={styles.admin}>
              <div>
                <div className={styles.username}>{t('admins:admin5-name')}</div>
                <div className={styles.role}>{t('admins:admin5-role')}</div> 
              </div>
              <p className={styles['admin-desc']}>{t('admins:admin5-desc')}</p>
            </div>
            </> : homepageAdminsList}
          </div>
        </section>
      </main>
      <Footer />
      <CookiesBanner />
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'home', 'admins', 'policy']),
  },
});

export default Home;