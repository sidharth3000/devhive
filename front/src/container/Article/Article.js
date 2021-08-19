import React, {Component} from 'react';

import photo from '../../images/auth.jpg'
import styles from './Article.module.css'

class Article extends Component {

    render() {

     let tags = <div className={styles.tag_cont}>

                {this.props.tags.map(tag => (
                    <div className={styles.tag}>
                        {'#'+tag+" "}
                    </div>
                    
                ))}
     </div>

        return (

            <div className={styles.article}>

                <img className={styles.img} src={this.props.photo} />

                <div className={styles.info}>

                    <img className={styles.profile_photo} src={this.props.profile}/>

                    <div className={styles.creator}>
                        <a href={this.props.website} className={styles.name} >{this.props.name}</a>
                        <div className={styles.time}>{this.props.date}</div>
                        
                    </div>

                    <div className={styles.read}>{this.props.read_time} minutes read</div>
                   
                </div>

                {tags}

            <div className={styles.head}>
               {this.props.heading}
            </div>

            <div className={styles.content}>
            {this.props.content}
            <a href={this.props.full} className={styles.view}>read more</a>
            </div>
              
            
               
            </div>
        )
    }
}

export default Article