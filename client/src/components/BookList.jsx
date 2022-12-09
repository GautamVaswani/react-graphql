import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { getBooksQuery } from "../queries/queries";

function BookList(props) {
  // useEffect(()=>{},[])

  const { loading, error, data } = useQuery(getBooksQuery);
  function displayBooks() {
    if (error) {
      return <p>Error </p>;
    } else if (loading) {
      return <p>Loading...</p>;
    } else {
      return data.books.map((book) => {
        return <li key={book.id}>{book.name}</li>;
      });
    }
  }

  return (
    <div>
      <ul className="book_list">{displayBooks()}</ul>
    </div>
  );
}

export default BookList;
