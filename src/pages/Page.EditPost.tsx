import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { postHelpers } from '../helpers/Helpers.posts';
import { Post as PostInterface } from '../interfaces/Interface.Posts';
import { useUserStore } from '../stores/Store.UserStore';
import { Navigate } from 'react-router-dom';
import { routes } from '../constants';

export default function EditPostPage({ title }: { title: string }) {
    const [posts, setPosts] = useState<PostInterface[]>([]);
    const [post, setPost] = useState<PostInterface | null>(null);
    const [postTitle, setPostTitle] = useState<string | undefined>('');
    const [postContent, setPostContent] = useState<string | undefined>('');
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const postID = searchParams.get('id');
    const userStore = useUserStore();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const getPosts = async () => {
            let posts: PostInterface[] = [];
            setPosts(posts);
            setIsLoading(true);

            if (postID) {
                posts = await postHelpers.getPost(postID);
            } else {
                posts = [];
            }

            setPosts(posts);

            if (posts.length > 0) {
                const fetchedPost = posts[0];
                setPost(fetchedPost);
                setPostTitle(fetchedPost.title.rendered);
                setPostContent(fetchedPost.content.rendered);

                if (fetchedPost.author !== userStore.userID) {
                    setRedirect(true);
                }
            }

            setIsLoading(false);
        };

        getPosts();
    }, [searchParams]);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const formData = {
            postTitle,
            postContent,
        };
    };

    if (redirect) {
        return <Navigate to={routes.About.path} replace />;
    }

    return (
        <>
            <section>
                <h1>{title}</h1>

                {isLoading && <div>Laddar...</div>}

                {postID && !isLoading && posts.length === 0 && (
                    <div>Inget blogginlägg hittades.</div>
                )}

                {!postID && <div>Ogiltigt ID för blogginlägg.</div>}

                {postID && posts.length > 0 && postTitle && postContent && (
                    <div>
                        <form>
                            <div>
                                <label htmlFor="postTitle">Titel</label>
                                <input
                                    type="text"
                                    name="postTitle"
                                    id="postTitle"
                                    value={postTitle}
                                    onChange={(e) => {
                                        setPostTitle(e.target.value);
                                    }}
                                />
                            </div>

                            <div>
                                <label htmlFor="postContent">Innehåll</label>
                                <textarea
                                    id="postContent"
                                    value={postContent}
                                    onChange={(e) => {
                                        setPostContent(e.target.value);
                                    }}
                                ></textarea>
                            </div>

                            <input type="submit" value="Spara" onClick={handleSubmit} />
                        </form>

                        <button>Radera</button>
                    </div>
                )}
            </section>
        </>
    );
}
