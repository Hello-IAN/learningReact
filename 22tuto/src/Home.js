import Feed from './Feed';
import { useStoreState, useStoreActions } from 'easy-peasy';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useLayoutEffect } from 'react';

const Home = ( ) => {
  const searchResults = useStoreState((state) => state.searchResults);
  const setPosts = useStoreActions((actions) => actions.setPosts);
	const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useLayoutEffect(() => {
		setPosts(data);
	}, [data, setPosts]) /* only first loading	*/
  return (
    <main className='Home'>
      {isLoading && <p className="statusMsg">Loading.. posts...</p>}
      {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
      {!isLoading && !fetchError && searchResults && (searchResults.length ? <Feed posts= {searchResults} /> : <p className='statusMsg'>No posts to display.</p>)}
    </main>
  )
}

export default Home