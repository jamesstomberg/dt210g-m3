import DOMPurify from 'dompurify';
import { NavLink } from 'react-router-dom';
import { PostProps } from '../interfaces/Interface.Posts';
import { useUserStore } from '../stores/Store.UserStore';
import '@/assets/scss/SinglePost.scss';

export default function SinglePost({ post }: PostProps) {
    const sanitizedContent = DOMPurify.sanitize(post.content.rendered);
    const userStore = useUserStore();

    return (
        <>
            <div style={{ marginBottom: '2rem' }}>
                <NavLink className="btn" to={`/post`}>
                    Se alla inlägg
                </NavLink>
            </div>

            {userStore.isLoggedIn && post.author === userStore.userID && (
                <NavLink to={`/edit-post?id=${post.id}`} className="btn">Hantera inlägg</NavLink>
            )}

            <article key={post.id} className="single-post">
                <h3>{post.title.rendered}</h3>

                <div
                    dangerouslySetInnerHTML={{
                        __html: sanitizedContent,
                    }}
                ></div>
            </article>
        </>
    );
}
