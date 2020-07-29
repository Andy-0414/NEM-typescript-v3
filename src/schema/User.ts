import { Schema, model, Model, Document } from "mongoose";

export interface IUser {
	userID: string;
	password: string;
	loginType?: string;
	username?: string;
	email?: string;
	salt?: string;
	imgPath?: string;
	lastLoginTime?: Date;
	createdTime?: Date;
	isAdmin?: boolean;
}
export const UserSchema: Schema = new Schema({
	loginType: { type: String, default: "local" },
	username: { type: String, default: "User" },
	email: { type: String, default: "" },
	userID: { type: String, required: true, unique: true },
	password: { type: String, required: true, select: false },
	salt: { type: String, default: process.env.SECRET_KEY || "SECRET", select: false },
	imgPath: { type: String, default: "" },
	lastLoginTime: { type: Date, default: Date.now },
	createdTime: { type: Date, default: Date.now },
	isAdmin: { type: Boolean, default: false },
});

/**
 * @description User 스키마에 대한 메서드 ( document )
 */
export interface IUserSchema extends IUser, Document {}

/**
 * @description User 모델에 대한 정적 메서드 ( collection )
 */
export interface IUserModel extends Model<IUserSchema> {}
export default model<IUserSchema>("User", UserSchema) as IUserModel;
