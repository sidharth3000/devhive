import React, {Component} from 'react';

import Navbar from '../../components/Navbar/Navbar';
import Head from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Post from './../../components/Post/Post'
import Spinner from '../../UI/Spinner/Spinner';
import axios from 'axios';
import styles from './Feed.module.css'

class Feed extends Component {

    state = {
        posts: [],
        loading: false
    }

    componentDidMount () {

        this.setState({loading:true})

        let config = {
            headers: {
              token: localStorage.getItem("token")
            }
        }

        axios.get('http://localhost:9000/posts', config)
        .then((res) => {
            this.setState({posts: res.data})
            this.setState({loading:false})
        })
        .catch((e) => {
            this.setState({loading:false})
            console.log(e)
        })
    }

    render(){

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
                            profile = {post.owner.avatar}
                            name = {post.owner.name}
                            
                            />
                        ))}
                    </div>

        return(
            <React.Fragment>

                {this.state.loading ? <Spinner/> : null}

                <Navbar/>

                <Head>FEED</Head>
                <div className={styles.posts}>
                    <div className={styles.my_posts}>Updates</div>
                    {posts}
                </div>
               

                <Footer/>
            </React.Fragment>
           
        )
    }
}

export default Feed;