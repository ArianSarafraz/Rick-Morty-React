import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./modal";
import { Character } from "./CharacterList";

export default function Navbar({ children }) {
  return (
    <nav className="navbar">
      <NavbarLogo />
      {children}
    </nav>
  );
}

function NavbarLogo() {
  return <div className="navbar__logo">LOGO 😍</div>;
}

export function NavbarSearch({ query, setQuery }) {
  return (
    <input
      type="text"
      className="text-field"
      placeholder="search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export function NavbarSearchResult({ numOfResults }) {
  return <div className="navbar__result">Found {numOfResults} characters</div>;
}

export function NavbarLike({ favourites , delFromFavourites}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal onOpen={setIsOpen} open={isOpen} title="List of Favourites">
        {favourites.map((item) => (
          <Character key={item.id} item={item}>
          <button className="icon red" onClick={() => delFromFavourites(item)}>
            <TrashIcon />
          </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favourites.length}</span>
      </button>
    </>
  );
}
