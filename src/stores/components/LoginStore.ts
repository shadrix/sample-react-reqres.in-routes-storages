import { inject, injectable } from "inversify";
import { action, makeObservable, observable, runInAction } from "mobx";
import ownTypes from "../../ioc/ownTypes";
import type AuthenticationService from "../../services/AuthenticationService";
import AuthStore from "../AuthStore";

@injectable()
export default class LoginStore {

    @observable email = '';
    @observable password = '';
    @observable isLoading = false;
    @observable error = '';
    @observable token = '';

    constructor(   
        @inject(ownTypes.authenticationService) private readonly authenticationService: AuthenticationService,
        @inject(ownTypes.authStore) private readonly authStore: AuthStore
   ) {
       makeObservable(this);
   }

    @action
    public login = async () => {
        this.token = '';
        this.error = '';
        try {
            this.isLoading = true;
            const result = await this.authenticationService.login(this.email, this.password);
            runInAction(()=> {           
                 this.token = result.token;
            });
            this.authStore.updateAuthorizedState();
            
          } catch (e) {
            if (e instanceof Error) {
                this.error = e.message;
            }
          }
          runInAction(()=> {
            this.isLoading = false;
        });
    }

    @action
    public changeEmail = (text: string) : void => {
      this.email = text;
    }

    @action
    public changePassword = (text: string) : void => {
      this.password = text;
    }
}
