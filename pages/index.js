import Head from 'next/head';
import styled from 'styled-components';
import Container from '../components/Container';
import dbConnect from '../util/dbConnect';
import serialize from '../util/serializeData';
import Restaurants from '/models/Restaurants';

export default function Home({ vacaySpot }) {
  return (
    <div className="container">
      <Head>
        <title>Gluten Free Near Me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledBody>
        <Container />
      </StyledBody>
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

const StyledBody = styled.main`
  box-sizing: border-box;
  width: 100%;
  padding: 15px;
`;
