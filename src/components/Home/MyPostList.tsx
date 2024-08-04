import React, { useState, useEffect, useCallback } from 'react';
import { fetchPosts, PostData } from '../../api/auth';
import Post from './Post';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getMyPosts, getPosts } from '../../api/postAPI';
import { Link, useParams } from 'react-router-dom';
import { UserData } from '../../types/UserData';
import { fetchUserProfile, getUserProfile } from '../../api/userAPI';
import defaultProfile from '../../assets/images/defaultProfile.png';
const MyPostList: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(3);
  const [totalItems, setTotalItems] = useState<number>(15);
  const [pageSize, setPageSize] = useState<number>(6);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const getUserProfileFromId = () => {
    return getUserProfile(id);
  };
  const { data: userData } = useQuery<UserData>({
    queryKey: ['getprofile', id],
    queryFn: getUserProfileFromId,
  });
  const fetchPosts = ({ pageParam = 1 }) => {
    return getMyPosts({ userId: Number(id), pageParam }); // userId는 실제 값으로 설정
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['infinitePosts', userData?.userName],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return pages.length < lastPage.pagination.totalPages
        ? pages.length + 1
        : undefined;
    },
  });
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isFetchingNextPage
      ) {
        return;
      }
      if (hasNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="flex flex-row  my-16 justify-center align-center">
        <h1 className="flex  text-5xl font-black text-center">
          {userData?.userName}의 블로그
        </h1>
      </div>
      {data.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.posts.map((post: any) => (
            <div key={post.id} className="my-4">
              <Link to={`/posts/${post.id}`}>
                <Post
                  title={post.title}
                  content={post.description}
                  thumbSrc={post.thumb}
                  likeCount={post.likeCount}
                  showStatus={post.showStatus}
                  id={post.id}
                />
              </Link>
            </div>
          ))}
        </React.Fragment>
      ))}
      <div>
        {isFetchingNextPage && <div>Loading more...</div>}
        {!hasNextPage && (
          <div className="w-postWidth h-postHeight  flex justify-center">
            No more posts...
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPostList;
