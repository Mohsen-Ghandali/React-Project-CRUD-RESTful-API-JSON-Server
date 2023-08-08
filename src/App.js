import React, { useState } from 'react';
import './App.css';

function App() {
  const [dataVisible, setDataVisible] = useState(false);



  const validateInputs = (inputs) => {
    for (const input of inputs) {
      if (!input.value.trim()) {
        alert("Fields cannot be empty.");
        return false;
      }
    }
    return true;
  };


  const getData = async () => {
    try {
      const request = await fetch("http://localhost:3030/user");
      const data = await request.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Error fetching users data.");
    }
  };

  const postData = async (id, firstName, lastName, image) => {
    try {
      let request = await fetch("http://localhost:3030/user", {
        method: "POST",
        body: JSON.stringify({
          id: id,
          firstName: firstName,
          lastName: lastName,
          img: image,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (!request.ok) {
        throw new Error("Failed to post data. Status: " + request.status);
      }

      console.log("Data posted successfully!");
    } catch (error) {
      console.error("Error posting data:", error);
      throw new Error("Error posting data or make sure this ID is not duplicated.");
    }
  };

  const deleteData = async (id) => {
    try {
      let request = await fetch(`http://localhost:3030/user/${id}`, {
        method: "DELETE",
      });

      if (!request.ok) {
        throw new Error("Failed to remove data. Status: " + request.status);
      }

      console.log("Data removed successfully!");
    } catch (error) {
      console.error("Error removing data:", error);
      throw new Error("Error removing data.");
    }
  };

  const editData = async (id, firstName, lastName, image) => {
    try {
      let request = await fetch(`http://localhost:3030/user/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          img: image,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (!request.ok) {
        throw new Error("Failed to edit data. Status: " + request.status);
      }

      console.log("Data edited successfully!");
    } catch (error) {
      console.error("Error editing data:", error);
      throw new Error("Error editing data.");
    }
  };

  const handleShowClick = async () => {
    if (dataVisible) {
      setDataVisible(false);
    } else {
      try {
        const data = await getData();
        setData(data);
        setDataVisible(true);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleCreateClick = () => {
    const id = document.querySelector("div.post>input[name=id]").value;
    const firstName = document.querySelector(
      "div.post>input[name=firstName]"
    ).value;
    const lastName = document.querySelector(
      "div.post>input[name=lastName]"
    ).value;
    const image = document.querySelector("div.post>input[name=image]").value;

    const inputs = document.querySelectorAll("div.post>input");
    if (validateInputs(inputs)) {
      postData(id, firstName, lastName, image);
    }
  };

  const handleDeleteClick = () => {
    const id = document.querySelector("div.delete>input").value;
    const input = document.querySelector("div.delete>input");
    if (validateInputs([input])) {
      deleteData(id);
    }
  };

  const handleEditClick = () => {
    const id = document.querySelector("div.edit>input[name=id]").value;
    const firstName = document.querySelector(
      "div.edit>input[name=firstName]"
    ).value;
    const lastName = document.querySelector(
      "div.edit>input[name=lastName]"
    ).value;
    const image = document.querySelector("div.edit>input[name=image]").value;

    const inputs = document.querySelectorAll("div.edit>input");
    if (validateInputs(inputs)) {
      editData(id, firstName, lastName, image);
    }
  };

  const [data, setData] = useState([]);

  return (
    <main>
      <h1>Please Run CMD in the "my-app/src" and write: npm run server</h1>
      <section>
        <div className="cart">
          <div className="cart1">
            <div className="show">
              <h3>Show current users</h3>
              <p>You can see all users in the database.</p>
              <button onClick={handleShowClick}>
                {dataVisible ? "Hide data" : "Show data"}
              </button>
            </div>

            <div className="delete">
              <h3>Delete a user</h3>
              <input type="text" name="id" placeholder="id" />
              <button onClick={handleDeleteClick}>Delete</button>
            </div>
          </div>

          <div className="cart1">
            <div className="post">
              <h3>Create a user</h3>
              <input type="text" name="id" placeholder="id" />
              <input type="text" name="firstName" placeholder="firstName" />
              <input type="text" name="lastName" placeholder="lastName" />
              <input type="text" name="image" placeholder="URL-Image" />
              <button onClick={handleCreateClick}>Create</button>
            </div>

            <div className="edit">
              <h3>Edit a user</h3>
              <input type="text" name="id" placeholder="id" />
              <input type="text" name="firstName" placeholder="firstName" />
              <input type="text" name="lastName" placeholder="lastName" />
              <input type="text" name="image" placeholder="URL-Image" />
              <button onClick={handleEditClick}>Edit</button>
            </div>
          </div>
        </div>

        <div id="show">
          {dataVisible && data.map((elem) => (
            <div className="data" key={elem.id}>
              <img src={elem.img} alt="test" />
              <h5><span>ID Number:</span> {elem.id}</h5>
              <h5><span>First Name:</span> {elem.firstName}</h5>
              <h5><span>Last Name:</span> {elem.lastName}</h5>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
