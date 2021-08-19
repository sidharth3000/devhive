import axios from 'axios';
import React, {Component} from 'react';
import { connect } from 'react-redux';

import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import styles from './Full.module.css'
import * as actions from '../../store/actions/user'

class Full extends Component {

    state ={
        comment: "",
        post : {},
        owner : {},
        comments: []
    }

    onCommenrchangeHandler = (event) => {
        this.setState({comment: event.target.value})
    }

    onCommnetHandleer = () => {

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
        const time =  days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm;

       this.props.postComment(config, this.state.comment,   this.state.post.id, d, localStorage.getItem('name'), localStorage.getItem('id') )
    }


    onLike = () => {
        console.log("like")
        let config = {
            headers: {
                token: localStorage.getItem('token')
            }
        }

        this.props.postLike(this.state.post.id, config)
    }

    componentDidMount () {

        
        let config = {
            headers: {
                token: localStorage.getItem('token')
            }
        }

        const data = {
            id: this.props.match.params.id
        }
        
        axios.post('http://localhost:9000/fullpost',data, config )
        .then((res) => {
            this.setState({post: res.data})
            this.setState({owner: this.state.post.owner})
            this.setState({comments: this.state.post.comment})
            console.log(res.data)
        })
        .catch((event) => {
            console.log(event)
        })
    }

    render() {

        const cmmnts = 
            
                 this.state.comments.map(cmmnt => (
                    <div className={styles.cmmnt}>
                        <div className={styles.cmmnt_body}>{cmmnt.body}</div>    
                        <div className={styles.cmmnt_name}>{cmmnt.name}</div>
                        <div className={styles.cmmnt_time}>{cmmnt.time}</div>
                    </div>
                    ))
            
      
        return(

            <div>
                <Navbar/>

                <div className={styles.cont}>
                    <div className={styles.post}>
                        
                        <img alt="user" className={styles.user_img} src={`data:image/jpg;base64,${this.state.owner.avatar}`} />
                        <div className={styles.name}>{this.state.owner.name}</div>
                        <div className={styles.date}>{this.state.post.time}</div>
                        <div className={styles.title}>{this.state.post.title}</div>

                        {
                            this.state.post.photo ? 
                            <img alt="user" className={styles.post_img} src={`data:image/jpg;base64,${this.state.post.photo}`} />
                            :
                            null
                        }
                        
                        <div className={styles.body}>{this.state.post.body}</div>
<br/>
                        <div className={styles.number}>{this.state.post.likes}</div>
                        <div className={styles.like} onClick={this.onLike}><i className="fa fa-heart"></i></div>
<br/>
                        <input type="text" className={styles.write_cmmnt} placeholder="comment" onChange={this.onCommenrchangeHandler}></input>
                        <div className={styles.send}  onClick={this.onCommnetHandleer}>Post</div>
                    </div>

                    <div className={styles.cmmnts}>
                        <div className={styles.cmmnts_head}>Comments</div>
                        <div className={styles.cmmnts_body}>
                            {cmmnts}
                            
                        </div>
                       
                    </div>
                </div>
                
                <Footer/>
            </div>
           
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postComment: (config, comment, id, d, name) => dispatch(actions.postComment(config, comment, id, d, name)),
        postLike: (id, config) => dispatch(actions.postLike(id, config))
    }
}

export default connect(null, mapDispatchToProps)(Full);