import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import {isLogin} from 'utils/utils';

const { persistAtom } = recoilPersist();

// 전역상태를 만든고, export 해준다.
export const isLoginCheck = atom({
    key: 'isLogin',
    default: isLogin(),
    effects_UNSTABLE: [persistAtom]
});

export interface UserInfo {
    userName : string|null,
    schoolNumber : string|null,
    userType: string|null
}

export const userInfoState = atom<UserInfo>({
    key: 'userInfoState',
    default:{
        userName: null,
        schoolNumber: null,
        userType:null
    },
    effects_UNSTABLE: [persistAtom]
});