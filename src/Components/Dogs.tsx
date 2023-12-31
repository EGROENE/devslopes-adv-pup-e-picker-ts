// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
import { DogCard } from "./DogCard";
import { TDog } from "../types";
import { useMainContentContext } from "../useMainContentContext";

export const Dogs = () =>
  // no props allowed
  {
    const { allDogs, activeTab, deleteDogAction, toggleFavoriteAction, isLoading } =
      useMainContentContext();

    let displayedDogs = allDogs;
    if (activeTab === "fav-dogs") {
      displayedDogs = allDogs.filter((dog) => dog.isFavorite);
    }
    if (activeTab === "unfav-dogs") {
      displayedDogs = allDogs.filter((dog) => !dog.isFavorite);
    }

    return (
      <>
        {displayedDogs.map((dog: TDog) => (
          <DogCard
            key={dog.id}
            dog={{
              id: dog.id,
              image: dog.image,
              description: dog.description,
              isFavorite: dog.isFavorite,
              name: dog.name,
            }}
            onTrashIconClick={() => deleteDogAction(dog)}
            onEmptyHeartClick={() => toggleFavoriteAction(dog)}
            onHeartClick={() => toggleFavoriteAction(dog)}
            isLoading={isLoading}
          />
        ))}
      </>
    );
  };
