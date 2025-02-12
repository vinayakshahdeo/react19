import { useState,useEffect } from 'react';
import './App.css'
import Search from './components/Search';
import Spinner from './components/spinner';
import MovieCard from './components/MovieCard';
import {useDebounce} from 'react-use';
import { getTrendingMovies, updateSearchCount } from './Appwrite';

const App = ()=> {
const [search, setSearch] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const [movieList,setMovieList]=useState([]);
const [isLoading,setIsLoading]=useState(false);
const [debouncedSearch, setDebouncedSearch] = useState('');
const [trending, setTrending] = useState([])

useDebounce(()=>setDebouncedSearch(search),1000,[search])

const API_BASE_URL=`https://api.themoviedb.org/3`;
const API_KEY=import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
	method: 'GET',
	headers: {
	  accept: 'application/json',
	  Authorization: `Bearer ${API_KEY}` 
	}
  };
const fetchMovies = async (query='') =>{
	setIsLoading(true);
	setErrorMessage('');
	try {
		const endpoint=query?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`:`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
		const response = await fetch(endpoint,API_OPTIONS);
		if(!response.ok){
			throw new Error('Failed to fetch movies')
		}
		const data = await response.json();
		if(data.response==='False'){
			setErrorMessage(data.error||`Failed to fetch movies`)
			setMovieList([]);
        return;
		}
		setMovieList(data.results || []);
		if(query&&data.results.length>0){
			await updateSearchCount(query,data.results[0])
		}
	} catch (error) {
		console.error('error fetching movies',error)
		setErrorMessage('Error fetching movies')
	}finally{
		setIsLoading(false)
	}
}

const loadTrending = async()=>{
	try {
		const movies = await getTrendingMovies();
		setTrending(movies)
	} catch (error) {
		console.error(`Error fetching trending movies ${error}`)
	}
}

useEffect(() => {
  fetchMovies(debouncedSearch);
}, [debouncedSearch])

useEffect(()=>{loadTrending()},[])

  return (
	<main>
    <div className='pattern'>
		<div className="wrapper">
		<header>
			<img src='./hero.png' alt='hero banner'/>
	 <h1>Find <span className="text-gradient">Movies</span>You&apos;ll enjoy without the hassle </h1>
	 <Search search={search} setSearch={setSearch}/>
	 </header>
	 {trending.length>0&&<section className="trending"><h2>Trending Movies</h2>
	 <ul>{trending.map((movie,index)=><li key={movie.$id}><p>{index+1}</p><img src={movie.poster_url} alt={movie.title} /></li>)}</ul>
	 </section>}
	<section className="all-movies">
		<h2 className='mt-[40px]'>All Movies</h2>
		{isLoading?<Spinner/>:errorMessage ? <><p className="text-red-500">{errorMessage}</p></>:<><ul>{movieList.map((movie)=><MovieCard key ={movie.id} movie={movie}/>)}</ul></>}
	</section>
	 </div>
    </div>
	</main>
  )
}

export default App
