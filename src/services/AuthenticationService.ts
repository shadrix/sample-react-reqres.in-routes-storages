import "reflect-metadata";
import { inject, injectable } from "inversify";
import { ContentType, MethodType } from "./HttpService";
import type { HttpService } from "./HttpService";
import ownTypes from "../ioc/ownTypes";
import type { LoginResponse } from "../dtos/LoginResponse";
import { KeyType } from "./LocalStorageService";
import type { LocalStorageService } from "./LocalStorageService";

export interface AuthenticationService {
    login(email: string, password: string): Promise<LoginResponse>;
    logout(): void;
}

@injectable()
export default class DefaultAuthenticationService implements AuthenticationService {
    public constructor(
        @inject(ownTypes.httpService) private readonly httpService: HttpService,
        @inject(ownTypes.localStorageService) private readonly localStorageService: LocalStorageService
    ) {
    }

    public async login(email: string, password: string): Promise<LoginResponse> {
        const headers = { contentType: ContentType.Json};
        const data = { email, password };
        const result = await this.httpService.send<LoginResponse>(`login`, MethodType.POST, headers, data);
        this.localStorageService.set(KeyType.Token, result.data.token);
        return result.data;
    }


    public logout(): void {
        this.localStorageService.remove(KeyType.Token);
    }
}