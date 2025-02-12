const Search = ({search,setSearch}) => {
  return (
	<div className="search"><div><img src="search.svg" alt="search" />
	<input type="text" placeholder="Search through movies"
	value={search} onChange={(event)=>setSearch(event.target.value)} /></div>
	</div>
  )
}

export default Search;