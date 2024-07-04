// types.ts
export type User = {
    id: number;
    email: string;
    name?: string | null;
    posts: Post[];
};

export type Post = {
    id: number;
    title: string;
    content?: string | null;
    published: boolean;
    author: User;
    authorId: number;    
    createAt: Date 

    
};
