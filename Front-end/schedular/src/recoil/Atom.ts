import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import {isLogin} from 'utils/utils';
import {UserInfo} from 'interfaces/GlobalState';
import {Events} from 'interfaces/CalendarState';
const { persistAtom } = recoilPersist();

// 전역상태를 만든고, export 해준다.
export const isLoginCheck = atom({
    key: 'isLogin',
    default: isLogin(),
    effects_UNSTABLE: [persistAtom]
});

export const userInfoState = atom<UserInfo>({
    key: 'userInfoState',
    default:{
        userName: null,
        schoolNumber: null,
        userType:null
    },
    effects_UNSTABLE: [persistAtom]
});

export const EventState = atom<Events>({
    key: 'evtState',
    default:[],
    effects_UNSTABLE: [persistAtom]
});