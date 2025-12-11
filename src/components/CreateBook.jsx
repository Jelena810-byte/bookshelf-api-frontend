import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../services/books";



function CreateBook() {
  let navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    year: "",
    language: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createBook(book);
    navigate("/books");
  };


  return (
    <div className="create-book-root">
      <div className="create-book-heading">
        <h2>Add a Book</h2>
      </div>
      <form className="create-form" onSubmit={handleSubmit}>
        <input
          className="input-title"
          placeholder="Title"
          name="title"
          value={book.title}
          onChange={handleChange}
          required
          autoFocus
        />
        <input
          className="input-author"
          placeholder="Author"
          name="author"
          value={book.author}
          onChange={handleChange}
          required
        />
        <input
          className="input-description"
          placeholder="Description"
          name="description"
          value={book.description}
          onChange={handleChange}
          required
        />
        
        <input
          className="input-genre"
          placeholder="Genre"
          name="genre"
          value={book.genre}
          onChange={handleChange}
          required
          />

        <input
          className="input-year"
          placeholder="Year"
          id="book-year"
          name="year"
          value={book.year}
          onChange={handleChange}
          required
          
          />
        <input
         className="input-language"
         placeholder="Language"
         name="language"
         value={book.language}
         onChange={handleChange}
         required
          />

        
        <button type="submit">Submit</button>
      </form>
     </div>
  );
  }


export default CreateBook;


















