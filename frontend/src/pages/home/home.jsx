import React, {useState} from 'react';
import Header from '../../components/home/header/header';
import SearchBar from '../../components/home/searchBar/searchBar';
import BlogList from '../../components/home/blogList/blogList';
import {blogList} from '../../config/data';

const Home = () => {
 const [blogs, setBlogs] = useState(blogList);

 return (
  <div>
   {/* Page Header */}
   <Header />

   {/* SearchBar */}
   <SearchBar />

   {/* Blog List & Empty */}
   <BlogList blogs={blogs} />
  </div>
 );
};

export default Home;
