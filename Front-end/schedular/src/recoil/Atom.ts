import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import {isLogin} from 'utils/utils';
import {UserInfo} from 'interfaces/GlobalState';
import {Events} from 'interfaces/CalendarState';
const { persistAtom } = recoilPersist();

// memo지혜 : 로그인상태 전역관리
export const isLoginCheck = atom({
    key: 'isLogin',
    default: isLogin(),
    effects_UNSTABLE: [persistAtom]
});
// memo지혜 : 유저정보를 전역관리
export const userInfoState = atom<UserInfo>({
    key: 'userInfoState',
    default:{
        userName: null,
        schoolNumber: null,
        userType:null
    },
    effects_UNSTABLE: [persistAtom]
});
// memo지혜 : 일정목록을 전역관리
export const EventState = atom<Events>({
    key: 'evtState',
    default:[],
    effects_UNSTABLE: [persistAtom]
});