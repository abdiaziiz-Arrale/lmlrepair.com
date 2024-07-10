'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';
import imageUrl from '../../../public/lml_logo.png';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from "@/components/website/header";
import Footer from "@/components/website/footer";
import { getPublishedPosts, getRelatedPosts, getSinglePost } from '@/lib/db/postCrud';

interface PostProps {
  id: number
  title: string
  content: string
  authorId: number
  blogCategoryId: number
  tag: string
  published: boolean 
  createdAt: Date  
  updatedAt: Date
  metaTitle?: string
  metaDescription?: string
  publishedAt?: Date
}

export default function Post() {
  const pathname = usePathname();
  const postId = pathname.split('/').pop();

  const [post, setPost] = useState<PostProps | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    if (!postId) return;

    async function fetchPostData() {
      try {
        const Id = parseInt(postId as string);
        const fetchedPost = await getSinglePost(Id);
        const post = await getPublishedPosts();
        setPost(fetchedPost);
        const relatedPost = await getRelatedPosts(Id);
        setRelatedPosts(relatedPost?.relatedPosts); 
        setLoading(false);
      } catch (error) {
        setError('Error loading post');
        setLoading(false);
        console.error('Error loading post:', error);
      }
    }

    fetchPostData();
  }, [postId]);

  if (loading) {
    return <div className="flex items-center justify-center h-[100vh]">
              <div className="animate-spin rounded-full border-4 border-primary border-t-transparent h-12 w-12" />
            </div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const formatContent = (content: string) => {
    return content.split('.').map((sentence, index) => (
      <span key={index}>
        {sentence}.
        <br />
        <br />
      </span>
    ));
  };

  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8 px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-8">
          <div className="group relative overflow-hidden rounded-lg">
            <img
              src={imageUrl.src}
              alt="Featured post image"
              width={1200}
              height={800}
              className="h-[300px] w-full object-cover transition-all duration-300 group-hover:scale-105 md:h-[400px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-primary-foreground text-sm font-medium">
                  Featured
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>{post.title.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{post.authorId}</span>
                  </div>
                  <span className="text-sm">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          <article className="prose prose-gray max-w-none dark:prose-invert">
            {showFullContent ? (
              <>{formatContent(post.content)}</>
            ) : (
              <>{formatContent(post.content.substring(0, 300))}</>
            )}
            <Button onClick={toggleContent} className="mt-4 bg-yellow-400 text-black">
              {showFullContent ? 'Show Less' : 'See More'}
            </Button>
          </article>
          <section className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold">Related Posts</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link href={`/Blogpost/${relatedPost.id}`} key={relatedPost.id} passHref>
                  <Card key={relatedPost.id}>
                    <CardHeader>
                      <img
                        src={imageUrl.src} 
                        width={800}
                        height={200}
                        className="aspect-[3/2] rounded-t-lg object-cover"
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold">{relatedPost.title}</h3>
                    </CardContent>
                    <div className="flex items-center space-x-4 p-4">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{relatedPost.title.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm text-muted-foreground">
                        <div className="font-medium">{relatedPost.authorId}</div>
                        <div>Published on {new Date(relatedPost.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <CardFooter className="p-4 text-center">
                      <Link href={`/Blogpost/${relatedPost.id}`} className="text-nowrap bg-yellow-300 px-4 py-2 text-center rounded-md" prefetch={false}>
                        Read more
                      </Link>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="flex justify-center">
              <Link href={`/Blogpost/`}>
                <Button variant="secondary" className="bg-yellow-400">View more</Button>
              </Link>
            </div>
          </section>
        </div>
        <div className="sticky top-12 self-start space-y-8">
          <div className="grid gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Latest Articles</h2>
            <div className="grid gap-4">
              {relatedPosts.map((latestPost: PostProps) => (
                <Link href={`/Blogpost/${latestPost.id}`} key={latestPost.id} className="group grid grid-cols-[100px_1fr] items-start gap-4" prefetch={false}>
                  <img
                    src={imageUrl.src}
                    alt="Latest article thumbnail"
                    width={100}
                    height={100}
                    className="aspect-square rounded-lg object-cover transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium group-hover:underline">{latestPost.title}</h3>
                    <p className="text-sm text-muted-foreground">{new Date(latestPost.createdAt).toLocaleDateString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
