import './styles.css';
import { Component } from 'react';
import loadPosts from '../../utils/loadPosts';
import Posts from '../../components/Posts/index';
import Button from '../../components/Button/index'

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2
  };

  async componentDidMount(){
    await this.loadPosts();
  }


   loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts);

    this.setState({
      posts,
      page: nextPage
    });
   }
   
  loadPosts = async() => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,

    });
  }


  render(){
    const { posts, page, postsPerPage, allPosts} = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length;
    return (
      <section className="container">
       <Posts posts = {posts}/>
       <Button 
       text = "Next"
       onClick = {this.loadMorePosts}
       disabled = {noMorePosts}
       />
      </section>
    );
  }
}


export default Home;