export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        return await res.json();
    }

    getAllCharacters = async () =>  {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        // return res.map(this._transformCharacter);
        const answ = [];
        res.forEach((element, i) => {
            answ.push(this._transformCharacter(element, i + 41));
        });
        return answ;
    }

    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character, id);
    }

    getAllHouses = () => {
        return this.getResource('/houses/');
    }

    getHouse = (id) => {
        return this.getResource(`/houses/${id}`);
    }

    getAllBooks = () => {
        return this.getResource('/books/');
    }

    getBook = (id) => {
        return this.getResource(`/books/${id}`);
    }

    _transformNoData = (info) => {
        for (let key in info) {
            if (info[key] === '') {
                info[key] = 'no data';
            }
        }
        return info;
    }

    _transformCharacter = (char, id) => {
        return this._transformNoData({
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
            key: id
        });
    }

    _transformHouse = (house) => {
        return this._transformNoData({
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        });
    }

    _transformBook = (book) => {
        return this._transformNoData({
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        });
    }
}

// const got = new GotService();
// got.getAllCharacters()
//     .then(res => {
//         res.forEach( item => console.log(item.name))
//     });
// got.getCharacter(130)
//     .then(res => console.log(res));
