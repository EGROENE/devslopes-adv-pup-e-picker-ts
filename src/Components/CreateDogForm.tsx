import { useState, useContext } from "react";
import { dogPictures } from "../dog-pictures";
import { SectionContext } from "../App";

export const CreateDogForm = () =>
  // no props allowed
  {
    const sectionContextValues: {
      createNewDog: () => Promise<void>;
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
          sectionContextValues.createNewDog(newDogCharacteristics);
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input type="text" onChange={(e) => setNewDogName(e.target.value)} />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          onChange={(e) => setNewDogDescription(e.target.value)}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select id="" onChange={(e) => setNewDogImage(e.target.value)}>
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" />
      </form>
    );
  };
