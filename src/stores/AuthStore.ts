import { inject, injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import { KeyType } from "../../src/services/LocalStorageService";
import type { LocalStorageService } from "../../src/services/LocalStorageService";
import type { AuthenticationService } from "../../src/services/AuthenticationService";
import ownTypes from "../ioc/ownTypes";

@injectable()
export default class AuthStore {

    @observable isAuthorized = false;
    @observable isAuthorized2 = 0;

    constructor(   
        @inject(ownTypes.localStorageService) private readonly localStorageService: LocalStorageService,
        @inject(ownTypes.authenticationService) private readonly authenticationService: AuthenticationService
   ) {
       makeObservable(this);
       this.updateAuthorizedState();
   }

    @action
    public updateAuthorizedState = () : void => {
      this.isAuthorized = !!this.localStorageService.get<string>(KeyType.Token);
    }

    @action
    public logout = () : void => {
        this.authenticationService.logout();
        this.updateAuthorizedState();
    }
}
