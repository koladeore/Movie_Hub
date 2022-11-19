export interface singleContentProps {
  id: number
  poster: string
  title: string
  date: string
  media_type: string
  vote_average: string
}
export interface PageProps {
  id: number
  poster_path: string
  title: string
  first_air_date: string
  release_date: string
  name: string
  media_type: string
  vote_average: string
}
export interface SetPageProps {
  setPage: (page: number) => void
  numOfPages: number
  page: number
}
export interface PageProps {
  selected: number
}
export interface stateProps {
  state: string
}
export interface ErrorProps {
  message: (e: string) => void
}
export interface UseGenresProps{
  id: string | number
  name: string
}
export interface UseSelectedGenresProps{
  selectedGenres: UseGenresProps[]
}
export interface movieGenresProps{
  id: string | number
  name: string
}
export interface movieSelectedGenresProps{
  id: string | number
  name: string
}
export interface selectedGenresProps{
  id: string | number
  name: string
}
export interface GenresProps{
  id: string | number
  name: string
}
export interface SetGenresProps {
  selectedGenres: selectedGenresProps[]
  // eslint-disable-next-line no-empty-pattern
  setSelectedGenres: ([]) => void
  genres: GenresProps[]
  setGenres: (genres: GenreProps[]) => void | []
  type: string
  setPage: (page: number) => void
}
export interface GenreProps{
  id: string | number
  name: string
}
export interface seriesGenresProps{
  id: string | number
  name: string
}
export interface seriesSelectedGenresProps{
  id: string | number
  name: string
}
