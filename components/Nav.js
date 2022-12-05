import React, { useState, useEffect } from 'react';
import styles from '../styles/components/Nav.module.scss';
import { useTranslation } from 'next-i18next';
import HamburgerBtn from './HamburgerBtn';
import classNames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import data from '../config.json';
import useSwr from 'swr';

const jarvibBaseURL = data.jarvibBaseURL;
const fetcher = (url) => fetch(url).then((res) => res.json());

export const Nav = ({innerWidth}) => {
    const { t } = useTranslation('common');
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const { data: fetchAvatar, error: fetchAvatarError } = useSwr(`${jarvibBaseURL}/api/partners/playergency/discord/avatar`, fetcher);

    const Logo = () => (
        <Link href="/" className={classNames(styles.logo, styles.a)}><div className={styles['img-container']}><img className={styles['logo-img']} src={!fetchAvatarError && fetchAvatar && fetchAvatar.hasOwnProperty('url') && fetchAvatar.url ? fetchAvatar.url : `/images/logo.png`} alt="Playergency Logo" /></div><span className={styles['logo-text']}>Playergency.com</span></Link>
    );

    const NavList = () => (
        <ul className={classNames(styles.ul)}>
            <li className={styles.li}>
                <Link href="/" className={styles.a}>{t('nav-home')}</Link>
            </li>
            {/* <li className={styles.li}>
                <a href={`${jarvibBaseURL}/playergency`} className={styles.a}>{t('nav-dashboard')}</a>
            </li> */}
            <li className={styles.li}>
                <a href={`https://playergency.com/beta`} className={styles.a}>{t('nav-dashboard')}</a>
            </li>
            <li className={styles.li}>
                <a href={`https://playergency.com/beta/ranking`} className={styles.a}>{t('nav-dashboard-ranking')}</a>
            </li>
            <li className={styles.li}>
                <a href={`https://playergency.com/beta/shop`} className={styles.a}>{t('nav-dashboard-shop')}</a>
            </li>
            <li className={styles.li}>
                <Link href="/discord" className={styles.a}>Discord</Link>
            </li>
        </ul>
    );

    return (<>
        <nav id='navigation'>
            <div className={classNames(styles.navigation)}>
                <div className={styles.left}>
                    <Logo />
                </div>
                <div className={styles.right}>
                    <HamburgerBtn menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} customStyle={styles.hamburger} />
                    {innerWidth > 1024 ? <NavList /> : null}
                </div>
            </div>
            {innerWidth <= 1024 && menuIsOpen ? <NavList /> : null}
        </nav>
    </>)
}

Nav.propTypes = {
    innerWidth: PropTypes.number.isRequired,
    newNavColor: PropTypes.string
};

export default Nav;