import { apiSlice } from "../apiSlice";

// Inject endpoints into the apiSlice
export const postsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all posts
    getPosts: builder.query({
      query: () => ({ url: "/posts", method: "GET" }),
      providesTags: ["Post"],
    }),

    // Get single post by ID
    getPostById: builder.query({
      query: (id) => ({ url: `/posts/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    // Create new post
    createPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        data: post,
      }),
      invalidatesTags: ["Post"],
    }),

    // Update post
    updatePost: builder.mutation({
      query: ({ id, ...post }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        data: post,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),

    // Delete post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
