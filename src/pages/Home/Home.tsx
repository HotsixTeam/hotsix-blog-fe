import Header from '../../components/Header/Header';
import PostList from '../../components/Home/PostList';
import SideUser from '../../components/Home/SideUser';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-row justify-center">
        <PostList />
      </div>
    </div>
  );
};

export default Home;
