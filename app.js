import express from "express";
import rateLimit from "express-rate-limit";
const app = express();

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 限制時間
    max: 100, // 限制請求數量
    message: "Too many requests, please try again later!",
});

const signUpLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5min
    max: 10,
    message: "您短時間內註冊太多次了，請於五分鐘後再試",
});

app.use(limiter);
app.use("/signup", signUpLimiter);

app.get("/", (_, res) => {
    res.send("hello world");
});

app.get("/signup", (_, res) => {
    res.send("註冊成功");
});

const PORT = 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    }
    console.log(`app running on port ${PORT}`);
});
