import React from 'react';
import useSwr from 'swr';
import styles from '../styles/components/Footer.module.scss';
import { useTranslation } from 'next-i18next';
import { faDiscord, faFacebook, faTwitter, faSteam, faSpotify, faYoutube, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LanguageSwitch from './LanguageSwitch';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Footer = () => {
    const { t } = useTranslation('common');
    const { data, error } = useSwr('/api/year', fetcher);

    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <div className={styles.container}>
                    <ul className={styles['links-list']}>
                        <li>
                            <div className={styles['link-container']}>
                                <FontAwesomeIcon icon={faDiscord} className={styles.icons}/>
                                <a href="https://discord.gg/85cV6Et" target="_blank" rel="noreferrer">Discord</a>
                            </div>
                        </li>
                        <li>
                            <div className={styles['link-container']}>
                                <FontAwesomeIcon icon={faFacebook} className={styles.icons}/>
                                <a href="https://www.facebook.com/Playergency/" target="_blank" rel="noreferrer">Facebook</a>
                            </div>
                        </li>
                        <li>
                            <div className={styles['link-container']}>
                                <FontAwesomeIcon icon={faTwitter} className={styles.icons}/>
                                <a href="https://twitter.com/playergency" target="_blank" rel="noreferrer">Twitter</a>
                            </div>
                        </li>
                        <li>
                            <div className={styles['link-container']}>
                                <FontAwesomeIcon icon={faFacebook} className={styles.icons} />
                                <a href="https://www.facebook.com/groups/playergency" target="_blank" rel="noreferrer">{t('footer-fb-group')}</a>
                            </div>
                        </li>
                        <li>
                            <div className={styles['link-container']}>
                                <FontAwesomeIcon icon={faSteam} className={styles.icons}/>
                                <a href="https://steamcommunity.com/groups/playergency" target="_blank" rel="noreferrer">{t('footer-steam-group')}</a>
                            </div>
                        </li>
                        <li>
                            <div className={styles['link-container']}>
                                <FontAwesomeIcon icon={faSpotify} className={styles.icons}/>
                                <a href="https://spoti.fi/2H6ixr5" target="_blank" rel="noreferrer">Spotify</a>
                            </div>
                        </li>
                        <li>
                            <div className={styles['link-container']}>
                                <FontAwesomeIcon icon={faYoutube} className={styles.icons} />
                                <a href="https://www.youtube.com/channel/UCVc-2YValRpTkBl5yElyCgQ" target="_blank" rel="noreferrer">YouTube</a>
                            </div>
                        </li>
                        <li>
                            <div className={styles['link-container']}>
                                <FontAwesomeIcon icon={faTwitch} className={styles.icons}/>
                                <a href="https://www.twitch.tv/playergency" target="_blank" rel="noreferrer">Twitch</a>
                            </div>
                        </li>
                        <li>
                            <div className={styles['link-container']}>
                                <FontAwesomeIcon icon={faHandsHelping} className={styles.icons} />
                                <a href="https://patronite.pl/playergency" target="_blank" rel="noreferrer">Patronite</a>
                            </div>
                        </li>
                    </ul>
                    <div>
                        <LanguageSwitch />
                    </div>
                </div> 
            </div>
            <div className={styles.copyright}>
                <div className={styles.container}>
                    <p>&copy; 2016-{error || !data ? '2022' : data.year} Playergency. {t('footer-copyright')}</p>
                    <p>{t('footer-author')} <a href="https://bwitek.dev" target="_blank" rel="noreferrer" className={styles.author}>BWitek.dev</a></p>
                </div> 
            </div>
        </footer>
    )
}

export default Footer;