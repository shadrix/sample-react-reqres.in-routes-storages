import { Container } from 'inversify';
import type { AuthenticationService} from '../services/AuthenticationService';
import DefaultAuthenticationService from '../services/AuthenticationService';
import type { HttpService} from '../services/HttpService';
import DefaultHttpService from '../services/HttpService';
import type { UserService} from '../services/UserService';
import DefaultUserService from '../services/UserService';
import HomePageStore from '../stores/pages/HomePageStore';
import UserPageStore from '../stores/pages/UserPageStore';
import UsersPageStore from '../stores/pages/UsersPageStore';
import UserStore from '../stores/components/UserStore'
import UsersStore from '../stores/components/UsersStore'
import LoginStore from '../stores/components/LoginStore'
import ownTypes from './ownTypes';

export const container = new Container();
container.bind<HttpService>(ownTypes.httpService).to(DefaultHttpService).inSingletonScope();
container.bind<UserService>(ownTypes.userService).to(DefaultUserService).inSingletonScope();
container.bind<AuthenticationService>(ownTypes.authenticationService).to(DefaultAuthenticationService).inSingletonScope();

container.bind<HomePageStore>(ownTypes.homePageStore).to(HomePageStore).inTransientScope();
container.bind<UserPageStore>(ownTypes.userPageStore).to(UserPageStore).inTransientScope();
container.bind<UsersPageStore>(ownTypes.usersPageStore).to(UsersPageStore).inTransientScope();

container.bind<UserStore>(ownTypes.userStore).to(UserStore).inTransientScope();
container.bind<UsersStore>(ownTypes.usersStore).to(UsersStore).inTransientScope();
container.bind<LoginStore>(ownTypes.loginStore).to(LoginStore).inTransientScope(); 
