import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import loadPosts from '../../utils/loadPosts';
import Posts from '../../components/Posts/index';
import Button from '../../components/Button/index'
import { TextInput } from '../../components/TextInput';

    const Home = () => {
    
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [postsPerPage] = useState(5);
    const [searchValue, setSearchValue] = useState('');
    const noMorePosts = page + postsPerPage >= allPosts.length;

   

    const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
    }
     
    const handleLoadPosts = useCallback (async(page, postsPerPage) => {
      const postsAndPhotos = await loadPosts();

      setPosts(postsAndPhotos.slice(page, postsPerPage));
      setAllPosts(postsAndPhotos);
    },[])

    useEffect(() => {
      handleLoadPosts(0, postsPerPage);
    }, [handleLoadPosts, postsPerPage]);
  
    const handleChange = (e) => {
      const { value } = e.target;
  
      setSearchValue(value);
    }

    
    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }): posts;
      return (
        <section className ="container">
        <div className = 'search-container'>
          <TextInput 
          handleChange = {handleChange}
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
            onClick = {loadMorePosts}
            disabled = {noMorePosts}
            />
        )}
        
        </section>
      );
}


export default Home