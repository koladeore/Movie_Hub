import './Movies.css'
import SingleContent from '../../components/SingleContent.jsx/SingleContent'
import { useState, useEffect } from 'react'
import {
  PageProps,
  movieGenresProps,
  movieSelectedGenresProps,
} from '../../models/interface'
import CustomPagination from '../../components/Pagination/CustomPagination'
import axios from 'axios'
import { LoadingSpinner } from '../../components/Spinner/LoadingSpinner'
import { Genres } from '../../components/Genres/Genres'
import { UseGenre } from '../../components/Hooks/UseGenre'

export const Movies = () => {
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [content, setContent] = useState<PageProps[]>([])
  const [numOfPages, setNumOfPages] = useState(0)
  const [selectedGenres, setSelectedGenres] = useState<
    movieSelectedGenresProps[]
  >([])
  const [genres, setGenres] = useState<movieGenresProps[]>([])
  const genreforURL = UseGenre(selectedGenres)
  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      )
      setTimeout(() => {
        const {
          data: { results, total_pages },
        } = response
        setContent(results)
        setNumOfPages(total_pages)
        setIsLoading(false)
      }, 100)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    window.scroll(0, 0)
    setIsLoading(true)
    fetchMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreforURL, page])
  const renderContent = (
    <div>
      <div className="movies">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
    </div>
  )
  return (
    <div>
      <h1 className="movie-text">Discover Movies</h1>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
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
