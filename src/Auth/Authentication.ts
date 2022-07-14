import { NextFunction as Next, Request as Req, Response as Res } from "express";
import jwt from 'jsonwebtoken'
import { Response } from "../Utils/Response";

const getIdFromRequest = {
    getIdFromParamAsId: (res: Req)=>{
        const id = res.params.id;
        return id;
    },
    getIdFromBodyAsId: (res: Req)=>{
        const { id } = res.body;
        return id;
    },
    getIdFromBodyAsUserId: (res: Req)=>{
        const { userId } = res.body;
    }
}

export class Auth {
    constructor(){}
    private getToken(authHeader: string) {
        //BEARER TOKEN
        if (!authHeader){
            return null;
        } 
        const token = authHeader.split(' ')[1];
        console.log("split auth token from header", token);
        if (!token){
            return null;
        }
        return token;
    }
    private getUserIdFromToken(token: string) {
        const getUser: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        if (!getUser && !getUser.user) {
            return null;
        }
        return getUser.user;
    }
    public checkValidUser(req: Req, res: Res, next: Next) {
        const authHeader = req.header('Authorization');
        const token = this.getToken(authHeader);
        if(!token){
            return res.status(400).json(Response.badRequest('Auth Token Not Found'));
        }
        try {
            const userId = this.getUserIdFromToken(token);
            if(!userId){
                return res.status(400).json(Response.badRequest('Invalid Auth Token'));
            }
            req["userId"] = userId;
            next();
        } catch (e) {
            res.status(400).json(Response.badRequest('Invalid Auth Token'));
        }
    }
    public checkSameUser(req: Req, res: Res, next: Next) {
        const authHeader = req.header('Authorization');
        const token = this.getToken(authHeader);
        if(!token){
            return res.status(400).json(Response.badRequest('Auth Token Not Found'));
        }
        try {
            const userId = this.getUserIdFromToken(token);
            next();
        } catch (e) {
            res.status(400).json(Response.badRequest('Invalid Auth Token'));
        }
    }
}