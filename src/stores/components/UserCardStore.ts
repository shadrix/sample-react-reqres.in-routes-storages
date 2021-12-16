import { injectable } from "inversify";
import { action, makeObservable } from "mobx";
import history from "../../utils/router/history";

@injectable()
export default class UserCardStore {

    constructor(   
   ) {
       makeObservable(this);
   }

    @action
    public navigate = async (id: number) => {
        history.push(`/profile/${id}`);
    }
}
