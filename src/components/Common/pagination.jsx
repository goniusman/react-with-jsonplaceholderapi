import _ from "lodash";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Paginate = ({ items, pageSize, pageChange }) => {
  const pageCount = Math.ceil(items / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <div className="blog-pagination">
      <Pagination>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink onClick={() => pageChange(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {/* <li className="active"><a href="#">2</a></li> */}
      </Pagination>
    </div>
  );
};

export default Paginate;
// {/* <li key={page} className={page === currentPage ? "active" : ""}> */}
