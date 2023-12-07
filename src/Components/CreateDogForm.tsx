import { useState, useContext, Dispatch, SetStateAction } from "react";
import { dogPictures } from "../dog-pictures";
import { SectionContext } from "../App";
import { Dog } from "../types";
import toast from "react-hot-toast";

export const CreateDogForm = () =>
  // no props allowed
  {
    const sectionContextValues: {
      isLoading: boolean;
      refetchDogs: () => void;
      createNewDog: (newDogCharacteristics: Omit<Dog, "id">) => Promise<Response>;
      setIsLoading: Dispatch<SetStateAction<boolean>>;
    } = useContext(SectionContext);

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

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          sectionContextValues.setIsLoading(true);
          sectionContextValues
            .createNewDog(newDogCharacteristics)
            .then((response) => {
              if (!response.ok) {
                toast.error("Couldn't create dog. Please try again.");
              } else {
                sectionContextValues.refetchDogs();
                toast.success(`${newDogCharacteristics.name} created!`);
                setNewDogName("");
                setNewDogDescription("");
                setNewDogImage(defaultImage);
              }
            })
            .catch((error) => console.log(error))
            .finally(() => sectionContextValues.setIsLoading(false));
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          disabled={sectionContextValues.isLoading}
          type="text"
          value={newDogName}
          onChange={(e) => setNewDogName(e.target.value)}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          disabled={sectionContextValues.isLoading}
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
              <option
                disabled={sectionContextValues.isLoading}
                value={pictureValue}
                key={pictureValue}
              >
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" />
      </form>
    );
  };
