import { useAppSelector } from './hooks/reducAppHooks';
import JoiningScreen from './screens/JoiningScreen';
import Meet from './screens/Meet';
import { getRoom } from './store/slices/roomSlice';

function App() {
  const room = useAppSelector(getRoom);

  return !room ? <JoiningScreen /> : <Meet />;
}

export default App;
