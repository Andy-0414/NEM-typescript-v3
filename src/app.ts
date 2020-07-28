import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import "dotenv/config";
import Log from "./module/Log";

const app: express.Application = express(); // 서버 객체
const port = process.env.PORT || 3000;

app.use(morgan("dev")); // 서비스 시 로그 출력

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
); // CORS 설정 미들웨어
app.use(helmet()); // 보안 미들웨어
app.use(compression()); // 데이터 압축 미들웨어

app.use(express.static("public")); // public 폴더의 파일을 제공함
app.use(express.urlencoded({ limit: "20mb", extended: true })); // urlencode 지원
app.use(express.json({ limit: "20mb" })); // json 지원

const server = app.listen(port, () => {
	// 서버가 열렸을 시 콜백
	Log.i(`port : ${port}`);
});

export default app;
