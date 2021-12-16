import { inject, injectable } from "inversify";
import { action, makeObservable, observable, runInAction } from "mobx";
import ownTypes from "../../ioc/ownTypes";
import type { User } from "../../models/User";
import UserService from "../../services/UserService";
import history from '../../utils/router/history';

@injectable()
export default class UsersPageStore  {

    @observable users : User[] = [];
    @observable isLoading = false;
    @observable totalPages = 0;
    @observable currentPage = 1;

    constructor(   
        @inject(ownTypes.userService) private readonly userService: UserService
   ) {
       makeObservable(this);
   }

    @action
    public init = async () => {
        const urlParams = new URLSearchParams(history.location.search);
        const page = urlParams.get('page');
        this.currentPage = Number(page);

        this.getByPage(this.currentPage);
    }

    @action
    public changePage = async (page: number) => {
        history.replace(`/users?page=${page}`);
        this.currentPage = page;
        this.getByPage(this.currentPage);
    }

    private getByPage = async (page: number) => {
        try {
            this.isLoading = true;
            const result = await this.userService.getByPage(page);
            runInAction(()=> {
                this.users = result.data;
                this.totalPages = result.total_pages;
            });
            
          } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
            }
          }
          runInAction(()=> {
            this.isLoading = false;
        });
    }
}
