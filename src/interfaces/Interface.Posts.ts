export interface PostTitle {
    rendered: string;
}

export interface PostContent {
    rendered: string;
}

export interface PostProps {
    post: Post;
}

export interface Post {
    id: number;
    date: string;
    slug: string;
    title: PostTitle;
    content: PostContent;
    categories: [number];
    author: number;
}
