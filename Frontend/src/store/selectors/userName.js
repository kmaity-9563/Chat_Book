import {selector} from "recoil";
import { userState } from "../atoms/user";

export const userName = selector({
    key : "userNameState",
    get : ({get}) => {
       const State = get(userState);
       return State.userName;
    }
})