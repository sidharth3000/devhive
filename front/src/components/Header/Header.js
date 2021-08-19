import React from 'react';

import styles from './Header.module.css';

const head = (props) => (

    <div className={styles.head}>
        {props.children}
    </div>
);

export default head;