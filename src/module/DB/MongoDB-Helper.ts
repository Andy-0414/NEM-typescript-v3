import Mongoose from "mongoose";
import Log from "../Log";

/**
 * @description Mongo DB 관리 클래스
 */
class MongoDBHelper {
	private db: Mongoose.Connection;
	public isDatabaseConnect: boolean = false;

	public readonly ENV: string = process.env.NODE_ENV || "development"; // 개발 환경
	public readonly DB_URI: string = process.env.DB_URI || process.env.MONGODB_URI || "mongodb://localhost/NEM-TEMPLATE-V3"; // DB URL
	/**
	 * @description MongoDB 활성화
	 * @param {string}url MongoDB URL
	 */
	public init(url?: string): void {
		this.db = Mongoose.connection;

		// 접속 실패 시
		this.db.on("error", () => {
			Log.e("Mongo DB connected fail");
			Log.e("Server stop");
			this.isDatabaseConnect = false;
			process.exit();
		});

		// 접속 성공 시
		this.db.once("open", () => {
			Log.c("Mongo DB connected");
			this.isDatabaseConnect = true;
		});

		Mongoose.set("useCreateIndex", true);
		Mongoose.set("useUnifiedTopology", true);
		Mongoose.connect(url || this.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
	}
	/**
	 * @description DB 객체 반환
	 * @returns {Mongoose.Connection} DB 객체
	 */
	public getDB(): Mongoose.Connection {
		return this.db;
	}
}
export default new MongoDBHelper();
