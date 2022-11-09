import './CustomPagination.css'
import ReactPaginate from "react-paginate"
import { SetPageProps, PageProps } from '../../models/interface'

const CustomPagination = ({setPage, numOfPages = 10}: SetPageProps) => {
    const handlePageChange = ({ selected }: PageProps) => {
        setPage(selected + 1)
        window.scroll(0, 0)
    }
    return(
        <div className='pagination'>
            <ReactPaginate
                onPageChange={handlePageChange}
                pageCount={numOfPages}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                activeClassName={"paginationActive"}
            />
        </div>
    )
}
  
export default CustomPagination

  