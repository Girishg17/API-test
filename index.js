const express= require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended:false}));
let movies=[{
    id:'1',
    title:'The Lord of the Rings',
    director:'Peter Jackson',
    release_date:'2001-12-19'
},{
    id:'2',
    title:'The Hobbit',
    director:'J.R.R. Tolkien',
    release_date:'2012-11-28'

}] ;
app.get('/movie',(req,res)=>{
    res.json(movies);
})
app.post('/movie',(req,res)=>{
    let movie=req.body;
    movies.push(movie);
    res.send('Movie is added to the database');
})
app.delete('/movie/:id', (req, res) => {
    let id = req.params.id;
    let index = movies.findIndex((movie) => movie.id === id);
    
    if (index !== -1) {
        movies.splice(index, 1);
        res.send('Movie is deleted from the database');
    } else {
        res.status(404).send('Movie not found');
    }
});
app.put('/movie/:id', (req, res) => {
    let id = req.params.id;
    let updatedMovie = req.body;
    let index = movies.findIndex((movie) => movie.id === id);

    if (index !== -1) {
        movies[index] = updatedMovie;
        res.send('Movie is updated in the database');
    } else {
        res.status(404).send('Movie not found');
    }
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
