import PropTypes from 'prop-types';
import styles from '../styles/components/HamburgerBtn.module.scss';
import classNames from 'classnames';

const HamburgerBtn = ({menuIsOpen, setMenuIsOpen, customStyle, style}) => {
    return (
        <button className={classNames(styles.hamburger, styles['hamburger--spin'], customStyle ? customStyle : null, {[styles['is-active']]: menuIsOpen})} type="button" aria-label="Menu" aria-controls="navigation" onClick={() => setMenuIsOpen((prevState) => !prevState)}>
            <span className={styles['hamburger-box']}><span className={styles['hamburger-inner']} style={style ? style : {backgroundColor: 'rgb(235, 235, 235)'}}></span></span>
        </button>
    )
}

HamburgerBtn.propTypes = {
    menuIsOpen: PropTypes.bool.isRequired,
    setMenuIsOpen: PropTypes.func.isRequired,
    customStyle: PropTypes.string,
}


export default HamburgerBtn;