import { Character } from './App';
import Cards from './Cards';

interface FirstPageProps {
  characters: Character[];
  addToFavorites: (person: Character) => void;
  favoriteCards: Character[];
}

export const FirstPage = ({ characters, addToFavorites, favoriteCards }: FirstPageProps) => {
  return (
    <div className="cards-container">
      {characters.map(person => (
        <Cards
          key={person.first_name}
          title={person.first_name}
          description={person.description}
          imgLink={person.imgLink}
          onAddToFavorites={() => addToFavorites(person)}
          isFavorite={favoriteCards.some(card => card.first_name === person.first_name)} name={''} image={''}        />
      ))}
    </div>
  );
};