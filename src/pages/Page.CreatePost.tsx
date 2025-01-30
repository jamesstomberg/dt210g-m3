import CreateForm from '../components/CreateForm';

export default function CreatePostPage({ title }: { title: string }) {
    return <CreateForm title={title} />;
}
