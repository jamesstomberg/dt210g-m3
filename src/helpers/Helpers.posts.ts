import { apiClient } from '../utils';
import { api } from '../constants';
import { Post } from '../interfaces/Interface.Posts';

export const postHelpers = {
    getPosts: async (params?: Record<string, any>) => {
        const searchParams = params
            ? new URLSearchParams(
                  Object.entries(params).filter(
                      ([_, value]) => value !== undefined && value !== null && value !== ''
                  )
              )
            : null;

        const url = searchParams
            ? `${api.getPostsURL}?${searchParams.toString()}`
            : api.getPostsURL;

        const response = await apiClient.get(url);

        if (response.status !== 200) {
            return [];
        }

        return postHelpers.formatPostsRawToPosts(response);
    },

    getPost: async (id: string) => {
        const url = `${api.getPostsURL}/${id}`;

        const response = await apiClient.get(url);

        if (response.status !== 200) {
            return [];
        }

        const posts = postHelpers.formatPostsRawToPosts(response);

        return posts;
    },

    formatPostsRawToPosts: (response: any) => {
        let postsRaw: { [key: string]: any }[] = [];

        if (Array.isArray(response.data)) {
            postsRaw = response.data;
        } else if (
            response.data &&
            typeof response.data === 'object' &&
            Object.keys(response.data).length > 0
        ) {
            postsRaw = [response.data];
        } else {
            return [];
        }

        const posts: Post[] = postsRaw.map((rawPost) => ({
            id: rawPost.id,
            date: postHelpers.formatPostDate(rawPost.date),
            slug: rawPost.slug,
            title: rawPost.title,
            content: rawPost.content,
            categories: rawPost.categories,
            author: rawPost.author,
        }));

        return posts;
    },

    formatPostDate: (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    },
};
