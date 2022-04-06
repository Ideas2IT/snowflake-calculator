import './App.css';
import AppWrapper from './components/AppWrapper';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/'>
          <div>
            <AppWrapper />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
