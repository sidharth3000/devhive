import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './Signup.module.css'
import * as actions from '../../../store/actions/auth'
import Login from "../Signin/Singnin"
import Spinner from "../../../UI/Spinner/Spinner"

class Signup extends Component {

    state = {
        name: null,
        email: null,
        password: null,
        showpass: false
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPassChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitHandler = () => {
        this.props.onAuth(this.state.name, this.state.email, this.state.password, true)
    }

    onSwitchEyeHandler = () => {
        this.setState({showpass: !this.state.showpass})
    }
    
    render () {

        const spinner = this.props.loading ? <Spinner/> : null

        return(

            <div className={styles.back}>

                {spinner}

            {this.props.isAuth ?  <Redirect to="/user" /> : null}

              <Login switch={this.props.switch} show={this.props.modal_show}/> 

                <div className={styles.nav}>
                    <img alt="img" className={styles.logo} src={"Assets/logo.png"} />
                    <div className={styles.name}>DEV-hive</div>
                    <div className={styles.login} onClick={this.props.switch}>Login</div>
                </div>

                <div className={styles.signup}>
                    <div className={styles.welcome}>WELCOME</div>
                    <div className={styles.text}>Consectetur exercitation duis consequat commodo excepteur ex adipisicing commodo non.</div>
                    <form>
                        <input type="text" className={`${styles.input} ${styles.namee}`} placeholder="name" onChange={this.onNameChange}></input><br/>
                        <input type="email" className={`${styles.input} ${styles.email}`} placeholder="Email" onChange={this.onEmailChange}></input><br/>
                        <input type={this.state.showpass ? "text" : "password"} className={`${styles.input} ${styles.pass}`} placeholder="Password (min 7 char)" onChange={this.onPassChange}></input>
                        <br/>
                    </form>

                    {!this.state.showpass 
                    ?  <div className={styles.eye} onClick={this.onSwitchEyeHandler} ><i className="fa fa-eye"></i></div>
                    : <div className={styles.eye} onClick={this.onSwitchEyeHandler}><i className="fa fa-eye-slash"></i></div>}
                   
                   
                    <button className={styles.button} onClick={this.onSubmitHandler}>Singn up</button>
                   
                </div >

                <div className={styles.feat_cont}>
                    <div className={styles.feature}>
                        <div className={styles.cont}>
                            <div className={styles.icon}><i className="fa fa-laptop handle"></i></div>
                            <div className={styles.feat_txt}>news</div>
                        </div>
                        
                    </div>

                    <div className={styles.feature}>
                        <div className={styles.cont}>
                            <div className={styles.icon}><i className="fa fa-users handle"></i></div>
                            <div className={styles.feat_txt}>activity</div>
                        </div>
                        
                    </div>

                    <div className={styles.feature}>
                        <div className={styles.cont}>
                            <div className={styles.icon}><i className="fa fa-comments handle"></i></div>
                            <div className={styles.feat_txt}>chat</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        modal_show: state.auth.modal_show,
        isAuth: state.auth.auth,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (name, email, pass, signup) => dispatch(actions.auth(name, email, pass, signup)),
        switch: () => dispatch(actions.switchSign())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);