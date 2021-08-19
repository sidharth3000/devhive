import React, {Component} from 'react';
import axios from 'axios';

import Nav from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Article from '../Article/Article'
import Head from '../../components/Header/Header'
import Spinner from '../../UI/Spinner/Spinner';
import styles from './News.module.css'

class News extends Component {

    state = {
        posts: [],
        loading: false
    }

    componentDidMount () {

        this.setState({loading:true})

        axios.get('https://dev.to/api/articles')
        .then((res) => {
            this.setState({posts: res.data})
            console.log(this.state.posts)
            this.setState({loading:false})
        }).catch((e) => {
            console.log(e)
            this.setState({loading:false})
        })
    }

    render(){

        let posts = <div className={styles.articles}>
                        {this.state.posts.map( post => (
                            <Article 
                            id = {post.id}
                            photo = {post.cover_image}
                            profile = {post.user.profile_image}
                            name = {post.user.name}
                            date = {post.readable_publish_date}
                            tags = {post.tag_list}
                            website = {post.user.website_url}
                            heading = {post.title}
                            content = {post.description}
                            full = {post.canonical_url}
                            read_time = {post.reading_time_minutes}
                            />
                        ))}
                    </div>

        return(
            <div>

                {this.state.loading ? <Spinner/> : null}

                <Nav/>

                <Head>NEWS</Head>

            {posts}

        
          <Footer/>

          </div>
           
        )
    }
}

export default News;