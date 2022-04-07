import './App.css';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/'>
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
