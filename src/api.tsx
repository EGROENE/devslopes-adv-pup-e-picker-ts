const getAllDogs = (): Promise<unknown> => {
  return fetch("http://localhost:3000/dogs", {
    method: "GET",
    redirect: "follow",
  })
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};

const postDog = () => {
  // fill out method
};
const deleteDogRequest = () => {
  // fill out method
};

const patchFavoriteForDog = () => {
  // fill out method
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
