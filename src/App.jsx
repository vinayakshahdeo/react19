import './App.css'
import Search from './components/Search';

const App = ()=> {

  return (
	<main>
    <div className='pattern'>
		<div className="wrapper">
		<header>
			<img src='./hero.png' alt='hero banner'/>
	 <h1>Find <span className="text-gradient">Movies</span>You&apos;ll enjoy without the hassle </h1>.
	 3
	 </header>
	 <Search />
	 </div>
    </div>
	</main>
  )
}

export default App
