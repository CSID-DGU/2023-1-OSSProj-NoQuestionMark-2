import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

// 전역상태를 만든고, export 해준다.
export const isLoginCheck = atom({
    key: 'isLogin',
    default: false,
    effects_UNSTABLE: [persistAtom]
});

export interface UserInfo {
    userName : string|null,
    schoolNumber : string|null,
}

export const userInfoState = atom<UserInfo>({
    key: 'userInfoState',
    default:{
        userName: null,
        schoolNumber: null,
    },
    effects_UNSTABLE: [persistAtom]
});