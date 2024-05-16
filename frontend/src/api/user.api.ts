import axios, { AxiosResponse } from 'axios';

// 사용자 정보의 타입 정의
export interface IUserInfo {
  email: string;
  nickname: string;
}

// 사용자 정보를 조회하는 함수
export const getUserInfo = async (): Promise<IUserInfo> => {
  try {
    // API 요청 보내기
    const response: AxiosResponse<IUserInfo> =
      await axios.get<IUserInfo>('/users/me');

    // 응답 데이터 반환
    return response.data;
  } catch (error) {
    // 오류 처리
    console.error('Error fetching user info:', error);
    throw error;
  }
};
