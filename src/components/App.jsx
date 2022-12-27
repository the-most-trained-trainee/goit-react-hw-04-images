import { useState, useEffect } from 'react';
import ImmageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import Loader from './Loader';
import getPhotos from './serverRequest';
import { animateScroll as scroll } from 'react-scroll';
import '../styles.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadmore, setIsLoadmore] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (pageNo > 1) {
      scroll.scrollMore(600);
    } else if (pageNo === 1) {
      scroll.scrollMore(10);
    }
  }, [pageNo]);

  // Search Submit
  useEffect(() => {
    if (search) {
      setIsLoading(loading => !loading);
      setPageNo(1);
      setGallery([]);
      getGallery();
    }
  }, [search]);

  // Load More Button
  useEffect(() => {
    if (pageNo !== 1) {
      setIsLoading(loading => !loading);
      getGallery();
    }
  }, [pageNo]);

  // Load More Shown
  useEffect(() => {
    if (totalHits - pageNo * 12 > 0 && isLoading === false) {
      setIsLoadmore(true);
    } else {
      setIsLoadmore(false);
    }
  }, [isLoading]);

  const searchSubmit = request => setSearch(request);

  const loadMore = () => setPageNo(page => page + 1);

  const getGallery = async () => {
    const galleryReceived = await getPhotos(search, pageNo);

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

    setGallery(gallery => gallery.concat(resultingHits));
    setIsLoading(loading => !loading);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={searchSubmit} />
      {gallery.length > 0 && <ImmageGallery pics={gallery} />}
      <div className="loading">
        <Loader loading={isLoading} />
      </div>
      {isLoadmore && <Button onClick={loadMore} />}
      {/* {<Button onClick={loadMore} />} */}
    </div>
  );
};

export default App;
