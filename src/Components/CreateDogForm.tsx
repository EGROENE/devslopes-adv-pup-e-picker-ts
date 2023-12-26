import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import toast from "react-hot-toast";
import { useMainContentContext } from "../useMainContentContext";

export const CreateDogForm = () =>
  // no props allowed
  {
    const { isLoading, createNewDog, refetchDogs } = useMainContentContext();

    const defaultImage = dogPictures.BlueHeeler;

    const [newDogName, setNewDogName] = useState<string>("");
    const [newDogDescription, setNewDogDescription] = useState<string>("");
    const [newDogImage, setNewDogImage] = useState<string>(defaultImage);

    const newDogCharacteristics: {
      name: string;
      description: string;
      image: string;
      isFavorite: boolean;
    } = {
      name: newDogName,
      description: newDogDescription,
      image: newDogImage,
      isFavorite: false,
    };

    const resetForm = (): void => {
      setNewDogName("");
      setNewDogDescription("");
      setNewDogImage(defaultImage);
    };

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          createNewDog(newDogCharacteristics)
            .then(() => {
              toast.success(`${newDogName} created!`);
              resetForm();
              // refetchDogs() should be here; otherwise, newly created dog won't appear
              // .catch() added so as not to piss off the TS gods
              refetchDogs().catch((error) => console.log(error));
            })
            .catch((error) => {
              toast.error(`Could not create ${newDogName}`);
              console.log(error);
            });
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          disabled={isLoading}
          type="text"
          value={newDogName}
          onChange={(e) => setNewDogName(e.target.value)}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          disabled={isLoading}
          name=""
          id=""
          cols={80}
          rows={10}
          onChange={(e) => setNewDogDescription(e.target.value)}
          value={newDogDescription}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          value={newDogImage}
          id=""
          onChange={(e) => setNewDogImage(e.target.value)}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option disabled={isLoading} value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" />
      </form>
    );
  };
