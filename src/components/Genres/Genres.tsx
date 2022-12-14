import { Chip } from '@material-ui/core'
import axios from 'axios'
import { useEffect } from 'react'
import { SetGenresProps, GenreProps } from '../../models/interface'
import './Genres.css'

export const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}: SetGenresProps) => {
  const handleAdd = (genre: GenreProps) => {
    setSelectedGenres([...selectedGenres, genre])
    setGenres(genres.filter((g) => g.id !== genre.id))
    setPage(1)
  }
  const handleRemove = (genre: GenreProps) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    )
    setGenres([...genres, genre])
    setPage(1)
  }
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
    setGenres(data.genres)
  }
  useEffect(() => {
    fetchGenres()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="genres">
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            style={{ margin: 2 }}
            label={genre.name}
            key={genre.id}
            color="primary"
            clickable
            size="small"
            onDelete={() => handleRemove(genre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            style={{ margin: 2 }}
            label={genre.name}
            key={genre.id}
            variant="outlined"
            clickable
            size="small"
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  )
}
