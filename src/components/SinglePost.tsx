import DOMPurify from 'dompurify';
import { NavLink } from 'react-router-dom';
import { PostProps } from '../interfaces/Interface.Posts';

export default function SinglePost({ post }: PostProps) {
    const sanitizedContent = DOMPurify.sanitize(post.content.rendered);

    return (
        <>
            <NavLink to={`/post`}>Se alla inlägg</NavLink>
            <article key={post.id}>
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
