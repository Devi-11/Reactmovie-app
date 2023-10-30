import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=263d22d8`)
      .then((response) => response.json())
      .then((value) => setData(value.Search));
  };
  const download = (url) => {
    fetch(url)
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <center>
        <h1>Search Your Favorite Movie</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <br />
          <input type="submit" value="Search" />
        </form>
        <div className="row">
          {data.map((movie) => (
            <div className="col-md-4">
              <div class="card" style={{ width: " 18rem" }}>
                <img
                  class="card-img-top"
                  src={movie.Poster}
                  alt={movie.Title}
                />
                <div class="card-body">
                  <h4 className="card-title">{movie.Title}</h4>
                  <a
                    className="btn-btn-Success"
                    onClick={() => download(movie.poster)}
                  ></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </center>
    </div>
  );
}

export default App;
