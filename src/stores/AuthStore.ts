import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import { KeyType } from "../../src/services/LocalStorageService";
import type { LocalStorageService } from "../../src/services/LocalStorageService";
import type { AuthenticationService } from "../../src/services/AuthenticationService";
import ownTypes from "../ioc/ownTypes";

@injectable()
export default class AuthStore {

    isAuthorized = false;

    constructor(   
        @inject(ownTypes.localStorageService) private readonly localStorageService: LocalStorageService,
        @inject(ownTypes.authenticationService) private readonly authenticationService: AuthenticationService
   ) {
       makeAutoObservable(this);
       this.updateAuthorizedState();
   }

    
    public updateAuthorizedState = () : void => {
      this.isAuthorized = !!this.localStorageService.get<string>(KeyType.Token);
    }

    
    public logout = () : void => {
        this.authenticationService.logout();
        this.updateAuthorizedState();
    }
}
