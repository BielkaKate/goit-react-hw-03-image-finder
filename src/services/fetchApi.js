import axios from 'axios';

const API_Key = '23544222-01ada114d06f3f80b4f13a1dd';

const fetchApi = async (query, page) => {
  const response = axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_Key}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return response;
};

export default fetchApi;
