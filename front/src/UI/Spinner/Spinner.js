import React from 'react';

import styles from './Spinner.module.css';
import Backdrop from '../Backdrop/Backdrop'

const Spinner = () => (
    <div>
        <Backdrop show={true}/>
        <div className={styles.spinner}></div>
    </div>
   
);



export default Spinner;