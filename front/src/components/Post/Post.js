import axios from 'axios';
import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import { connect } from 'react-redux';

import styles from './Post.module.css';
import * as actions from '../../store/actions/user'
import classes from './Post.module.css';

class Post extends Component { 

    state = {
        comment: "",
        likes: this.props.likes
    }

    onCommenrchangeHandler = (event) => {
        this.setState({comment: event.target.value})
    }

    onCommnetHandleer = (ev) => {
        console.log("reached")

        let config = {
            headers: {
                token: localStorage.getItem('token')
            }
        }

        var d = new Date(),
        minutes = d.getMinutes().toString().length === 1 ? '0'+d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length === 1 ? '0'+d.getHours() : d.getHours(),
        ampm = d.getHours() >= 12 ? 'pm' : 'am',
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

       this.props.postComment(config, this.state.comment,  ev.target.id, d, localStorage.getItem('name'), localStorage.getItem('id') )
    }

    onLike = (ev) => {
        console.log(ev.target.id)
        let config = {
            headers: {
                token: localStorage.getItem('token')
            }
        }

        this.props.postLike(ev.target.id, config)

        setTimeout(() => {
            this.setState({likes: this.props.likes})
          }, 1000);

        
    }

    onPostDeletehandler = (e) => {

        let config = {
            headers: {
                token: localStorage.getItem('token')
            }
        }

        const id = {
            id: e.target.id
        }
        
        axios.post('http://localhost:9000/post/del', id, config )
        .then((res) => {
            console.log(res.data)
            window.location.reload(false);
        }).catch((err) => {
            console.log(err)
        })
    }


    render() {

        return(

            <div className={classes.post}  >
        
                <div className={styles.up_cont}>

                    <img src={`data:image/jpg;base64,${this.props.profile}`} className={styles.user}></img>

                    <div className={styles.info}>
                        <div className={styles.name}>{this.props.name} <span style={{"color": "rgb(141, 141, 141)", "fontSize": "15px"}}>posted an update</span></div>
                        <div className={styles.time}>{this.props.time}</div>
                    </div>

                </div>
                    


                <div className={classes.content}>
                    {this.props.photo ? <img src={`data:image/jpg;base64,${this.props.photo}`} className={styles.post_img}></img> : null}

                    <div className={styles.title}>{this.props.title}</div>
                    <div className={styles.body}>{this.props.body}</div>
                    </div>

                <div>
                    <div className={styles.number}>{this.state.likes}</div>
                    <button className={styles.like} id={this.props.id} onClick={this.onLike}><i id={this.props.id} className="fa fa-heart"></i></button>
                    <Link to={'/full/' + this.props.id}>
                        <button className={styles.full} id={this.props.id}>View Full Post</button>
                    </Link>
                    
<br/>
                    <div className={styles.cmmnt_cont}>
                        <input type="text" className={styles.cmmnt} placeholder="comment" onChange={this.onCommenrchangeHandler}></input>
                        <div className={styles.send}  onClick={this.onCommnetHandleer}><i class="fa fa-arrow-circle-right" id={this.props.id}></i></div>
                    </div>

                    {this.props.delete ?
                    <div className={styles.delete} id={this.props.id} onClick={this.onPostDeletehandler}>Delete Post</div>
                    :
                    null
                    }

                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onAuth: (name, email, pass, signup) => dispatch(actions.auth(name, email, pass, signup)),
        postComment: (config, comment, id, d, name) => dispatch(actions.postComment(config, comment, id, d, name)),
        postLike: (id, config) => dispatch(actions.postLike(id, config))
    }
}

export default connect(null, mapDispatchToProps)(Post);