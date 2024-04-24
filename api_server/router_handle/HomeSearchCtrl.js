import db from "../db/user_db.js";


export async function getSearchMovieList(req, res) {
    const { searchContent } = req.query;
    const searchSql = `select * from movies where movieName like '%${searchContent}%'`;
    const [movieList] = await db.query(searchSql);
    res.send({
        status: 200,
        data: {movieList},
    });
}

export async function getHomeMovieList(req, res) { 
    const searchSql = `select * from movies`;
    const [searchResult] = await db.query(searchSql);
    const movieList = searchResult.slice(0, 6);
    res.send({
        status: 200,
        data: {movieList},
    });
}