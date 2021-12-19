import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import ownTypes from "../../ioc/ownTypes";
import type { User } from "../../models/User";
import UserService from "../../services/UserService";

@injectable()
export default class UsersPageStore  {

    users : User[] = [];
    isLoading = false;
    totalPages = 0;
    currentPage = 1;

    constructor(   
        @inject(ownTypes.userService) private readonly userService: UserService
   ) {
       makeAutoObservable(this);
   }

    
    public init = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page');
        this.currentPage = Number(page);
        
        try {
            this.isLoading = true;
            const result = await this.userService.getByPage(this.currentPage);
            this.users = result.data;
            this.totalPages = result.total_pages;
            
          } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
            }
          }
        this.isLoading = false;
    }

    
    public changePage = async (page: number) => {
        this.currentPage = page;
    }
}
