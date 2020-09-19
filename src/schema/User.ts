import { Schema, model, Model, Document } from "mongoose";

export interface IUser {
	loginType: string; // 로그인 타입 (카카오 등)
	username: string; // 유저 이름
	email: string; // 이메일 (고유)
	password: string; // 비밀번호
	salt: string; // 비밀번호 키
	profileImage: string; // 프로필 이미지 경로
	lastLoginAt: Date; // 최근 로그인 시간
	createAt: Date; // 회원가입 시간
}
export const UserSchema: Schema = new Schema({
	loginType: { type: String, default: "local" },
	username: { type: String, default: "User" },
	email: { type: String, default: "", required: true, unique: true },
	password: { type: String, required: true, select: false },
	salt: { type: String, default: process.env.SECRET_KEY || "SECRET", select: false },
	profileImage: { type: String, default: "" },
	lastLoginAt: { type: Date, default: Date.now },
	createAt: { type: Date, default: Date.now },
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
