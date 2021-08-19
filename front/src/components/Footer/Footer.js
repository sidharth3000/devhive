import React from 'react';

import styles from './Footer.module.css';

const Footer = () => (

    <div>
        <ul className={styles.footer_main}>
            <li className={styles.handles}><i className="fa fa-facebook handle"></i></li>
            <li className={styles.handles}><i className="fa fa-twitter handle"></i></li>
            <li className={styles.handles}><i className="fa fa-instagram handle"></i></li>
            <li className={styles.handles}><i className="fa fa-linkedin handle"></i></li>
            <li className={styles.handles}><i className="fa fa-github handle"></i></li>
        </ul>

        <div className={styles.credit}>Made with  <i className="fa fa-heart handle"></i> by Sidharth.</div>
    </div>
)

export default Footer;