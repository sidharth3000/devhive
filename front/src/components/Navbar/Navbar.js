import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'; 

import styles from './Navbar.module.css';
import * as actions from '../../store/actions/auth'

let navbar = [styles.navbar]

class Nav extends Component{

    state = {
        avatar: null,
        theposition: 0,
        default : "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"
    }

    componentWillUnmount() {
        window.addEventListener('scroll', this.listenToScroll)
    }

    listenToScroll = () => {
        const winScroll =
          document.body.scrollTop || document.documentElement.scrollTop
      
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight
      
        const scrolled = winScroll / height
        // console.log(scrolled)
        this.setState({
          theposition: scrolled,
        })
      }

    componentDidMount () {

        let config = {
            headers: {
              token: localStorage.getItem("token")
            }
        }

        axios.get('http://localhost:9000/avatar', config )
        .then( response =>{

            if(response.status === 200){
                this.setState({avatar: response.data})
            }  else{
                this.setState({avatar: this.state.default})
            }
            
        }).catch( e => {
            console.log(e)
        })

        window.addEventListener('scroll', this.listenToScroll)

    }

    render(){

        if(this.state.theposition>=0.119298249438293){  
            navbar=[styles.scrolled]
        }

        if(this.state.theposition<0.119298249438293){  
            navbar=[styles.navbar]
        }

        return(
            <div className={navbar}>
                <nav>
                    <ul className={styles.main_nav}>
                        <li className={`${styles.link} ${styles.logoo}`}><NavLink activeClassName={styles.active} exact to='/'><img alt="img" className={`${styles.logo}`} src={"Assets/logo.png"} /></NavLink></li>
                        <li className={`${styles.link} ${styles.name}`}>DEV-hive</li>
                       
                        <li className={styles.link}><NavLink activeClassName={styles.active} exact to='/'>Feed</NavLink></li>
                    
                        <li className={styles.link}><NavLink activeClassName={styles.active} exact to='/news'>News</NavLink></li>

                        {this.props.isAuth ? 
                        <li className={styles.link}><NavLink activeClassName={styles.active} exact to='/room'>Chat</NavLink></li>:
                        null}
                        
                        
                        <li className={`${styles.link} ${styles.push}`}>

                            {this.props.isAuth ? 
                            <div className={styles.dropdown}>
                            <NavLink exact to='/user' className={`${styles.link} ${styles.drop}`}>My Profile</NavLink>
                            <NavLink exact to='/auth' onClick={this.props.logout} className={`${styles.link} ${styles.drop}`}>logout</NavLink>
                                <img alt="user" className={styles.img} src={`data:image/jpg;base64,${this.state.avatar}`} />
                            </div> :
                            <NavLink to='/auth' className={styles.auth}>Authenticate</NavLink>}


                            
                        </li>                       
                    </ul>
                </nav>
            </div>
           
        )
    }
}

const mapStateToProps = state => {
    return{
        isAuth: state.auth.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);