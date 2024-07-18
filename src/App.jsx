import "./App.css";
import { useEffect, useState } from "react";
import Navbar, {
  NavbarSearchResult,
  NavbarSearch,
  NavbarLike,
} from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";
import { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacters(query);
  const [favourites, setFavourites] = useLocalStorage("FAVOURITES", []);
  const [selectedId, setSelectedId] = useState(null);

  const handleCharacterSelect = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavourite = (char) => {
    setFavourites((prevFavs) => [...prevFavs, char]);
  };

  const handleDelFavourite = (char) => {
    setFavourites((prevFavs) => [
      ...prevFavs.filter((fav) => fav.id !== char.id),
    ]);
  };

  const alreadyAdded = favourites.map((fav) => fav.id).includes(selectedId);

  useEffect(() => {
    const interval = setInterval(() => setCount((c) => c + 1), 1000);
    return () => {
      clearInterval(interval);
    }; // anonymous function => clean up function
  }, [count]);

  return (
    <div className="app">
      <div
        style={{ color: "white", textAlign: "center", marginBottom: "0.5rem" }}
      >
        {count}
      </div>
      <Toaster />
      <Navbar>
        <NavbarSearch query={query} setQuery={setQuery} />
        <NavbarSearchResult numOfResults={characters.length} />
        <NavbarLike
          favourites={favourites}
          delFromFavourites={handleDelFavourite}
        />
      </Navbar>
      <Main>
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleCharacterSelect}
        />
        <CharacterDetails
          selectedId={selectedId}
          onAddFavourite={handleAddFavourite}
          alreadyAdded={alreadyAdded}
          delFromFavourites={handleDelFavourite}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
