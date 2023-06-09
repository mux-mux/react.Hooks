import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
  const { loading, request, error, clearError, process, setProcess } = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = '01f2e2e123368220041720582fe584a4';
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&apikey=${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&apikey=${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformCharacter = (data) => {
    let descr = data.description ? data.description : 'No Data';
    descr = descr.length > 200 ? descr.slice(0, 200) + '...' : descr;
    return {
      name: data.name,
      description: descr,
      thumbnail: data.thumbnail.path + '.' + data.thumbnail.extension,
      homepage: data.urls[0].url,
      wiki: data.urls[1].url,
      id: data.id,
      comics: data.comics.items,
    };
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || 'There is no description',
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : 'No information about the number of pages',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      language: comics.textObjects[0]?.language || 'en-us',
      // optional chaining operator
      price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
    };
  };

  return {
    loading,
    error,
    process,
    setProcess,
    getAllCharacters,
    getCharacter,
    clearError,
    getAllComics,
    getComic,
    getCharacterByName,
  };
};

export default useMarvelService;
