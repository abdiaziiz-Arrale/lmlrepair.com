// components/BlogCard.tsx
import React from 'react';

type BlogCardProps = {
  title: string;
  readTime: string;
  backgroundImage: string;
};

const BlogCard: React.FC<BlogCardProps> = ({ title, readTime, backgroundImage }) => {
  return (
    <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
      <div
        className="bg-cover bg-center h-40"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <span className="text-gray-500">{readTime}</span>
      </div>
    </div>
  );
};

export default BlogCard;
