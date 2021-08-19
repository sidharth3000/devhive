import React, {Component} from 'react'
import { connect } from 'react-redux';

import styles from './Signin.module.css'
import Modal from '../../../UI/Modal/Modal'
import * as actions from '../../../store/actions/auth'
import Spinner from "../../../UI/Spinner/Spinner"

class Signin extends Component {

    state = {
        email: null,
        password: null,
        showpass: false
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPassChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitHandler = () => {
        this.props.onAuth(this.state.name, this.state.email, this.state.password, false)
    }

    onSwitchEyeHandler = () => {
        this.setState({showpass: !this.state.showpass})
    }

    render() {

        const spinner = this.props.loading ? <Spinner/> : null

         return(
             <div>

                 {spinner}

                 <Modal show={this.props.show} switch={this.props.switch}>
                     <div className={styles.cont}>
                        <div className={styles.header}>
                            <img alt="img" src={'Assets/dp.jpg'} className={styles.image}></img>
                        </div>

                        <div className={styles.text}>Login to continue</div>

                        <div className={styles.input}>
                            <div className={styles.icon}><i className="fa fa-user-circle"></i></div>
                            <input type="text" className={styles.txt} placeholder="username" onChange={this.onEmailChange}></input>
                        </div>
<br></br>
                        <div className={styles.input}>
                            <div className={styles.icon}><i className="fa fa-key"></i></div>
                            <input type={this.state.showpass ? "text" : "password"} className={styles.txt} placeholder="password" onChange={this.onPassChange}></input>
                        </div>

                        {!this.state.showpass 
                        ?  <div className={styles.eye} onClick={this.onSwitchEyeHandler} ><i className="fa fa-eye"></i></div>
                        : <div className={styles.eye} onClick={this.onSwitchEyeHandler}><i className="fa fa-eye-slash"></i></div>}
<br></br>
                        <button className={styles.button} onClick={this.onSubmitHandler}>Singn in</button>
                     </div>
                     
                 </Modal>

             </div>
         )
    }
}

const mapStateToProps = state => {
    return{
        loading: state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pass, signup) => dispatch(actions.auth( email, pass, signup)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);