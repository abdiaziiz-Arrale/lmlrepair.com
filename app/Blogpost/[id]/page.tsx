'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';
import imageUrl from '../../../public/lml_logo.png';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from "@/components/website/header";
import Footer from "@/components/website/footer";
import { getPublishedPosts, getRelatedPosts, getSinglePost, } from '@/lib/db/postCrud';

interface PostProps {
   id      :        number      
  title    :       String
  content     :    String
  authorId    :    number
  blogCategoryId:  number
  tag        :     String
  published  :     Boolean 
  createdAt     :  Date  
  updatedAt  :     Date
  metaTitle?    :   String
  metaDescription? :String
  publishedAt?    : Date

}

export default function Post() {
  const pathname = usePathname();
  const postId = pathname.split('/').pop();

  const [post, setPost] = useState<PostProps | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

    async function fetchPostData() {
      try {
        const Id = parseInt(postId as string);
        const fetchedPost:any = await getSinglePost(Id);
        const post:any = await getPublishedPosts();
        setPost(fetchedPost);
        const  relatedPost:any = await getRelatedPosts(Id);
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

  return (
    <div>
      <div className="px-4 py-6 md:px-6 lg:py-16 mt-32">
        <div className="flex flex-col lg:flex-row">
          <article className="prose prose-gray max-w-3xl mx-auto dark:prose-invert lg:w-2/3">
            <div className="space-y-4 not-prose">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{post.title}</h1>
              <div className="flex items-center space-x-4">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{post.title.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm text-muted-foreground">
                  <div className="font-medium">{post.authorId}</div>
                  <div>Published on {new Date(post.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row mt-4">
              <figure className="lg:mr-8 lg:w-1/2">
                <img
                  src={imageUrl.src}
                  alt="Hero image"
                  width={625}
                  height={500}  // Increased height
                  className="aspect-auto overflow-hidden rounded-lg object-cover"
                />
              </figure>
              <div className="lg:w-1/2 mt-4 lg:mt-0">
                <p>{post.content}</p>
              </div>
            </div>
          </article>

          <aside className="lg:w-1/3 lg:pl-8 space-y-8 mt-14 lg:mt-0">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="text-lg font-bold">Latest Articles</h3>
              <div className="mt-4 space-y-4">
                {relatedPosts.map((latestPost: PostProps) => (
                  <Link href={`/Blog/post/${latestPost.id}`} key={latestPost.id} className="group grid grid-cols-[48px_1fr] items-center gap-4" prefetch={false}>
                    <img
                      src={imageUrl.src}
                      alt="Related Article Thumbnail"
                      width={48}
                      height={48}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-medium group-hover:underline">{latestPost.title}</h4>
                      <p className="text-xs text-muted-foreground">{new Date(latestPost.createdAt).toLocaleDateString()}</p>
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
        </div>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Related Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link href={`/Blog/post/${relatedPost.id}`} key={relatedPost.id} passHref>
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
                    <Link href={`/Blog/post/${relatedPost.id}`} className="text-nowrap bg-yellow-300 px-4 py-2 text-center rounded-md" prefetch={false}>
                      Read more
                    </Link>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href={`/Blog/post/`}>
              <Button variant="secondary" className="bg-yellow-400">View more</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
