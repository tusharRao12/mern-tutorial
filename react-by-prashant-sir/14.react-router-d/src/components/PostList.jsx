import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData} from "../store/posts-list-store";
import WelcomeMessage from './WelcomeMessage';
import LoadingSpineer from "./LoadingSpineer";
const PostList = () => {
  const { postList, fetching } = useContext(PostListData);
  return (
    <>
      {fetching && <LoadingSpineer />}
      {!fetching && postList.length === 0 && <WelcomeMessage />}
      {!fetching && postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
}

export default PostList;