
import React from 'react';
import BlogCard from '../blogs/blogsCards';
import Header from '@/components/website/header';

const blogs = [
  {
    title: 'How to Learn TypeScript',
    readTime: '12 mins read',
    backgroundImage: 'gall5.jpg',
  },
  {
    title: 'Next.js for Beginners',
    readTime: '8 mins read',
    backgroundImage: 'gall7.png',
  },
  // Add more blogs as needed
];

const Home: React.FC = () => {
  return (
    <>
      <Header />
      
      {/* <div className="container mx-auto p-4 mt-36">
      <h1 className="text-4xl tracking-widest text-red-500 mb-10 text-center">Read Our Blogs</h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              title={blog.title}
              readTime={blog.readTime}
              backgroundImage={blog.backgroundImage}
            />
          ))}
        </div>
      </div> */}
    </>
  );
};

export default Home;
