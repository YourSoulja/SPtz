import { useState, useEffect } from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router';
import { FavoritePage } from './FavoritePage';
import { FirstPage } from './FirstPages';
import { SecondPage } from './SecondPages';
import { CardDetails } from './CardDetails';

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

function App() {
  const [, setCharApi] = useState<Character[]>([]); 
  const [nameList, setNameList] = useState<Character[]>([]);
  const [filteredList, setFilteredList] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [favoriteCards, setFavoriteCards] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((r) => r.json())
      .then(r => {
        setCharApi(r.results);

        const charApiNameArray = r.results.map((character: { name: any; }) => character.name);
        const charApImgArray = r.results.map((character: { image: any; }) => character.image);
        const data = [
          { first_name: charApiNameArray[0], description: "Гениальный, но циничный ученый.", bigDescription: "Рик Санчез — эксцентричный и гениальный ученый.", imgLink: charApImgArray[0] },
          { first_name: charApiNameArray[1], description: "Наивный и добросердечный подросток.", bigDescription: "Морти Смит — 14-летний мальчик.", imgLink: charApImgArray[1] },
        ];
        setNameList(data);
        setFilteredList(data); 
      });
  }, []);


  useEffect(() => {
    const debounce = setTimeout(() => {
      const filteredName = filterName(searchTerm, nameList);
      setFilteredList(filteredName);
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, nameList]);

  const addToFavorites = (person: Character) => {
    if (favoriteCards.some(card => card.first_name === person.first_name)) {
      setFavoriteCards(favoriteCards.filter(card => card.first_name !== person.first_name));
      setIsFavorite(false);
    } else {
      setFavoriteCards([...favoriteCards, person]);
      setIsFavorite(true);
    }
  };

  const removeFromFavorites = (person: Character) => {
    setFavoriteCards(favoriteCards.filter(card => card.first_name !== person.first_name));
  };

  const firstHalf = filteredList.slice(0, Math.ceil(filteredList.length / 2));
  const secondHalf = filteredList.slice(Math.ceil(filteredList.length / 2));

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
            characters={filteredList}
            isFavorite={isFavorite}
            onAddToFavorites={addToFavorites}
          />
        } />
      </Routes>
    </>
  );
}

export default App;