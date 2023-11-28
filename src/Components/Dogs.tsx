// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
import { useContext } from "react";
import { SectionContext } from "../App";
import { DogCard } from "./DogCard";
import { Dog } from "../types";

export const Dogs = () =>
  // no props allowed
  {
    const sectionContextValues = useContext(SectionContext);

    let displayedDogs = sectionContextValues.allDogs;
    if (sectionContextValues.activeTab === "fav-dogs") {
      displayedDogs = allDogs.filter((dog) => dog.isFavorite);
    }
    if (sectionContextValues.activeTab === "unfav-dogs") {
      displayedDogs = allDogs.filter((dog) => !dog.isFavorite);
    }

    return (
      <>
        {displayedDogs.map((dog: Dog) => (
          <DogCard
            dog={{
              id: dog.id,
              image: dog.image,
              description: dog.description,
              isFavorite: dog.isFavorite,
              name: dog.name,
            }}
          />
        ))}
      </>
    );
  };
