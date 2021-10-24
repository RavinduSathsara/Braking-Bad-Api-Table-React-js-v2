import React from "react";
import { useState, useEffect } from "react";

const BrakingBad = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://www.breakingbadapi.com/api/characters")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return (
      <div className="alert alert-warning">
        <strong>Warning! </strong> {error.message}
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div className="d-flex justify-content-center m-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  } else {
    return (
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Full Name</th>
            <th scope="col">Occupationy</th>
            <th scope="col">NickName</th>
          </tr>
        </thead>
        <tbody>
          {items.map((char) => (
            //   <li key={char.name}>{char.name}</li>
            <tr>
              <th scope="row">{char.char_id}</th>
              <td>{char.name}</td>
              <td>{char.occupation}</td>
              <td>{char.nickname}</td>
            </tr>
          ))}
        </tbody>
      </table>
      //   <ul>
      //     {items.map((item) => (
      //       <li key={item.name}>{item.name}</li>
      //     ))}
      //   </ul>
    );
  }
};

export default BrakingBad;
