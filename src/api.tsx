import { TDog } from "./types";

const serverURL = "http://localhost:3000/dogs";

const getAllDogs = (): Promise<TDog[]> => {
  return fetch(serverURL, {
    method: "GET",
    redirect: "follow",
  }).then((response) => response.json() as Promise<TDog[]>);
};

const postDog = (newDogCharacteristics: Omit<TDog, "id">): Promise<Response> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "name": newDogCharacteristics.name,
    "image": newDogCharacteristics.image,
    "description": newDogCharacteristics.description,
    "isFavorite": false,
    "id": 0,
  });

  return fetch(serverURL, {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Could not create dog.");
    }
    return response;
  });
};
const deleteDogRequest = (id: number): Promise<Response> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-type", "application/json");

  return fetch(`${serverURL}/${id}`, {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  });
};

const patchFavoriteForDog = (
  dog: TDog,
  raw: { isFavorite: boolean }
): Promise<Response> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-type", "application/json");

  const newBody = JSON.stringify(raw);

  return fetch(`${serverURL}/${dog.id}?Content-type=application/json`, {
    method: "PATCH",
    headers: myHeaders,
    body: newBody,
    redirect: "follow",
  });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
