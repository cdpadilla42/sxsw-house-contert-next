import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head';
import dbConnect from '../util/dbConnect';
import serialize from '../util/serializeData';
import Restaurants from '/models/Restaurants';
import { useQuery } from 'react-query';
import queryString from 'query-string';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2RwYWRpbGxhNDIiLCJhIjoiY2tyNms5dzRsMWphYzJubjNxbDZqOHBwbyJ9.v-4FKZnlExdu_wmXrtgPvw';

const queryObjToString = (queryObj) => {
  if (Object.keys(queryObj).length === 0) return '';
  const s = queryString.stringify(queryObj);
  return '?' + s;
};

const getRestaurants = async ({ queryKey }) => {
  const [_, query] = queryKey;
  const blob = await fetch(
    `http://localhost:3000/api/restaurants${queryObjToString(query)}`
  );
  const data = await blob.json();
  console.log(data);
  console.log(query);
  return data;
};

const testCoords = [
  [-73.98241999999999, 40.579505],
  [-73.9068506, 40.6199034],
  [-73.961704, 40.662942],
];

export default function Home({ vacaySpot }) {
  const [filters, setFilters] = useState({ borough: 'Staten Island' });
  const [input, setInput] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const map = useRef(null);
  const center = [-73.9012, 40.6839];
  const { data } = useQuery(['restaurants', filters], getRestaurants);
  const handleClick = (e) => {
    setFilters({ ...filters, borough: input });
  };

  const handleChange = (e) => {
    setInput(e.currentTarget.value);
  };

  const initiatePin = (coords) => {
    const el = document.createElement('div');
    el.className = 'marker';
    ReactDOM.render(<div className="marker" />, el);
    new mapboxgl.Marker(el).setLngLat(coords).addTo(map.current);
  };

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom: 10,
    });

    setMapLoaded(true);

    return () => map.current.remove();
  }, []);

  useEffect(() => {
    if (mapLoaded && data) {
      data?.data?.forEach(({ address }) => {
        initiatePin(address.coord);
      });
    }
  }, [mapLoaded, data]);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{vacaySpot.name}</h1>
        <input type="text" value={input} onChange={handleChange} />
        <button onClick={handleClick}>Get Brooklyn Restaurants</button>

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        <div className="map-wrapper">
          <div className="map-container" ref={mapRef} />
        </div>

        <div className="grid">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className="card">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card"
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .map-wrapper {
          position: relative;
          width: 400px;
        }

        .map-container {
          height: 400px;
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const vacaySpot = await Restaurants.findById('5eb3d668b31de5d588f4292a', {
    name: 1,
  }).lean();

  const props = serialize({ vacaySpot });

  return { props };
}
