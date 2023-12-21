import { ReactNode } from "react";
import { TDog } from "../types";
import { useMainContentContext } from "../useMainContentContext";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { allDogs, activeTab, toggleTabs } = useMainContentContext();

  const favsCount: number = allDogs.filter((dog: TDog) => dog.isFavorite).length;

  const unfavsCount: number = allDogs.filter((dog: TDog) => !dog.isFavorite).length;

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          <div
            className={activeTab === "fav-dogs" ? "selector active" : "selector"}
            onClick={() => toggleTabs("fav-dogs")}
          >
            favorited ( {favsCount} )
          </div>
          <div
            className={activeTab === "unfav-dogs" ? "selector active" : "selector"}
            onClick={() => toggleTabs("unfav-dogs")}
          >
            unfavorited ( {unfavsCount} )
          </div>
          <div
            className={activeTab === "create-dog-form" ? "selector active" : "selector"}
            onClick={() => toggleTabs("create-dog-form")}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
