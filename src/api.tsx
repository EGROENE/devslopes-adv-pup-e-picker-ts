import { Dog } from "./types";

const getAllDogs = (): Promise<unknown> => {
  return fetch("http://localhost:3000/dogs", {
    method: "GET",
    redirect: "follow",
  })
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};

const postDog = (newDogCharacteristics: Omit<Dog, "id">): Promise<unknown> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "name": newDogCharacteristics.name,
    "image": newDogCharacteristics.image,
    "description": newDogCharacteristics.description,
    "isFavorite": false,
    "id": 0,
  });

  return fetch("http://localhost:3000/dogs", {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Could not create dog. Please try again.");
    } else {
      return response.json();
    }
  });
};
const deleteDogRequest = (id: number): Promise<unknown> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-type", "application/json");

  return fetch(`http://localhost:3000/dogs/${id}`, {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  })
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};

const patchFavoriteForDog = (dog: Dog, raw: { isFavorite: boolean }) => {
  // OPTIMISTIC WAY (w/ 2nd param of {isFavorite: boolean})
  const myHeaders = new Headers();
  myHeaders.append("Content-type", "application/json");

  const newBody = JSON.stringify(raw);

  fetch(`http://localhost:3000/dogs/${dog.id}?Content-type=application/json`, {
    method: "PATCH",
    headers: myHeaders,
    body: newBody,
    redirect: "follow",
  })
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  // PESSIMISTIC WAY (w/o 2nd param of {isFavorite: boolean})
  /* const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const newValue: boolean = !dog.isFavorite ? true : false;

  const raw = JSON.stringify({
    "isFavorite": newValue,
  });

  return fetch(`http://localhost:3000/dogs/${dog.id}?Content-type=application/json`, {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  })
    .then((response) => response.json())
    .catch((error) => console.log("error", error)); */
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
