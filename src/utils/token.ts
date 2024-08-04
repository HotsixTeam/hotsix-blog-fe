/**
 * 토큰 저장 및 교환하는 유틸리티 함수
 * @param accessToken 로그인 시 서버와 교환하는 토큰
 * @param refreshToken 기존 토큰 만료 시 새로운 토큰을 발급받기 위해 사용되는 토큰
 */

export const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
};

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

export const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};