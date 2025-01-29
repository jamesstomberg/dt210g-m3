import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { postHelpers } from '../helpers/Helpers.posts';
import { Post as PostInterface } from '../interfaces/Interface.Posts';
import { useUserStore } from '../stores/Store.UserStore';
import { Navigate, useNavigate } from 'react-router-dom';
import { routes } from '../constants';
import { NavLink } from 'react-router-dom';
import { validation } from '../constants';
import * as Yup from 'yup';
import { apiPost, apiDelete } from '../utils';
import DOMPurify from 'dompurify';

export default function EditForm({ title }: { title: string }) {
    const [posts, setPosts] = useState<PostInterface[]>([]);
    const [post, setPost] = useState<PostInterface | null>(null);
    const [postTitle, setPostTitle] = useState<string | undefined>('');
    const [postContent, setPostContent] = useState<string | undefined>('');
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const postID = searchParams.get('id');
    const userStore = useUserStore();
    const [redirect, setRedirect] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

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

    const editPost = async (postData: {
        postID: number | undefined;
        title: string | undefined;
        content: string | undefined;
    }) => {
        const data = await apiPost<any>(`/wp/v2/posts/${postData.postID}`, {
            ...postData,
        });

        return data;
    };

    const validateEditPostForm = async (data: object): Promise<boolean> => {
        try {
            await validation.postForm.validate(data, { abortEarly: false });
            setErrors([]);

            return true;
        } catch (error: unknown) {
            if (error instanceof Yup.ValidationError) {
                setErrors(error.errors);
            }

            return false;
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = {
            postID: post?.id,
            post_title: postTitle,
            post_content: postContent,
        };

        const isValid = await validateEditPostForm(formData);

        if (!isValid) {
            return;
        }

        try {
            const data = await editPost({
                postID: formData.postID,
                title: formData.post_title,
                content: formData.post_content,
            });

            if (data) {
                setSuccess(true);
                setErrors([]);

                setTimeout(() => {
                    setSuccess(false);
                }, 2000);
            }
        } catch (error: any) {
            console.log(error);

            if (error.code === 'ERR_NETWORK') {
                setErrors([
                    'Kunde inte ansluta till server. Vänligen kontrollera din anslutning eller försök igen senare.',
                ]);
            } else if (error.response?.data?.message) {
                setErrors([error.response.data.message]);
            } else {
                setErrors(['Ett oväntat fel inträffade. Vänligen försök igen senare.']);
            }
        }
    };

    const deletePost = async (postID: number | undefined) => {
        const data = await apiDelete<any>(`/wp/v2/posts/${postID}`);

        return data;
    };

    const handleDelete = async (e: any) => {
        e.preventDefault();

        if (!confirm('Är du säker på att du vill radera inlägget?')) {
            return;
        }

        try {
            const data = await deletePost(post?.id);

            if (data) {
                navigate(routes.About.path, { replace: true });
            }
        } catch (error: any) {
            console.log(error);

            if (error.code === 'ERR_NETWORK') {
                setErrors([
                    'Kunde inte ansluta till server. Vänligen kontrollera din anslutning eller försök igen senare.',
                ]);
            } else if (error.response?.data?.message) {
                setErrors([error.response.data.message]);
            } else {
                setErrors(['Ett oväntat fel inträffade. Vänligen försök igen senare.']);
            }
        }
    };

    if (redirect) {
        return <Navigate to={routes.About.path} replace />;
    }

    return (
        <>
            <section>
                <h1>{title}</h1>

                <NavLink to={`/post`}>Se alla inlägg</NavLink>

                <div>
                    {isLoading && <div>Laddar...</div>}

                    {errors && (
                        <div className="edit-form__errors">
                            <ul>
                                {errors.map((error, index) => (
                                    <li key={index}>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(error),
                                            }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {success && (
                        <div className="edit-form__success">
                            <p>Inlägget uppdaterades!</p>
                        </div>
                    )}

                    {postID && !isLoading && posts.length === 0 && (
                        <div>Inget blogginlägg hittades.</div>
                    )}

                    {!postID && <div>Ogiltigt ID för blogginlägg.</div>}

                    {postID && posts.length > 0 && (
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

                            <button onClick={handleDelete}>Radera</button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
