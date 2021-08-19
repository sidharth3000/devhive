import React, {Component} from 'react';
import axios from 'axios'; 
import { connect } from 'react-redux';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Edit from '../Edit/Edit'
import Create from '../Create/Create'
import Post from '../../components/Post/Post'
import styles from './User.module.css';
import Spinner from '../../UI/Spinner/Spinner'
import * as actions from '../../store/actions/user'

class User extends Component {

    state = {
        avatar: null,
        create: false,
        posts: []
    }

    componentDidMount () {

        let config = {
            headers: {
              token: localStorage.getItem("token")
            }
        }

        axios.get('http://localhost:9000/avatar', config )
        .then( response =>{

        this.setState({avatar: response.data})
            
            
        }).catch( e => {
            console.log(e)
        })


        axios.get('http://localhost:9000/posts/me', config)
        .then((res) => {
            this.setState({posts: res.data})
        }).catch((e) => {
            console.log(e)
        })
    }

    switchModalHandler = () =>{
        this.setState({show_modal: !this.state.show_modal})
    }

    deleteDP = () => {

        let config = {
            headers: {
              token: localStorage.getItem("token")
            }
        }

        axios.delete('http://localhost:9000/users/me/avatar', config )
        .then( response =>{
            console.log(response)
            this.props.switch()
            window.location.reload(false);
        }).catch( e => {
            console.log(e)
        })
    }

    render(){

        const spinner = this.props.loading ? <Spinner/> : null

        let buffer = null

        const photo = btoa(String.fromCharCode(...new Uint8Array(buffer)));

        let posts =  <div >
                        {this.state.posts.map(post =>(
                            <Post 
                            key={post._id}
                            id={post._id}
                            title={post.title}
                            body={post.body}
                            time={post.time}
                            likes={post.likes}
                            photo = {post.photo}
                            profile = {this.state.avatar}
                            name = {localStorage.getItem('name')}
                            delete = {true}
                            />
                        ))}
                    </div>

// {this.state.posts.map(post =>(
//    console.log(post._id)
// ))}
    

        return(
            <React.Fragment>

                {spinner}

                <Create switch={this.props.switchCreate} show={this.props.create_modal}/>
                <Edit switch={this.props.switch} deleteDP={this.deleteDP} show={this.props.edit_modal}/> 

                <Navbar/>

                <div className={styles.dp}>
                    <img alt="user" className={styles.img} src={`data:image/jpg;base64,${this.state.avatar}`} />
                        <div className={styles.change} onClick={this.props.switch}>
                            <i className="fa fa-edit edit"></i>
                        </div>
                </div>

                <div className={styles.user}>&#x3c;{localStorage.getItem("name")} /&#x3e;</div>

                <div className={styles.create} onClick={this.props.switchCreate}>
                    <i className="fa fa-new edit"></i>Create New Post
                </div>

                {this.state.posts.length == 0 ?

                 <div className={styles.no_posts}>
                     <span className={styles.what}>¯\_(ツ)_/¯</span>
                     You have not posted anything yet!
                 </div> 

                 : 
                 
                 <div className={styles.posts}>
                    <div className={styles.my_posts}>My Posts</div>
                    {posts}
                </div>
                
                }

               

                <Footer/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        edit_modal: state.user.edit_modal,
        create_modal: state.user.create_modal,
        loading: state.auth.loading,
        isAuth: state.auth.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        switch: () => dispatch(actions.switchEdit()),
        switchCreate: () => dispatch(actions.switchCreate())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);