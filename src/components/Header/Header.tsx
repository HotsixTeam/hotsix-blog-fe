import search from '../../assets/images/search.png';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import defaultProfile from '../../assets/images/defaultProfile.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../types/UserData';
import { fetchUserProfile, logOut } from '../../api/userAPI';
import { useLoginStateStore } from '../../store';

interface Props {
  // user정보 받아오게 되면 optional 해젠
  userName?: string;
}

const handleLogout = () => {
  localStorage.removeItem('auth-cookie');
};

const Header = ({ userName = 'Hotsix' }: Props) => {
  const queryClient = useQueryClient();
  const { data: userData, error } = useQuery<UserData>({
    queryKey: ['getprofile'],
    queryFn: fetchUserProfile,
  });
  const { isLoggedIn, setIsLoggedIn } = useLoginStateStore();
  const profileImageUrl = userData?.profileImg || defaultProfile;
  userName = userData?.userName || 'Hotsix';
  const navigate = useNavigate();
  const { mutate: logoutMutate } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      setIsLoggedIn(false);
      queryClient.invalidateQueries({ queryKey: ['getprofile'] });
      navigate('/login');
    },
  });

  return (
    <header className="w-full py-[6px] border-b-1 border-skyblue shadow  flex justify-between items-center whitespace-nowrap">
      <div className="ml-14 text-3xl text-darkblue bold">
        <Link to="/">{userName}'s Blog</Link>
      </div>
      {isLoggedIn ? (
        <div className="w-120 h-15 pl-20 flex gap-4  ">
          <Link to="/search">
            <img src={search} className="w-9 h-9" />
          </Link>

          <button className=" text-sm p-2 border-solid border-2 border-darkblue rounded-[12px] text-darkblue font-MangoRegular">
            <Link to={`/myblog/${userData?.id}`}>내 블로그</Link>
          </button>

          <button className=" text-sm p-1 border-solid border-2 border-darkblue rounded-[12px] text-darkblue font-MangoRegular">
            <Link to="/post">새 글 작성</Link>
          </button>

          <Link to="/profile">
            <img
              src={profileImageUrl}
              className="w-8 h-8 cursor-pointer rounded-full"
              alt="User Icon"
            />
          </Link>

          <button
            className="text-darkblue text-regular font-MangoRegular text-sm mr-14"
            onClick={() => logoutMutate()}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <button
          className="text-darkblue text-regular font-MangoRegular text-sm mr-14"
          onClick={() => navigate('/login')}
        >
          로그인
        </button>
      )}
    </header>
  );
};

export default Header;
