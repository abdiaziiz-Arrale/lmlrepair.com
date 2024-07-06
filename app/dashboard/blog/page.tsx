import CustomContainer from "@/components/CustomContainer";
import { getPosts } from "@/lib/db/postCrud"; // Updated to fetch posts
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/authOptions";
import { redirect } from "next/navigation";
import PostsTable from "@/components/PostsTable "; // Updated to use the posts table component

async function Posts() {
  const staffInSession: Session | null = await getServerSession(authOptions);
  if (!staffInSession) {
    redirect("/");
  }
  let posts: any = [];
  let error = "";

  try {
    posts = await getPosts(); // Updated to fetch posts
  } catch (err) {
    console.error("Error fetching posts:", err);
    error = "Check your internet connection.";
  }
  return (
    <CustomContainer>
      <div className="flex flex-col justify-center gap-8">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <PostsTable posts={posts} /> 
        )}
      </div>
    </CustomContainer>
  );
}

export default Posts;
