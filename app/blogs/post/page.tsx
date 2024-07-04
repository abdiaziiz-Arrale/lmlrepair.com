"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPublishedPost, getAlllatestPosts } from '@/lib/_action';
import { PostProps } from '../../../lib/type';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import logo from '../../../public/newlogo.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/website/header';

const PostPage =  () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [Latestposts, setLatestposts] = useState<PostProps[]>([]);
  const [visiblePostsCount, setVisiblePostsCount] = useState(3); 
  const [loading, setLoading] = useState(true); 
  const [loadingfetchData, setLoadingfetchData] = useState(false); 

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const { post: newPosts } = await getAllPublishedPost();
      const { post: latestPosts } = await getAlllatestPosts();
      setPosts(newPosts.posts);
      setLatestposts(latestPosts.posts);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMorePosts = async () => {
    try {
      setLoading(true);
      const { post: newPosts } = await getAllPublishedPost();
      if (newPosts.posts && newPosts.posts.length > 0) {
        const updatedPosts = [...posts, ...newPosts.posts]; // Concatenate new posts with current posts
        setPosts(updatedPosts);
        setVisiblePostsCount(updatedPosts.length); // Set visible count to total posts
      } else {
        console.warn('No more new posts to fetch.');
      }
    } catch (error) {
      console.error('Error fetching more posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPreviousPosts = () => {
    // Simulate loading previous posts logic
    // In a real scenario, you would fetch older posts from another API endpoint or manage pagination
    console.log('Loading previous posts...');
  };

  return (
    
      <div className="min-h-screen bg-background">
      <header className="h-32 sticky top-0 z-30 border-b bg-background py-4 shadow-sm">
        <Header />
      </header>   {loading ? (
            <div className="flex items-center justify-center h-[100vh]">
              <div className="animate-spin rounded-full border-4 border-primary border-t-transparent h-12 w-12" />
            </div>
          ) : (
            <>
      <main className=" mx-12 py-12 px-4 md:px-1 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-8">
       
              <h2 className="mb-6 text-2xl font-bold">Posts</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {posts.slice(0, visiblePostsCount).map((post: PostProps) => (
                  <Link href={`/Blog/post/${post.id}`} key={post.id} passHref>
                    <Card key={post.id} className="hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                      <CardContent>
                        <img
                          src={logo.src}
                          width={600} // Adjusted width for larger image
                          height={337.5} // Adjusted height for larger image
                          alt="Blog post image"
                          className="aspect-video overflow-hidden rounded-lg object-cover"
                        />
                        <div className="mt-4 space-y-2">
                          <h3 className="text-xl font-semibold">{post.title}</h3>
                          <p className="text-muted-foreground line-clamp-3">{post.content}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6 border">
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>AC</AvatarFallback>
                              </Avatar>
                              <span>{post.author.name}</span>
                            </div>
                            <span className="mx-2">·</span>
                            <span>{new Date(post.createAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              {(visiblePostsCount < posts.length || loading) && (
                <div className="flex justify-center mt-4">
                  {visiblePostsCount < posts.length && (
                    <button
                      onClick={fetchMorePosts}
                      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      {loading ? 'Loading...' : 'View More'}
                    </button>
                  )}
                  {visiblePostsCount >= posts.length && <div></div>}
                </div>
              
          )}
        </section>
<aside className="lg:col-start-3 space-y-8 mt-14">
          <div className="rounded-lg bg-muted p-4">
            <h3 className="text-lg font-bold">Latest Articles</h3>
            <div className="mt-4 space-y-4">
              {Latestposts.map((post: PostProps) => (
                <Link href={`/Blog/post/${post.id}`} key={post.id} className="group grid grid-cols-[48px_1fr] items-center gap-4" prefetch={false}>
                  <img
                    src={logo.src}
                    alt="Related Article Thumbnail"
                    width={48}
                    height={48}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-medium group-hover:underline">{post.title}</h4>
                    <p className="text-xs text-muted-foreground">{new Date(post.createAt).toLocaleDateString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <h3 className="text-lg font-bold">Newsletter</h3>
            <div className="mt-4 space-y-2">
              <p className="text-sm">
                Subscribe to our newsletter to stay up-to-date with the latest news and trends in web development.
              </p>
              <form className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="flex-1" />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
        </aside>

            </main>
        </>
      )}
       
    </div>

  );
};

export default PostPage;

