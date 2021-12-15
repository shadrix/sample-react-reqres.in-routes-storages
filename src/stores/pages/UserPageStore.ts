import { injectable } from "inversify";
import { makeObservable } from "mobx";

@injectable()
export default class UserPageStore {


    constructor(   
   ) {
       makeObservable(this);
   }

}
