export interface UserData {
  userId?: number;
  password?: string;
  userName?: string;
  profileImg?: string | null;
  gitUrl?: string | undefined;
  introduce?: string | undefined;
  id?: number | undefined;
}
export interface NewUserData {
  newUserName?: string;
  newProfileImg?: string | null;
  newGitUrl?: string | undefined;
  newIntroduce?: string | undefined;
}
