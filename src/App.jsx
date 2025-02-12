import { useState } from 'react';
import './App.css'
import Search from './components/Search';

const App = ()=> {
const [search, setSearch] = useState('')
  return (
	<main>
    <div className='pattern'>
		<div className="wrapper">
		<header>
			<img src='./hero.png' alt='hero banner'/>
	 <h1>Find <span className="text-gradient">Movies</span>You&apos;ll enjoy without the hassle </h1>
	 </header>
	 <Search search={search} setSearch={setSearch}/>
	 <h1 className="text-white">{search}</h1>
	 </div>
    </div>
	</main>
  )
}

export default App
