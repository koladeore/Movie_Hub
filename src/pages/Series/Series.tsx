import './Series.css'
import SingleContent from '../../components/SingleContent.jsx/SingleContent'
import { useState, useEffect } from 'react'
import {
  PageProps,
  seriesSelectedGenresProps,
  seriesGenresProps,
} from '../../models/interface'
import CustomPagination from '../../components/Pagination/CustomPagination'
import axios from 'axios'
import { LoadingSpinner } from '../../components/Spinner/LoadingSpinner'
import { Genres } from '../../components/Genres/Genres'
import { UseGenre } from '../../components/Hooks/UseGenre'

export const Series = () => {
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [content, setContent] = useState<PageProps[]>([])
  const [numOfPages, setNumOfPages] = useState(0)
  const [selectedGenres, setSelectedGenres] = useState<
    seriesSelectedGenresProps[]
  >([])
  const [genres, setGenres] = useState<seriesGenresProps[]>([])
  const genreforURL = UseGenre(selectedGenres)
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
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
  }, [genreforURL, page])
  const renderContent = (
    <div className="series">
      {content &&
        content.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type="tv"
            vote_average={c.vote_average}
          />
        ))}
    </div>
  )
  return (
    <div>
      <h1 className="series-text">Discover Series</h1>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      {isLoading ? <LoadingSpinner /> : renderContent}
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
