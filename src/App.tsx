import { useState, useEffect } from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router';
import { FavoritePage } from './FavoritePage';
import { FirstPage } from './FirstPages';
import { SecondPage } from './SecondPages';
import { CardDetails } from './CardDetails';

export interface Character {
  first_name: string;
  name: string; 
  image: string;
  description: string;
  bigDescription: string;
  imgLink: string;
}

const filterName = (searchText: string, listName: Character[]) => {
  if (!searchText) return listName;
  return listName.filter(person => person.first_name.toLowerCase().includes(searchText.toLowerCase()));
}

function App() {
  const [, setCharApi] = useState<Character[]>([]); 
  const [nameList, setNameList] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [favoriteCards, setFavoriteCards] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    console.log("I'm working");
    fetch("https://rickandmortyapi.com/api/character")
      .then((r) => r.json())
      .then(r => {
        setCharApi(r.results); 
        const updatedData = r.results.map((character: any) => ({
          first_name: character.name,
          description: "Описание отсутствует",
          bigDescription: "Описание отсутствует",
          imgLink: character.image,
          name: character.name,
          image: character.image,
        }));
        setNameList(updatedData);
      });
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      const filteredName = filterName(searchTerm, nameList);
      setNameList(filteredName);
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const addToFavorites = (person: Character) => {
    if (favoriteCards.some(card => card.first_name === person.first_name)) {
      setFavoriteCards(favoriteCards.filter(card => card.first_name !== person.first_name));
    } else {
      setFavoriteCards([...favoriteCards, person]);
    }
  };

  const removeFromFavorites = (person: Character) => {
    setFavoriteCards(favoriteCards.filter(card => card.first_name !== person.first_name));
  };

  const firstHalf = nameList.slice(0, Math.ceil(nameList.length / 2));
  const secondHalf = nameList.slice(Math.ceil(nameList.length / 2));

  return (
    <>
      <header>
        <Link to='/'>
          <img src="./img/rickAndMorty.png" alt="" />
        </Link>
        <Link to='/favorite'>
          <button className="button2">
            Избранное
          </button>
        </Link>
      </header>

      <Routes>
        <Route path="/" element={
          <>
            <input
              type="text"
              autoComplete="off"
              name="text"
              className="input"
              placeholder="Введите персонажа"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
              <button
                className='clickbutton'
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <span className="transition"></span>
                <span className="gradient"></span>
                <span className="label">Назад</span>
              </button>
              <button
                className='clickbutton'
                onClick={() => setCurrentPage(2)}
                disabled={currentPage === 2}
              >
                <span className="transition"></span>
                <span className="gradient"></span>
                <span className="label">Вперед</span>
              </button>
            </div>
            {currentPage === 1 ? (
              <FirstPage
                characters={firstHalf}
                addToFavorites={addToFavorites}
                favoriteCards={favoriteCards}
              />
            ) : (
              <SecondPage
                characters={secondHalf}
                addToFavorites={addToFavorites}
                favoriteCards={favoriteCards}
              />
            )}
          </>
        } />
        <Route path="/favorite" element={<FavoritePage favoriteCards={favoriteCards} onRemoveFromFavorites={removeFromFavorites} />} />
        <Route path="/:first_name" element={
          <CardDetails
            characters={nameList}
            onAddToFavorites={addToFavorites} isFavorite={false}          />
        } />
      </Routes>
    </>
  );
}

export default App;