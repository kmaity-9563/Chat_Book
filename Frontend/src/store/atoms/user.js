import atom from 'recoil';

export const userState = atom({
    name: 'userState',
    default: {
        isLogin: false
    }
})