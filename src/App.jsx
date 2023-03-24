import { useState, useEffect } from 'react'
import './App.css'

//components
import AnimeItem from './components/AnimeItem'
import AnimeProfile from './components/AnimeProfile'
import AnimeSuggestion from './components/AnimeSuggestion'

//js 
import { fetchTrending } from './js/fetchTrending'
import { fetchSearch } from './js/fetchSearch'
import { fetchSuggestion } from './js/fetchSuggestion'
import { fetchProfile } from './js/fetchProfile'

//icon 
import { BiSearch } from "react-icons/bi";

function App() {

  const [searchAnime, setSearchAnime] = useState('')
  const [animeList, setAnimeList] = useState('')
  const [searchSuggestion, setSearchSuggestion] = useState('')
  const [animeProfile, setAnimeProfile] = useState('')
  const [addMore, setAddMore] = useState(0)
  const [currentSearch, setCurrentSearch] = useState('')

  let input = ''

  const fetchData = async () => {
    const animeData = await fetchTrending()

    const test = animeData.data.map(function(element, index){
      if ( element.attributes.titles.en_jp == undefined) {
        return <AnimeItem 
        onClick={clickProfile} 
        key={index} 
        imgSrc={element.attributes.posterImage.large}
        title={element.attributes.titles.en}
        alt={element.id}/>
      }
      else {
        return <AnimeItem 
        onClick={clickProfile} 
        key={index} 
        imgSrc={element.attributes.posterImage.large}
        title={element.attributes.titles.en_jp}
        alt={element.id}/>
      }
    })

    setAnimeList(test)
  }

  const fetchSearchSuggestion = async (searchItem) => {
    const animeData = await fetchSuggestion(searchItem)

    const suggestions = animeData.data.map(function(element, index){
      if ( element.attributes.titles.en_jp == undefined) {
        return <AnimeSuggestion 
        key={index} 
        imgSrc={element.attributes.posterImage.large}
        title={element.attributes.titles.en}
        onClick={selectSuggestion}
        alt={element.id}
        />
      }
      else {
        return <AnimeSuggestion 
        key={index} 
        imgSrc={element.attributes.posterImage.large}
        title={element.attributes.titles.en_jp}
        onClick={selectSuggestion}
        alt={element.id}
        />
      }
    })

    setSearchSuggestion(suggestions)
  }

  const fetchSearchAnime = async (searchItem, addMore = 0) => {
    const animeData = await fetchSearch(searchItem, addMore)

    const newList = animeData.data.map(function(element, index){
    if ( element.attributes.titles.en_jp == undefined) {
        return <AnimeItem 
        onClick={clickProfile} 
        key={index} 
        imgSrc={element.attributes.posterImage.large}
        title={element.attributes.titles.en}
        alt={element.id}/>
    }
    else {
        return <AnimeItem 
        onClick={clickProfile} 
        key={index} 
        imgSrc={element.attributes.posterImage.large}
        title={element.attributes.titles.en_jp}
        alt={element.id}/>
    }
      
    })

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    setCurrentSearch(searchAnime)
    input = searchAnime
    setSearchSuggestion('')
    setAnimeList(newList)
    setAddMore(20)
  }

  const fetchAddMoreList = async (searchItem, addMore = 0) => {
    const animeData = await fetchSearch(searchItem, addMore)

    const newList = animeData.data.map(function(element, index){
    if ( element.attributes.titles.en_jp == undefined) {
        return <AnimeItem 
        onClick={clickProfile} 
        key={index} 
        imgSrc={element.attributes.posterImage.large}
        title={element.attributes.titles.en}
        alt={element.id}/>
    }
    else {
        return <AnimeItem 
        onClick={clickProfile} 
        key={index} 
        imgSrc={element.attributes.posterImage.large}
        title={element.attributes.titles.en_jp}
        alt={element.id}/>
    }
      
    })

    setSearchSuggestion('')
    setAnimeList([...animeList ,newList])
    setAddMore(addMore + 20)
  }

  useEffect(() => {
    if (animeList == '') {
      fetchData()
    }
  }, [])

  const updateSearch = (e) => {
    setSearchSuggestion('')
    setSearchAnime(e.target.value)
    fetchSearchSuggestion(e.target.value)
    input = e.target.value
  }

  const fetchAnimeProfile = async (id) => {
    const animeData = await fetchProfile(id)

    const newList = animeData.data.map(function(element, index){

      if ( element.attributes.titles.en_jp == undefined) {
        return <AnimeProfile 
        key={index} 
        imgSrc={element.attributes.posterImage.large}
        title={element.attributes.titles.en}
        synopsis={element.attributes.synopsis}
        alt={element.id}
        onClick={returnHome}/>
      }
      else {
        return <AnimeProfile 
        key={index} 
        imgSrc={element.attributes.posterImage.large}
        title={element.attributes.titles.en_jp}
        synopsis={element.attributes.synopsis}
        alt={element.id}
        onClick={returnHome}/>
      }
      
    })
    
    setAnimeList('')
    setAnimeProfile(newList)

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  const clickProfile = (e) => {
    setAnimeList('')
    setCurrentSearch('')
    fetchAnimeProfile(e.target.alt)
  }

  const selectSuggestion = (e) => {
    setSearchAnime('')
    setCurrentSearch('')
    setSearchSuggestion('')
    setAnimeList('')
    fetchAnimeProfile(e.target.children[0].alt)
  }

  const searchAnimePrompt = (e) => {
    e.preventDefault()
    if(searchAnime != '') {
      input = searchAnime
      setSearchAnime('')
      setSearchSuggestion('')
      setAnimeProfile('')
      fetchSearchAnime(searchAnime)
    }
  }

  const returnHome = (e) => {
    setSearchAnime('')
    setSearchSuggestion('')
    setAnimeProfile('')
    setAnimeList('')
    setCurrentSearch('')
    fetchData()
  }

  const handleScroll = (e) => {
    if ((window.innerHeight + window.scrollY + 1) >= document.body.scrollHeight) {
        if(currentSearch != '' && animeList != '') {
          input = currentSearch
          fetchAddMoreList(currentSearch, addMore)
        }
    }   
  }

  const returnList = (e) => {
    setAnimeProfile('')
    setCurrentSearch(input)
    if(input != '') {
      fetchSearchAnime(input)
    }
    else {
      fetchData()
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentSearch, addMore])

  return (
    <div className='bg-[#0f172a] text-white scroll-smooth m-0 p-0 flex flex-col justify-center items-center w-screen'>
      <header className='z-10 bg-[#183250] top-0 h-[20vh] fixed flex flex-col w-full p-3 px-4 md:px-24 gap-3'>
        <h1 onClick={returnHome} className="cursor-pointer text-4xl font-bold">My Anime Archive</h1>
        <form onSubmit={searchAnimePrompt} className='flex text-black'>
          <input
            type="text"
            placeholder="Search an Anime"
            className='border-2 p-2 rounded-l-lg w-5/6'
            onChange={updateSearch}
            value={searchAnime}
          />
          <button type="submit" className='px-4 md:px-20 text-2xl w-1/6 bg-blue-500 text-white rounded-none rounded-r-lg'><BiSearch/></button>
        </form>
        <div className='flex flex-col border-1 bg-white text-black'>
          {searchSuggestion}
        </div>
      </header>
      <section className='pt-[25vh]'>
        {animeProfile}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 px-5 md:px-24'>
          {animeList}
        </div>
      </section>
      <footer className='bg-[#183250] h-[20vh] w-full mt-10'/>
    </div>
  )
}

export default App
