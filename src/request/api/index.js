import { get, post } from "../http";

// 文章 Article的相关接口
const getArticles = params => get("/articles", params);
const getArticleById = params => get("/article/:id", params);
const likeArticle = params => post("/article/:id/like", params);
const readArticle = params => post("/article/:id/read", params);

// 标签 Tag的相关接口
const getTags = params => get("/tags", params);

// 书单 Book的相关接口
const getBooks = params => get("/books", params);

// 评论 Comment的相关接口
const getComments = params => get("/comments", params);
const insertComment = params => post("/comment", params);
const getCommentsByArticle = params => get("/getCommentsByArticle", params);

// 游客 Guest的相关接口
const insertGuest = params => post("/guest", params);

// 订阅 Order的相关接口
const subscribe = params => post("/guest/:id/subscribe", params);

// 音乐 Music的相关接口
const getMusics = params => get("/musics", params);

export default {
    getArticles,
    getArticleById,
    likeArticle,
    readArticle,
    getTags,
    getBooks,
    getComments,
    insertComment,
    getCommentsByArticle,
    insertGuest,
    subscribe,
    getMusics
};
