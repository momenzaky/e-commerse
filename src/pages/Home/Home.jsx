import { useContext } from 'react';
import { CounterContext } from '../../Context/CounterContext';
import LatestProduct from '../../components/LatestProduct/LatestProduct';
import CategorySlider from '../../components/CategorySlider/CategorySlider';
import MainSlider from '../../components/MainSlider/MainSlider';
import { Helmet } from 'react-helmet';

export default function Home() {
  const { counter, setCounter } = useContext(CounterContext);

  return (
    <div>
      <Helmet>
                <title>HomePage</title>
            </Helmet>
      <MainSlider/>
     <CategorySlider/>
      <LatestProduct/>
      
    </div>
  );
}
