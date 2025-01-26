import DOMPurify from 'dompurify';
import { NavLink } from 'react-router-dom';
import { PostProps } from '../interfaces/Interface.Posts';

export default function ListPost({ post }: PostProps) {
    const sanitizedContent = DOMPurify.sanitize(post.content.rendered);
    const excerpt = sanitizedContent.substring(0, 50);

    return (
        <>
            <li key={post.id}>
                <div>
                    <h3>{post.title.rendered}</h3>

                    <div>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: excerpt + ' [...]',
                            }}
                        ></span>

                        <NavLink to={`/post?id=${post.id}`}>Läs mer</NavLink>
                    </div>
                </div>
            </li>
        </>
    );
}
