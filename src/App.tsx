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

  const [charApi, setCharApi] = useState<Character[]>([]); 

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((r) => r.json())
      .then(r => {
        setCharApi(r.results); 
      });
  }, []);
  
  let charApiNameArray: string[] = []; 
  let charApImgArray: string[] = []; 

  if (charApi.length > 0) {
    charApi.forEach(personChar => {
      charApiNameArray.push(personChar.first_name); 
      })
    charApi.forEach(personImg => {
      charApImgArray.push(personImg.imgLink); 
    }
  );


  }
  const data = [
    { first_name: charApiNameArray[0], description: "Гениальный, но циничный ученый, который путешествует по мультивселенной со своим внуком Морти.", bigDescription: " Рик Санчез — эксцентричный и гениальный ученый, известный своими изобретениями и способностью путешествовать между измерениями. Несмотря на свой интеллект, он часто проявляет цинизм, эгоизм и склонность к алкоголизму. Рик часто втягивает свою семью, особенно Морти, в опасные приключения.", imgLink: charApImgArray[0] },
    { first_name: charApiNameArray[1], description: "Внук Рика, наивный и добросердечный подросток, который часто оказывается в опасных ситуациях.", bigDescription: "Морти Смит — 14-летний мальчик, который сопровождает своего деда Рика в его безумных приключениях. Несмотря на свою наивность и неуверенность, Морти часто проявляет храбрость и сострадание. Его отношения с Риком сложны, так как он часто становится жертвой опасных экспериментов деда.", imgLink: charApImgArray[1]},
    { first_name: charApiNameArray[2], description: "Старшая сестра Морти, которая иногда присоединяется к приключениям Рика.", bigDescription: "Саммер Смит — типичный подросток, который стремится к популярности и признанию. Несмотря на свою внешнюю уверенность, она часто чувствует себя недооцененной. Со временем Саммер начинает больше участвовать в приключениях Рика, проявляя смелость и находчивость.", imgLink: charApImgArray[2] },
    { first_name: charApiNameArray[3], description: "Дочь Рика, мать Морти и Саммер, работающая ветеринаром-кардиохирургом.", bigDescription: "Бет Смит — сильная и независимая женщина, которая пытается совмещать карьеру и семейную жизнь. Её отношения с отцом, Риком, сложны из-за его долгого отсутствия в её жизни. Бет часто сомневается в своих решениях, особенно в отношении семьи и работы.", imgLink: charApImgArray[3] },
    { first_name: charApiNameArray[4], description: "Отец Морти и Саммер, муж Бет, часто неудачлив и не уверен в себе.", bigDescription: "Джерри Смит — типичный неудачник, который постоянно пытается доказать свою значимость. Он часто конфликтует с Риком, которого считает плохим влиянием на свою семью. Несмотря на свои недостатки, Джерри любит свою семью и пытается быть хорошим отцом.", imgLink: charApImgArray[4] },
    { first_name: charApiNameArray[5], description: "Принцесса из кластера Абаданго, с которой Рик и Морти сталкиваются в одном из своих приключений.", bigDescription: 'Принцесса Абаданго — инопланетная особа королевских кровей, которая обладает уникальными способностями. Она появляется в эпизоде, где Рик и Морти пытаются решить её проблемы, что приводит к неожиданным последствиям.',imgLink: charApImgArray[5] },
    { first_name: charApiNameArray[6], description: "Гибрид Авраама Линкольна и Адольфа Гитлера, созданный Риком.", bigDescription: "Абрадольф Линклер — результат эксперимента Рика по созданию идеального лидера. Он сочетает в себе черты двух исторических личностей, что приводит к внутреннему конфликту между добром и злом. Его появление добавляет сюжету мультсериала элемент философского размышления.", imgLink: charApImgArray[6] },
    { first_name: charApiNameArray[7], description: "Рик из параллельной вселенной, который служит судьёй в Совете Риков.", bigDescription: "Аджудикатор Рик — один из многих Риков в мультивселенной, который занимает важную должность в Совете Риков. Он отвечает за поддержание порядка среди различных версий Рика и часто сталкивается с главным Риком из-за его анархичных поступков.", imgLink: charApImgArray[7] },
    { first_name: charApiNameArray[8], description: "Руководитель агентства, с которым сталкиваются Рик и Морти.", bigDescription: 'Директор агентства — бюрократ, который пытается контролировать действия Рика и Морти. Его персонаж часто служит сатирой на государственные структуры и их неэффективность.', imgLink: charApImgArray[8] },
    { first_name: charApiNameArray[9], description: "Призрак, который может создавать поезда из ниоткуда.", bigDescription: 'Алан Рейлс — уникальный персонаж, который использует свои способности для борьбы с несправедливостью. Его появление добавляет в сюжет элемент фантазии и неожиданности.', imgLink: charApImgArray[9] },
    { first_name: charApiNameArray[10], description: "Версия Альберта Эйнштейна в мультивселенной Rick and Morty.", bigDescription: "В мультсериале Эйнштейн представлен как один из многих гениев, с которыми Рик взаимодействует. Его персонаж служит отсылкой к реальному учёному и добавляет юмористический элемент.", imgLink: charApImgArray[10] },
    { first_name: charApiNameArray[11], description: "Персонаж, который появляется в одном из эпизодов, связанных с приключениями Рика и Морти.", bigDescription: 'Александр — второстепенный персонаж, чьи действия часто приводят к комическим ситуациям. Его роль в сюжете обычно связана с взаимодействием с главными героями.', imgLink: charApImgArray[11] },
    { first_name: charApiNameArray[12], description: "Инопланетное существо, с которым сталкиваются Рик и Морти.", bigDescription: 'Гуга — один из многих инопланетных существ, которые добавляют в сюжет элемент фантастики и юмора. Его уникальные способности и поведение делают его запоминающимся персонажем.', imgLink: charApImgArray[12] },
    { first_name: charApiNameArray[13], description: "Версия Морти из параллельной вселенной.", bigDescription: 'Инопланетный Морти — один из многих вариантов Морти в мультивселенной. Его появление часто связано с сюжетами, затрагивающими тему мультиверса.', imgLink: charApImgArray[13] },
    { first_name: charApiNameArray[14], description: "Версия Рика из параллельной вселенной.", bigDescription: 'Инопланетный Рик — ещё один вариант главного героя, который может иметь совершенно другие черты характера и мотивации. Его появление добавляет глубины в исследование мультивселенной.', imgLink: charApImgArray[14] },
    { first_name: charApiNameArray[15], description: "Кибернетический организм, живущий в амишской общине.", bigDescription: 'Амишский киборг — уникальный персонаж, который сочетает в себе традиции амишей и высокие технологии. Его появление служит сатирой на конфликт между традициями и прогрессом.', imgLink: charApImgArray[15] },
    { first_name: charApiNameArray[16], description: "Персонаж, который появляется в одном из эпизодов, связанных с приключениями Рика и Морти.", bigDescription: 'Энни — второстепенный персонаж, чьи действия часто приводят к комическим ситуациям. Её роль в сюжете обычно связана с взаимодействием с главными героями', imgLink: charApImgArray[16] },
    { first_name: charApiNameArray[17], description: "Версия Морти с антеннами на голове.", bigDescription: 'Морти с антеннами — один из многих вариантов Морти в мультивселенной. Его уникальная внешность и способности делают его запоминающимся персонажем.', imgLink: charApImgArray[17] },
    { first_name: charApiNameArray[18], description: "Версия Рика с антеннами на голове.", bigDescription: 'Рик с антеннами — ещё один вариант главного героя, который может иметь совершенно другие черты характера и мотивации. Его появление добавляет глубины в исследование мультивселенной.', imgLink: charApImgArray[18] },
    { first_name: charApiNameArray[19], description: "Персонаж, который утверждает, что у него муравьи в глазах.", bigDescription: 'Джонсон — комический персонаж, чья фраза "у меня муравьи в глазах" стала мемом. Его появление добавляет в сюжет элемент абсурдного юмора.', imgLink: charApImgArray[19] },
  ];

  const [nameList, setNameList] = useState<Character[]>(data.map(person => ({ ...person, name: person.first_name, image: '' })));
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [favoriteCards, setFavoriteCards] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);


  useEffect(() => {
    const debounce = setTimeout(() => {
      const filteredName = filterName(searchTerm, data.map(person => ({ ...person, name: person.first_name, image: ''  })));//+
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
          characters={data}
          isFavorite={isFavorite}
          onAddToFavorites={addToFavorites}
        />
      } />
            </Routes>

    </>
  );
}

export default App;