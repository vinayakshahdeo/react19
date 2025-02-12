const MovieCard = ({movie:{title,poster_path,vote_average,release_date,original_language}}) => {
	return (
		<div className="movie-card"><img src={poster_path?`https://image.tmdb.org/t/p/w500${poster_path}`:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.ucMk47FSeRx5WqeIX-wgmAHaEH%26pid%3DApi&f=1&ipt=a44f3a7140e29881ce4cf0adf93fd67e0f768e303f55ff99df57975402346d1e&ipo=images'} alt="poster" />
		
		<div className="mt-4">
		<h3>{title}</h3>
		
		<div className="content"><div className="rating"><img src="star.svg" alt="star icon" />
		<p>{vote_average?vote_average.toFixed(1):'N/A'}</p>
		</div>
		<span>.</span>
		<p className="lang">{original_language}</p>
		<span>.</span>
		<p className="year">{release_date?release_date.split('-')[0]:'N/A'}</p>
		</div>
		</div>
		</div>
		
	)
}

export default MovieCard