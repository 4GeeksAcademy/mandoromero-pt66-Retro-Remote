import React, { useEffect, useRef } from 'react';
import '../assets/css/TopRated.css';
import { Carousel } from 'react-bootstrap';
import { useGlobalReducer } from '../store';
import 'bootstrap/dist/css/bootstrap.min.css';




function TopRated() {
  const { store } = useGlobalReducer();
  const { movies = [], shows = [] } = store;
  const carouselRef = useRef(null);

  console.log('Movies in TopRated:', movies); 
  console.log('Shows in TopRated:', shows); 
  
  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      const handleMouseEnter = () => {
        const carouselInstance = window.bootstrap.Carousel.getInstance(carousel);
        carouselInstance.pause();
      };

      const handleMouseLeave = () => {
        const carouselInstance = window.bootstrap.Carousel.getInstance(carousel);
        carouselInstance.cycle();
      };

      carousel.addEventListener('mouseenter', handleMouseEnter);
      carousel.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        if (carousel) {
          carousel.removeEventListener('mouseenter', handleMouseEnter);
          carousel.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }
  }, []);

  if (!movies.length && !shows.length) {
    return <div>Loading...</div>;
  }

  const renderCarouselItems = (items, type) => {
    const chunkedItems = [];
    for (let i = 0; i < items.length; i += 5) {
      chunkedItems.push(items.slice(i, i + 5));
    }

    return chunkedItems.map((group, index) => (
      <Carousel.Item 
        key={`${type}-${index}`}
        >
        <div className="d-flex justify-content-center TRated">
          {group.map(item => (
            <div key={item.id} className="p-3">
              {item.poster_path ? (
                <>
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                    alt={type === 'movie' ? item.title : item.name} 
                    className="imgBorder"
                    style={{ 
                      width: "120px", 
                      height: "180px",
                    }}
                  />
                  <p className="mt-2 movie-title">
                    {item.title || item.name}
                  </p>
                </>
              ) : (
                <div>No image available</div>
              )}
            
            </div>   
          ))}
        </div>
      </Carousel.Item>
    ));
  };

  return (
    <div className="containers">
      <div className="conA">
        <div className="carousel">
          <div className="col-12 text-center topRated">
            <h1 className="title">
                Top 20 Rated Movies
            </h1>
          </div>
          <div>
            <Carousel ref={carouselRef} interval={3000} indicators={true}>
              {renderCarouselItems(movies, 'movie')}
            </Carousel>
          </div>
        </div>
      </div>
      <div className="ConB">
        <div className="carousel">
          <div className="col-12 text-center topRated">
            <h1 className="title">
              Top 20 Rated TV Shows
            </h1> 
          </div>
          <Carousel  ref={carouselRef} interval={3000} indicators={true}>
            {renderCarouselItems(shows, 'show')}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default TopRated;
