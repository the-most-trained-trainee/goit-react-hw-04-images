import { useState, useEffect } from 'react';
import ImmageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import Loader from './Loader';
import getPhotos from './serverRequest';
import { animateScroll as scroll } from 'react-scroll';
import '../styles.css';

const PHOTOS_PER_PAGE = 12;

const App = () => {
  const [search, setSearch] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  const picsLeft = totalHits - pageNo * PHOTOS_PER_PAGE;
  const showLoadMore = picsLeft > 0 && !isLoading;

  useEffect(() => {
    if (pageNo > 1) {
      scroll.scrollMore(600);
    } else if (pageNo === 1) {
      scroll.scrollMore(10);
    }
  }, [pageNo]);

  const searchSubmit = request => {
    getGallery(1, request);
  };

  const loadMore = () => {
    const nextPageNo = pageNo + 1;
    getGallery(nextPageNo, search);
  };

  const getGallery = async (page, searchValue) => {
    setIsLoading(true);

    const galleryReceived = await getPhotos(searchValue, page, PHOTOS_PER_PAGE);

    if (galleryReceived.totalHits === 0) {
      setIsLoading(loading => !loading);
      setTotalHits(0);
      alert('Sorry, but no results found :(');
      return;
    }
    setTotalHits(galleryReceived.totalHits);

    const resultingHits = galleryReceived.hits.map(x => ({
      largeImageURL: x.largeImageURL,
      id: x.id,
      webformatURL: x.webformatURL,
    }));

    setPageNo(page);

    if (page === 1) {
      setGallery(resultingHits);
    } else {
      setGallery(gallery => gallery.concat(resultingHits));
    }

    setIsLoading(false);
    setSearch(searchValue);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={searchSubmit} />
      {gallery.length > 0 && <ImmageGallery pics={gallery} />}
      <div className="loading">
        <Loader loading={isLoading} />
      </div>
      {showLoadMore && <Button onClick={loadMore} />}
    </div>
  );
};

export default App;
