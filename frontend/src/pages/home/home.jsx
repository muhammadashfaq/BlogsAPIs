import React, {useState} from 'react';
import Header from '../../components/home/header/header';
import SearchBar from '../../components/home/searchBar/searchBar';
import EmptyList from '../../components/common/EmptyList';
import BlogList from '../../components/home/blogList/blogList';
import {blogList} from '../../config/data';

const Home = () => {
 const [blogs, setBlogs] = useState(blogList);
 const [searchKey, setSearchKey] = useState('');

 // Search submit
 const handleSearchBar = (e) => {
  e.preventDefault();
  handleSearchResults();
 };

 // Search for blog by category
 const handleSearchResults = () => {
  const allBlogs = blogList;
  const filteredBlogs = allBlogs.filter((blog) =>
   blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
  );
  setBlogs(filteredBlogs);
 };

 // Clear search and show all blogs
 const handleClearSearch = () => {
  setBlogs(blogList);
  setSearchKey('');
 };

 return (
  <div>
   <Header />
   <SearchBar
    value={searchKey}
    clearSearch={handleClearSearch}
    formSubmit={handleSearchBar}
    handleSearchKey={(e) => setSearchKey(e.target.value)}
   />
   {!blogs.length ? <EmptyList /> : <BlogList blogs={blogs} />}
  </div>
 );
};

export default Home;
