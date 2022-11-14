import './Trending.css'
import SingleContent from '../../components/SingleContent.jsx/SingleContent'
import { useState, useEffect } from 'react'
import { TrendingProps } from '../../models/interface'
import CustomPagination from '../../components/Pagination/CustomPagination'
import axios from 'axios'
import { LoadingSpinner } from '../../components/Spinner/LoadingSpinner'

export const Trending = () => {
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [content, setContent] = useState<TrendingProps[]>([])
  const [numOfPages, setNumOfPages] = useState(0)
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    )
    setContent(data.results)
    setNumOfPages(data.total_pages)
    setIsLoading(false)
  }
  useEffect(() => {
    window.scroll(0, 0)
    setIsLoading(true)
    fetchTrending() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])
  const renderContent = (
    <div className="trending">
      {content &&
        content.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title}
            date={c.first_air_date || c.release_date}
            media_type={c.media_type}
            vote_average={c.vote_average}
          />
        ))}
    </div>
  )
  return (
    <div>
      {isLoading ? <LoadingSpinner /> : renderContent}
      {/* {!content.length && <h2 className="noTrending">No Content Found</h2>} */}
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
