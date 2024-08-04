import React, { useState, useEffect, useCallback } from 'react';
import { fetchPosts, PostData } from '../../api/auth';
import Post from './Post';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '../../api/postAPI';
import { Link } from 'react-router-dom';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(3);
  const [totalItems, setTotalItems] = useState<number>(15);
  const [pageSize, setPageSize] = useState<number>(6);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['infinitePosts'],
    queryFn: getPosts,
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

  // const loadPosts = useCallback(
  //   async (page: number) => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetchPosts(
  //         page,
  //         pageSize,
  //         totalItems,
  //         totalPages,
  //       );
  //       console.log(response);
  //       const filteredPosts = response.posts.filter((post) => post.showStatus); // showStatus가 true인 게시물만 필터링

  //       setPosts((prevPosts) => [...prevPosts, ...filteredPosts]);

  //       // pagination 데이터 처리
  //       setTotalPages(response.pagination.totalPages);
  //       setTotalItems(response.pagination.totalItems);
  //       setCurrentPage(response.pagination.currentPage);
  //       setPageSize(response.pagination.pageSize);
  //       // setError(null);
  //     } catch (err) {
  //       console.error('Failed to fetch posts:', err);
  //       // setError('Failed to fetch posts');
  //     }
  //     setIsLoading(false);
  //   },
  //   [pageSize, totalItems, totalPages],
  // );

  // useEffect(() => {
  //   loadPosts(currentPage);
  // }, [currentPage, loadPosts]);

  // const { ref, inView } = useInView({
  //   threshold: 0.5, // 화면의 50%가 보일 때 트리거
  // });

  // useEffect(() => {
  //   if (inView && !isLoading && currentPage < totalPages) {
  //     setCurrentPage((prevPage) => prevPage + 1);
  //   }
  // }, [inView, isLoading, currentPage, totalPages]);

  // if (isLoading && posts.length === 0) {
  //   return <div className="pt-14">로딩중...</div>;
  // }

  // if (error) {
  //   return <div className="pt-14">{error}</div>;
  // }

  return (
    <div>
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
          <div className="w-postWidth h-postHeight flex align-center justify-center">
            No more posts...
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;
