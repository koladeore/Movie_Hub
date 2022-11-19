// import { UseSelectedGenresProps } from "../../models/interface"
// export const UseGenre = ({ selectedGenres } : UseSelectedGenresProps) => {
//     if (selectedGenres.length < 1) return ''
//     const GenreIds = selectedGenres.map((g) => g.id)
//     return GenreIds.reduce((acc, curr) => acc + "," + curr);
// }
// import { UseSelectedGenresProps } from "../../models/interface"
export const UseGenre = (selectedGenres: any[] ) => {
    if (selectedGenres.length < 1) return ''
    const GenreIds = selectedGenres.map((g) => g.id)
    return GenreIds.reduce((acc, curr) => acc + "," + curr);
}

