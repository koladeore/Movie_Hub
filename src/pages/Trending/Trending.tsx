import './Trending.css'
import SingleContent from '../../components/SingleContent.jsx/SingleContent'
import { useState, useEffect } from 'react'
import { PageProps } from '../../models/interface'
import CustomPagination from '../../components/Pagination/CustomPagination'
import axios from 'axios'
import { LoadingSpinner } from '../../components/Spinner/LoadingSpinner'

export const Trending = () => {
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [content, setContent] = useState<PageProps[]>([])
  const [numOfPages, setNumOfPages] = useState(0)
  const fetchTrending = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      )
      setTimeout(() => {
        const { data: { results, total_pages } } = response
        console.log(response);
        setContent(results);
        setNumOfPages(total_pages);
        setIsLoading(false);
      }, 100); 
    } catch (error) {
      console.error(error)
    }
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
      <h1 className="trending-text">Trending</h1>
      <div data-testid="loading-spinner">
        {isLoading ? <LoadingSpinner /> : renderContent}
      </div>
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
