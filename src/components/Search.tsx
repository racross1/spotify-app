import { useState, useEffect, ChangeEvent, FormEvent, useCallback } from 'react';
import SearchListItem from './SearchListItem';
import ReactPaginate from 'react-paginate'; 
import '../App.css'

interface SpotifyItem {
  id: string;
  images: { url: string }[];
  name: string;
  type: string;
  album?: SpotifyItem;
}

interface RawSpotifyItem {
    album?: SpotifyItem;
    track?: SpotifyItem;
    episode?: SpotifyItem;
  }

const Search = ({ token }: { token: string }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SpotifyItem[]>([]);
  const [albums, setAlbums] = useState<SpotifyItem[]>([]);
  const [tracks, setTracks] = useState<SpotifyItem[]>([]);
  const [episodes, setEpisodes] = useState<SpotifyItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 10;

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const pageCount = Math.ceil(results.length / PER_PAGE);
  const offset = currentPage * PER_PAGE;
  const currentPageData = results
    .slice(offset, offset + PER_PAGE)
    .map(item => {
      const imageUrl = item.type === 'track' ? item.album?.images[0]?.url : item.images[0]?.url;
      return <SearchListItem key={item.id} name={item.name} type={item.type} imageUrl={imageUrl ? imageUrl : ""} />
    });


  useEffect(() => {
    const fetchData = async () => {
      const fetchedAlbums = await fetchAllSavedData('albums');
      const fetchedTracks = await fetchAllSavedData('tracks');
      const fetchedEpisodes = await fetchAllSavedData('episodes');
  
      setAlbums(fetchedAlbums.filter(Boolean));
      setTracks(fetchedTracks.filter(Boolean));
      setEpisodes(fetchedEpisodes.filter(Boolean));
  
      // Submit button on form is disabled until all data has loaded
      setIsDataLoaded(true);  
    }
  
    fetchData();
  }, [token]);
  
  /*
  TODO: refactor data fetching.
    currently if a user has a large amount of data the page will take a few seconds to load.
    to avoid submitting empty form, the submit button is disabled until all data has loaded (sub-optimal UX).
  */
    const fetchAllSavedData = useCallback(async (endpoint: 'albums' | 'tracks' | 'episodes'): Promise<SpotifyItem[]> => {
        let results: SpotifyItem[] = [];
        
        const fetchPage = async (url: string) => {
            const response: Response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
        
            const data: {items: RawSpotifyItem[], next: string | null} = await response.json();
        
            switch (endpoint) {
            case 'albums':
                results = [...results, ...data.items.map((item: RawSpotifyItem) => item.album).filter((item): item is SpotifyItem => item !== undefined)];
                break;
            case 'tracks':
                results = [...results, ...data.items.map((item: RawSpotifyItem) => item.track).filter((item): item is SpotifyItem => item !== undefined)];
                break;
            case 'episodes':
                results = [...results, ...data.items.map((item: RawSpotifyItem) => item.episode).filter((item): item is SpotifyItem => item !== undefined)];
                break;
            }
        
            // If there's a next page, fetch it recursively
            if (data.next) {
            await fetchPage(data.next);
            }
        }
        
        await fetchPage(`https://api.spotify.com/v1/me/${endpoint}`);
        
        return results;
        }, [token]);
      
  
  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const queryLowercase = query.toLowerCase();
    
    if (query.trim() === '') {
        return;
    }

    setIsLoading(true); 
    const filteredAlbums = albums.filter(album => 
      album.name && album.name.toLowerCase().includes(queryLowercase)
    )
    const filteredTracks = tracks.filter(track => 
      track.name && track.name.toLowerCase().includes(queryLowercase)
    );
    const filteredEpisodes = episodes.filter(episode => 
      episode.name && episode.name.toLowerCase().includes(queryLowercase)
    );

    const combinedResults = [...filteredAlbums, ...filteredTracks, ...filteredEpisodes];

    setResults(combinedResults);

    setIsLoading(false);
    setCurrentPage(0)
}

const clearResults = () => {
    setResults([]);
    setQuery('');
    setCurrentPage(0)
};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={search}>
        <input type="text" value={query} onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} />
        <button className="black-button" type="submit" disabled={!isDataLoaded}>Search</button>
        <button className="black-button" type="button" onClick={clearResults}>Clear</button>
      </form>
      <div>
      {results.length > 1 && <h3>Results: {results.length}</h3> }
      {results.length > 1 && <table>
            <th>Image</th>
            <th>Name</th>
            <th>Type</th>
        {currentPageData}
        </table>}
        {pageCount > 1 && <ReactPaginate
          previousLabel={'← Previous'}
          nextLabel={'Next →'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          previousLinkClassName={'pagination__link'}
          nextLinkClassName={'pagination__link'}
          disabledClassName={'pagination__link--disabled'}
          activeClassName={'pagination__link--active'}
        />}
      </div>
    </div>
  );

}

export default Search;
