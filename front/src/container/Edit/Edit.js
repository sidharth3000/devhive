import React, {Component} from 'react';
import { Redirect, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'; 

import styles from './Edit.module.css';
import Modal from '../../UI/Modal/Modal'
import Spinner from '../../UI/Spinner/Spinner';
import * as actions from '../../store/actions/auth'

class Edit extends Component {

    state = {
        name: null,
        password: null,
        loading: false
    }

    onNameChangeHandler = (event) => {
        this.setState({name: event.target.value})
    }

    onNameSubmit = () => {

        this.setState({loading:true})

        let config = {
            headers: {
                token: localStorage.getItem("token")
            }
          }
        
        if (this.state.name == null){
            this.setState({loading:false})
            alert("please enter a valid name")
        }else{

            axios.patch('http://localhost:9000/user/name', {name: this.state.name}, config)
            .then(response => {
                
                this.setState({loading:false})
                localStorage.setItem("name", response.data.name)
                this.props.switch();
                window.location.reload(false);

            }).catch( e => {
                this.setState({loading:false})
                console.log(e)
            })
        }
    }

    onUploadHandler = (event) => {

        this.setState({loading:true})

        const formData = new FormData();

        formData.append(
          "avatar",
          event.target.files[0]
        );

        formData.append(
            "name", "aaaaaaaaaaa"
        )

        
        let config = {
            headers: {
                token: localStorage.getItem("token"),
            }
          }
        
        axios.post('http://localhost:9000/upload', formData, config)
        .then( response =>{
            this.setState({loading:false})
            console.log(response)
        }).catch( e => {
            this.setState({loading:false})
            console.log(e)
        })

        this.props.switch();

        setTimeout(() =>{
            window.location.reload(false);
           },1000)
    }

    onDeleteAcc = () => {
        this.props.switch();
        this.props.deleteAcc();   
    }

    render(){

        let redirect = this.props.isAuth ?  null : <Redirect to="/auth" />

        return(

            <div className={styles.cont}>

                {this.state.loading ? <Spinner/> : null}
                
                <Modal show={this.props.show} switch={this.props.switch} >
                    {redirect}
                    <div className={styles.dp}>
                        <div className={styles.change}>
                            <i className="fa fa-camera edit"> Upload DP
                                <input type="file" className={styles.upload} onChange={this.onUploadHandler}></input>  
                            </i>
                        </div>
                            
                        <div className={`${styles.change} ${styles.delete}`} onClick={this.props.deleteDP}>
                            <i className="fa fa-trash edit"> Delete DP
                            </i>
                        </div>
                    </div>

                    <div className={styles.txt}>
                        <input type="text" placeholder={localStorage.getItem("name")} className={styles.input} onChange={this.onNameChangeHandler}></input>
                        <button className={styles.bttn} onClick={this.onNameSubmit}>change name</button>
                    </div>

                        <Link to='/' style={{'textDecoration': 'none'}}>
                            <div className={styles.delete}  onClick={this.onDeleteAcc}>Delete Account !</div>
                        </Link>
                    

                </Modal>
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
        deleteAcc: () => dispatch(actions.deleteAcc())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);