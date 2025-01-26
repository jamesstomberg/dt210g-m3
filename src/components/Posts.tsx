import { useState, useEffect } from 'react';
import { postHelpers } from '../helpers/Helpers.posts';
import { Post as PostInterface } from '../interfaces/Interface.Posts';
import ListPost from './ListPost';
import SinglePost from './SinglePost';
import { useSearchParams } from 'react-router-dom';

export default function Posts({
    optionalTitle = 'Blogginlägg',
    optionalParams = {},
}: {
    optionalTitle?: string;
    optionalParams?: object;
}) {
    const [posts, setPosts] = useState<PostInterface[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const postID = searchParams.get('id');

    useEffect(() => {
        const getPosts = async () => {
            let posts: PostInterface[] = [];
            setPosts(posts);
            setIsLoading(true);

            if (postID) {
                posts = await postHelpers.getPost(postID);
            } else {
                posts = await postHelpers.getPosts(optionalParams);
            }

            setPosts(posts);
            setIsLoading(false);
        };

        getPosts();
    }, [searchParams]);

    return (
        <section>
            <h2>{optionalTitle}</h2>

            {isLoading && <p>Laddar...</p>}

            {!posts.length && !isLoading && <p>Inga inlägg hittades.</p>}

            {!postID && (
                <ul>
                    {posts.map((post) => {
                        return <ListPost key={post.id} post={post} />;
                    })}
                </ul>
            )}

            {postID &&
                posts.map((post) => {
                    return <SinglePost key={post.id} post={post} />;
                })}
        </section>
    );
}
