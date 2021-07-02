import React from 'react'
import ReactPaginate from 'react-paginate';

export default function Paginate({ last_page, current_page, setPage, refe }) {
    const scrollToBottom = () => {
        refe.current?.scrollIntoView({ behavior: "smooth" })
    }

    function changePage(e) {
        setPage(e.selected + 1);
        scrollToBottom()
    }

    return (
        <>
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                pageCount={last_page}
                marginPagesDisplayed={3}
                pageRangeDisplayed={5}
                initialPage={current_page}
                containerClassName={'pagination noselect'}
                onPageChange={(e) => changePage(e)}
                activeClassName={'active'}
                disabledClassName={'disable noselect'}
                breakLinkClassName={'page-items'}
                nextLinkClassName={'page-items next'}
                previousLinkClassName={'page-items prev noselect'}
                pageLinkClassName={'page-items '}
            />
            <style>
                {`
        .pagination{
          display:inline-flex;
          font-size: 1.2rem/* 12px */;
          line-height: 1rem/* 16px */;
          display: flex;
          gap: 0.5rem;
        }

        .prev{
          font-size: 1.5rem;
          line-height: 1.5rem;
        }

        .next{
          font-size: 1.5rem;
          line-height: 1.5rem;
        }

        .items{
          background-color: white;
          justify-content: space-between;
        }

        .active .page-items{
          --tw-bg-opacity: 1;
          background-color: rgba(0, 196, 118, var(--tw-bg-opacity));
          color:white;
          --tw-shadow: 0 2px 0px 0px rgba(0, 0, 0, 0.16), 0px 0px 0px 2px rgba(0, 0, 0, 0.06);
          box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        }

        .disable .page-items{
          cursor:default;
          --tw-bg-opacity: 1;
          background-color: rgba(238, 240, 244, var(--tw-bg-opacity));
        }

        .page-items{
          width: 2.5rem;
          height: 2.4rem;
          
          font-weight: 600;
          
          display: flex;
          align-items: center;
          justify-content: center;
          
          background-color: white;
          
          border-radius: 6px;
          --tw-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.05), 0px 0px 0px 0px rgba(0, 0, 0, 0.01);
          box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
          
          user-select: none;
        }

        `}
            </style>
        </>
    )
}
