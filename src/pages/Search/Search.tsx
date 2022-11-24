import { useState, useEffect } from 'react'
import axios from 'axios'
import { PageProps, stateProps } from '../../models/interface'
import { useLocation } from 'react-router-dom'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SingleContent from '../../components/SingleContent.jsx/SingleContent'
import './Search.css'
import { LoadingSpinner } from '../../components/Spinner/LoadingSpinner'

export const Search = () => {
  const [filterBy, setFilterBy] = useState<PageProps[]>([]);
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [content, setContent] = useState<PageProps[]>([])
  const [numOfPages, setNumOfPages] = useState(0)
  // const [value, setValue] = useState('')
  const { state }: stateProps = useLocation()
  const fetchSearch = async () => {
    try {
      console.log('filterBy.length', filterBy.length)
      if(filterBy.length === 0){
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${state}&page=${page}&include_adult=false`
        )
        setContent(data.results)
        setNumOfPages(data.total_pages)
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    window.scroll(0, 0)
    setIsLoading(true)
    fetchSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, state, filterBy])
  const filterByOption = (option : string) => {
    if(content){
      const resultContent = content.filter(c => c.media_type === option)
      console.log('resultContent', resultContent)
      setFilterBy(resultContent)
    } 
  }
  const searchContent = (
    <div className="search">
      {content && filterBy.length === 0 &&
        content.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={c.media_type}
            vote_average={c.vote_average}
          />
        ))}
        {filterBy.length > 0 && 
        filterBy.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={c.media_type}
            vote_average={c.vote_average}
          />
        ))}
    </div>
  )
  return (
    <div>
      <div className='search-header-btn'>
        <div className="btn-search">
          <button
          // value={state}
          onClick={() => filterByOption('movie')}
          >Filter By Movie</button>
        </div>
        <div className="btn-search">
          <button onClick={() => filterByOption('tv')}>Filter By Tv series</button>
        </div>
      </div>
      {isLoading ? <LoadingSpinner /> : searchContent}
      {state && !content.length && <h2 className="notFound">No movie Found</h2>}
      {numOfPages > 1 && (
        <CustomPagination
          setPage={setPage}
          numOfPages={numOfPages}
          page={page}
        />
      )}
    </div>
  )
}
