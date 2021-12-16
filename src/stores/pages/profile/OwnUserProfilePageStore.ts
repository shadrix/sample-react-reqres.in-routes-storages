import { inject, injectable } from "inversify";
import { action, makeObservable, observable, runInAction } from "mobx";
import ownTypes from "../../../ioc/ownTypes";
import type { User } from "../../../models/User";
import UserService from "../../../services/UserService";

@injectable()
export default class OwnUserProfilePageStore {

    @observable user : User | null = null;
    @observable isLoading = false;
    @observable error = '';

    constructor(   
        @inject(ownTypes.userService) private readonly userService: UserService
   ) {
       makeObservable(this);
   }

   @action
    public init = async () => {
        this.error = '';
        try {
            this.isLoading = true;
            const result = await this.userService.getById(1);
            runInAction(()=> {
                this.user = {
                    ...result
                };
            });
            
          } catch (e) {
            if (e instanceof Error) {
                this.error = e.message;
            }
          }
          runInAction(()=> {
            this.isLoading = false;
        });
    }

}
