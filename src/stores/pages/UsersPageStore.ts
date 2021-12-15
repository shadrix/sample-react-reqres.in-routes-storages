import { injectable } from "inversify";
import { makeObservable } from "mobx";

@injectable()
export default class UsersPageStore {


    constructor(   
   ) {
       makeObservable(this);
   }

}
