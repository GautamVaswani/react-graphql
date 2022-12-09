import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

function AddBook(props) {
  // useEffect(()=>{},[])

  const [formData, setFormData] = useState({
    bookName: "",
    genre: "",
    authorId: "",
  });

  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBookFunction, { addBookMutationData }] =
    useMutation(addBookMutation);

  function displayAuthors() {
    if (loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function submitForm(event) {
    event.preventDefault();
    console.log(formData);
    addBookFunction({
      variables: {
        name: formData.bookName,
        genre: formData.genre,
        authorId: formData.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  }

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          placeholder="Book Name"
          name="bookName"
          value={formData.bookName}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          placeholder="Genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          id="author"
          value={formData.authorId ? formData.authorId : undefined}
          onChange={handleChange}
          name="authorId"
        >
          <option disabled>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBook;
