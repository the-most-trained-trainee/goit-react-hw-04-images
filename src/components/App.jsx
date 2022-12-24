import React from 'react';
import ImmageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import Loader from './Loader';
import getPhotos from './serverRequest';
import { animateScroll as scroll } from 'react-scroll';
import '../styles.css';

class App extends React.Component {
  state = { search: '', pageNo: 1, gallery: [], isLoading: false };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.pageNo > 1) {
      scroll.scrollMore(600);
    } else if (this.state.pageNo === 1) {
      scroll.scrollMore(10);
    }
    // seacthSubmit
    if (this.state.search !== prevState.search) {
      this.setState(
        prevState => ({
          isLoading: !prevState.isLoading,
          pageNo: 1,
          gallery: [],
        }),
        () => this.getGallery()
      );
    }
    // loadMore
    if (this.state.pageNo !== 1 && this.state.pageNo - prevState.pageNo === 1) {
      this.setState(
        prev => ({ isLoading: !prev.isLoading }),
        () => this.getGallery()
      );
    }
  }

  searchSubmit = request => this.setState({ search: request });

  loadMore = () =>
    this.setState(prevState => ({ pageNo: prevState.pageNo + 1 }));

  totalHits = 1;

  getGallery = async () => {
    const { search, pageNo } = this.state;
    const galleryReceived = await getPhotos(search, pageNo);

    if (galleryReceived.totalHits === 0) {
      this.setState(prev => ({ isLoading: !prev.isLoading }));
      this.totalHits = 1;
      alert('Sorry, but no results found :(');
      return;
    }

    this.totalHits = galleryReceived.totalHits;

    const resultingHits = galleryReceived.hits.map(x => ({
      largeImageURL: x.largeImageURL,
      id: x.id,
      webformatURL: x.webformatURL,
    }));

    this.setState(prevState => {
      return {
        gallery: prevState.gallery.concat(resultingHits),
        isLoading: !prevState.isLoading,
      };
    });
  };

  render() {
    const { pageNo, gallery, isLoading } = this.state;

    let loaderShown = false;
    this.totalHits - pageNo * 12 > 11 && !isLoading
      ? (loaderShown = true)
      : (loaderShown = false);

    return (
      <div className="App">
        <Searchbar onSubmit={this.searchSubmit} />
        {gallery.length > 0 && <ImmageGallery pics={gallery} />}
        <div className="loading">
          <Loader loading={isLoading} />
        </div>
        {loaderShown && <Button onClick={this.loadMore} />}
      </div>
    );
  }
}

export default App;
