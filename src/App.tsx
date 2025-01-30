import { useState, useEffect } from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router';
import { FavoritePage } from './FavoritePage';
import { FirstPage } from './FirstPages';
import { SecondPage } from './SecondPages';
import { CardDetails } from './CardDetails';

export interface Character {
  first_name: string;
  description?: string;
  bigDescription?: string;
  imgLink?: string;
}

const filterName = (searchText: string, listName: Character[]) => {
  if (!searchText) return listName;
  return listName.filter(person => person.first_name.toLowerCase().includes(searchText.toLowerCase()));
}

function App() {
  const data = [
    { first_name: "Трэйси Марроу", description: "Знаменитый рэпер с Земли", bigDescription: "Знаменитый рэпер с Земли, на самом деле являющийся нестареющим блуждающим пришельцем из времен под названием Water-T.", imgLink: "src/assets/img/Tracy.jpg" },
    { first_name: "Абрадольф", description: "Результат эксперимента ", bigDescription: "Результат эксперимента в эпизоде 'Ricksy Business'. Был создан, когда Рик попытался создать идеального лидера путем скрещивания ДНК Авраама Линкольна и Адольфа Гитлера", imgLink: "src/assets/img/Abradolph.jpg" },
    { first_name: "Бет Смит", description: "Дочь Рика, мать Морти и жена Джерри", bigDescription: "Дочь Рика, мать Морти и жена Джерри. 34 года. Работает кардиохирургом-ветеринаром — преимущественно лошадиным.Имеет проблемы с алкоголем, считает себя неполноценной. Ханжа", imgLink: "src/assets/img/Bet.jpg" },
    { first_name: "Брэд", description: "Ученик Гарри Херпсонской", bigDescription: "Ученик Гарри Херпсонской старшей школы, парень Джессики.", imgLink: "src/assets/img/Bred.jpg" },
    { first_name: "Джейкоб", description: "Друг семьи родителей Джерри ", bigDescription: "Друг семьи родителей Джерри и, как выяснилось позже, любовник Джойс. Впервые упоминается в серии 'Anatomy Park'.", imgLink: "src/assets/img/Jacob.jpg" },
    { first_name: "Джерри Смит", description: "Ричард Джеральд 'Джерри' Смит Отец Морти, муж Бетти", bigDescription: 'Ричард Джеральд "Джерри" Смит Отец Морти, муж Бетти. Наивный и глупый человек с кучей комплексов.Работает во второсортном рекламном агентстве, из-за чего часто сидит без работы. Поклонник фильма "Титаник".',imgLink: "src/assets/img/Djerry.jpg" },
    { first_name: "Джессика", description: "Привлекательная девушка", bigDescription: "Привлекательная девушка, которая учится вместе с Морти в математическом классе и в которую он влюблен. Встречается с Бредом, но на самом деле не любит его.", imgLink: "src/assets/img/Jesica.jpg" },
    { first_name: "Джойс Смит", description: "Мать Джерри", bigDescription: "Мать Джерри, бабушка Морти по отцовской лини, жена Леонарда. Из-за импотенции её мужа, завела любовника Джейкоба.", imgLink: "src/assets/img/Djoy.jpg" },
    { first_name: "Доктор Ксенон Блум", description: "Блум — амеба", bigDescription: 'Один из главных героев в эпизоде "Anatomy Park". Блум — амеба, соучредитель Anatomy Park.', imgLink: "src/assets/img/Dr.jpg" },
    { first_name: "Дуфус Рик", description: "Наименее уважаемый из Риков", bigDescription: 'Наименее уважаемый из Риков, но также самый добрый из них. Впервые появился в серии "Close Rick-Counters of the Rick Kind"', imgLink: "src/assets/img/Dufus.jpg" },
    { first_name: "Дэвин", description: "Коллега Бет в Госпитале ", bigDescription: "Коллега Бет в Госпитале Св. Эквуса. Влюблен в нее, постоянно пытается соблазнить и завоевать ее.", imgLink: "src/assets/img/Davin.jpg" },
    { first_name: "Зип Ханфлорп", description: "Ученый из 'Микровселенной Батареи'", bigDescription: 'Ученый из "Микровселенной Батареи" Рика, который создает собственную микро-планету под названием "Miniverse".', imgLink: "src/assets/img/Zip.jpg" },
    { first_name: "Злой Морти", description: "Одна из бесконечных версий Морти", bigDescription: 'Одна из бесконечных версий Морти. Впервые появился в серии "Close Rick-Counters of the Rick Kind" как второстепенный антагонист.', imgLink: "src/assets/img/BadM.jpg" },
    { first_name: "Злой Рик", description: "Главный антагонист", bigDescription: 'Появляющийся в серии "Close Rick-Counters of the Rick Kind" главный антагонист.', imgLink: "src/assets/img/BadR.jpg" },
    { first_name: "Итан", description: "Бывший парень Саммер", bigDescription: 'Бывший парень Саммер. Появился в эпизоде "Anatomy Park".', imgLink: "src/assets/img/Ithan.jpg" },
    { first_name: "Кевин", description: "Скромный Зигерион", bigDescription: 'Второстепенный персонаж, показанный в эпизоде "M. Night Shaym-Aliens!". Скромный Зигерион, которого постоянно дразнят за тормозной характер.', imgLink: "src/assets/img/Kevin.jpg" },
    { first_name: "Ковбой Морти", description: "Появляется в серии ", bigDescription: 'Ковбой Морти появляется в серии "Close Rick-Counters of the Rick Kind" вместе с Ковбоем Риком.', imgLink: "src/assets/img/CowboyM.jpg" },
    { first_name: "Ковбой Рик", description: "Ковбой Рик появляется в серии ", bigDescription: 'Ковбой Рик появляется в серии "Close Rick-Counters of the Rick Kind" вместе с Ковбоем Морти.', imgLink: "src/assets/img/CowboyRick.jpg" },
    { first_name: "Король Желатин", description: "Гигантское антропоморфное желе", bigDescription: 'Впервые появившееся в эпизоде "Meeseeks and Destroy" гигантское антропоморфное желе. Король.', imgLink: "src/assets/img/King.jpg" },
    { first_name: "Король Флиппи Нипс", description: "Правитель Плутона", bigDescription: 'Правитель Плутона. Впервые появился в эпизоде "Something Ricked This Way Comes" в качестве второстепенного антагониста.', imgLink: "src/assets/img/KingTwo.jpg" },
  ];

  const [nameList, setNameList] = useState<Character[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [favoriteCards, setFavoriteCards] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);


  useEffect(() => {
    const debounce = setTimeout(() => {
      const filteredName = filterName(searchTerm, data);
      setNameList(filteredName);
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

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

  const firstHalf = nameList.slice(0, Math.ceil(nameList.length / 2));
  const secondHalf = nameList.slice(Math.ceil(nameList.length / 2));

  return (
    <>
      <header>
        <Link to='/'>
          <img src="src/assets/img/rickAndMorty.png" alt="" />
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
            <Route path="/:first_name" element={<CardDetails characters={data} isFavorite={isFavorite} onAddToFavorites={addToFavorites} />} />
            </Routes>
    </>
  );
}

export default App;