import './App.css';
import { Home, Orders, Details } from './pages';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/orders" component={ Orders } />
      <Route exact path="/details" component={ Details } />
    </Switch>
  );
}

export default App;
