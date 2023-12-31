import { useContext } from "react";
import { MainContentContext } from "./mainContentProvider";
import { TMainContentContext } from "./types";

export const useMainContentContext = () => {
  const context = useContext<TMainContentContext | null>(MainContentContext);

  // If context is null, it's being used in wrong place
  if (!context) {
    throw new Error(
      "Must use useMainContentContext within the context of MainContentProvider."
    );
  }
  return context;
};
