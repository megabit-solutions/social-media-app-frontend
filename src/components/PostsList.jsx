import React from 'react';
import { useGetPostsQuery, useDeletePostMutation } from '../services/apis/postApi';

const PostsList = () => {
    // Using query hook to fetch posts
    const { data: posts, error, isLoading, isError, refetch } = useGetPostsQuery();

    // Using mutation hook for delete operation
    const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

    const handleDelete = async (id) => {
        try {
            await deletePost(id).unwrap();
            console.log('Post deleted successfully');
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    if (isLoading) return <div>Loading posts...</div>;
    if (isError) return <div>Error: {error?.data?.message || error?.status}</div>;

    console.log(posts);
    return (
        <div>
            <h2>Posts List</h2>
            <button onClick={refetch} disabled={isLoading}>
                Refetch Posts
            </button>

            <div style={{ marginTop: '20px' }}>
                {posts?.map((post) => (
                    <div key={post.id} style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        margin: '10px 0',
                        borderRadius: '5px'
                    }}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <button
                            onClick={() => handleDelete(post.id)}
                            disabled={isDeleting}
                            style={{
                                backgroundColor: '#ff4444',
                                color: 'white',
                                padding: '5px 10px',
                                border: 'none',
                                borderRadius: '3px',
                                cursor: 'pointer'
                            }}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostsList;