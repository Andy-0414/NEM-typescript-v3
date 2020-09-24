import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import "dotenv/config";
import Log from "./module/Log";
import Router from "./router";

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev")); // 통신 로그

app.use(cors()); // CORS 설정 미들웨어
app.use(helmet()); // 보안 미들웨어
app.use(compression()); // 데이터 압축 미들웨어

app.use(express.static("public")); // public 폴더의 파일을 제공함
app.use(express.urlencoded({ limit: "20mb", extended: true })); // urlencode 지원
app.use(express.json({ limit: "20mb" })); // json 지원

app.use(Router); // 라우터 연결

const server = app.listen(port, () => {
	Log.i(`PORT : ${port}`);
});
