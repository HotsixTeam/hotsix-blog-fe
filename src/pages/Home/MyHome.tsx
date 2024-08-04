import Header from '../../components/Header/Header';
import MyPostList from '../../components/Home/MyPostList';
import PostList from '../../components/Home/PostList';
import SideUser from '../../components/Home/SideUser';

const MyHome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-row justify-center">
        <SideUser />
        <MyPostList />
      </div>
    </div>
  );
};

export default MyHome;
