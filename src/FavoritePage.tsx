import { useEffect, useState } from "react";
import Cards from "./Cards";
import { Link } from 'react-router';

export interface Character {
  first_name: string;
  description: string;
  bigDescription: string;
  imgLink: string;
}

const filterName = (searchText: string, listName: Character[]) => {
  if (!searchText) return listName;
  return listName.filter(person => person.first_name.toLowerCase().includes(searchText.toLowerCase()));
}

export const FavoritePage = ({ favoriteCards, onRemoveFromFavorites }: { favoriteCards: Character[], onRemoveFromFavorites: (person: Character) => void }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCards, setFilteredCards] = useState<Character[]>(favoriteCards);

  useEffect(() => {
    const debounce = setTimeout(() => {
      const filteredName = filterName(searchTerm, favoriteCards);
      setFilteredCards(filteredName);
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, favoriteCards]);

  return (
    <>
      <input 
          type="text" 
          autoComplete="off" 
          name="text" 
          className="input" 
          placeholder="Введите персонажа" 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />  
      {filteredCards.length === 0 && <h2 className="trash">Пусто</h2>}
      {filteredCards.length > 0 && (
        <div className="cards-container">
          {filteredCards.map(person => (
            <Cards
              key={person.first_name}
              title={person.first_name}
              description={person.description}
              imgLink={person.imgLink}
              onAddToFavorites={() => onRemoveFromFavorites(person)}
              isFavorite={true}          >
              <Link to={`/${person.first_name}`}>
                <button className="button1">
                  <span>Подробнее</span>
                </button>
              </Link>
            </Cards>
          ))}
        </div>
      )}
    </>
  );
};
