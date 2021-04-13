import './styles.css';
import { Component } from 'react';
import loadPosts from '../../utils/loadPosts';
import Posts from '../../components/Posts/index';
import Button from '../../components/Button/index'
import { TextInput } from '../../components/TextInput';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: ''
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

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({searchValue: value})
  }

  render(){
    const { posts, page, postsPerPage, allPosts, searchValue} = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length;
    
    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
     : posts;
    
     return (
      <section className="container">
       <div className = 'search-container'>
        <TextInput 
        handleChange = {this.handleChange}
        searchValue = {searchValue} />
       </div>
       {filteredPosts.length === 0 &&(
         <h1>
           Post não encontrado.
         </h1>
       )}

        {filteredPosts.length > 0 &&(
         <Posts posts = {filteredPosts}/>
       )}
       
       {!searchValue &&(
          <Button 
          text = "Next"
          onClick = {this.loadMorePosts}
          disabled = {noMorePosts}
          />
       )}
      
      </section>
    );
  }
}


export default Home;