import { inject, injectable } from "inversify";
import { action, makeObservable } from "mobx";
import ownTypes from "../../ioc/ownTypes";
import history from "../../utils/router/history";
import AuthStore from "../AuthStore";

@injectable()
export default class UserCardStore {

    constructor(   
        @inject(ownTypes.authStore) private readonly authStore: AuthStore
   ) {
       makeObservable(this);
   }

    @action
    public navigate = async (id: number) => {
        this.authStore.isAuthorized2++;
        history.push(`/profile/${id}`);
    }
}
