import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Jokes = () => {   
    const [jokes, setJokes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  const fetchJokes = async () => {
  setLoading(true);
  setError(null);
  try{
    const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
    if(!response.ok){
        throw new Error('Failed to fetch jokes');
  }
  const data = await response.json();
  setJokes(data);
  } catch (error){
    setError(error.message);
  } finally {
    setLoading(false);
  }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Jokes</h2>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-xl italic">"{jokes.setup}"</p>
          <p className="mt-4 text-gray-500">- {jokes.punchline}</p>
        </div>
        <div className="text-center mt-6">
         <button onClick={fetchJokes} className='bg-blue-500 text-white px-4 py-2 rounded-md'>
            Show Another Joke
          </button>
        </div>
      </div>
  );
};

export default Jokes;