import { ReactNode, useContext } from "react";
import { SectionContext } from "../App";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const sectionContextValues = useContext(SectionContext);

  const favsCount: number = sectionContextValues.allDogs.filter(
    (dog) => dog.isFavorite === true
  ).length;

  const unfavsCount: number = sectionContextValues.allDogs.filter(
    (dog) => dog.isFavorite !== true
  ).length;

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${"active"}`}
            onClick={() => {
              alert("click favorited");
            }}
          >
            favorited ( {favsCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${""}`}
            onClick={() => {
              alert("click unfavorited");
            }}
          >
            unfavorited ( {unfavsCount} )
          </div>
          <div
            className={`selector ${""}`}
            onClick={() => {
              alert("clicked create dog");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
