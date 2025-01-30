import { useState, useEffect } from 'react';
import { useUserStore } from '../stores/Store.UserStore';
import { useNavigate } from 'react-router-dom';
import { routes } from '../constants';
import { NavLink } from 'react-router-dom';
import { validation } from '../constants';
import * as Yup from 'yup';
import { apiPost } from '../utils';
import DOMPurify from 'dompurify';

export default function CreateForm({ title }: { title: string }) {
    const [postTitle, setPostTitle] = useState<string | undefined>('');
    const [postContent, setPostContent] = useState<string | undefined>('');
    const [isLoading, setIsLoading] = useState(false);
    const userStore = useUserStore();
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {}, []);

    const createPost = async (postData: {
        postID: number | undefined;
        title: string | undefined;
        content: string | undefined;
        status: string;
    }) => {
        const data = await apiPost<any>(`/wp/v2/posts/`, {
            ...postData,
        });

        return data;
    };

    const validateCreatePostForm = async (data: object): Promise<boolean> => {
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
            postID: 0,
            post_title: postTitle,
            post_content: postContent,
        };

        const isValid = await validateCreatePostForm(formData);

        if (!isValid) {
            return;
        }

        try {
            const data = await createPost({
                postID: formData.postID,
                title: formData.post_title,
                content: formData.post_content,
                status: 'publish',
            });

            // Navigate to all posts on success.
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

    return (
        <>
            <section>
                <h1>{title}</h1>

                <NavLink to={`/post`}>Se alla inlägg</NavLink>

                <div>
                    {isLoading && <div>Laddar...</div>}

                    {errors && (
                        <div className="create-form__errors">
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
                    </div>
                </div>
            </section>
        </>
    );
}
