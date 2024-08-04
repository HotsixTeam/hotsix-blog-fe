import emailIcon from '../../assets/images/email.svg';
import gitIcon from '../../assets/images/github.svg';
import defaultProfile from '../../assets/images/defaultProfile.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { UserData } from '../../types/UserData';
import { fetchUserProfile, getUserProfile } from '../../api/userAPI';
import { useParams } from 'react-router-dom';

interface UserProps {
  userName: string;
  userEmail: string;
  gitUrl?: string;
  introduce?: string;
  profileImg?: string;
}

const SideUser = () => {
  // const [userData, setUserData] = useState<UserProps>({
  //   userName: '',
  //   userEmail: '',
  //   gitUrl: '',
  //   introduce: '',
  //   profileImg: '',
  // });
  const { id } = useParams<{ id: string }>();
  const getUserProfileFromId = () => {
    return getUserProfile(id);
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: userData } = useQuery<UserData>({
    queryKey: ['getprofile', id],
    queryFn: getUserProfileFromId,
  });

  return (
    <div className="w-80 flex flex-col items-center pt-16">
      <div className="w-36 h-36 bg-slate-300 rounded-full mb-6">
        <img
          src={userData?.profileImg || defaultProfile}
          alt="Profile Image"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="w-40 flex flex-col">
        <div className="mb-4 space-y-2">
          <p className="text-2xl font-MangoRegular">{userData?.userName}</p>
          <div className="flex flex-row items-start">
            <img src={emailIcon} alt="email icon" className="mr-2" />
            <p className="text-sm font-MangoRegular break-all ">
              {userData?.userId}
            </p>
          </div>
          {userData?.gitUrl && (
            <div className="flex flex-row items-start">
              <img src={gitIcon} alt="github icon" className="mr-2" />
              <p className="text-sm font-MangoRegular break-all ">
                {userData.gitUrl}
              </p>
            </div>
          )}
        </div>
        <div className="w-48 h-36 border-solid border-2 border-skyblue rounded-2xl font-MangoRegular text-small p-4">
          {userData?.introduce}
        </div>
      </div>
    </div>
  );
};

export default SideUser;
