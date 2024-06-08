import { Request } from "express"
import { AuthService } from "./auth/auth.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class payloadService {

    constructor(private authService: AuthService) { }

    async decode(req: Request) {

        if (req.headers.authorization) {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];
            const payload = await this.authService.decodeToken(token);
            return payload
        } else {
            return
        }
    }
}