import './App.css';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Home } from '../Home/Home';
import Setup from '../Setup/Setup';
import Game from '../Game/Game';
import { NotFound } from '../NotFound/NotFound';
import { Segment, Icon, Button } from 'semantic-ui-react';
import { useEffect, useState } from 'react';


function App() {

  let [isHome, setIsHome] = useState(true);
  let [title, setTile] = useState('Connect 4');
  let history = useHistory();

  let location = useLocation().pathname;
  useEffect(() => {
    switch (location) {
      case '/':
        setIsHome(true);
        setTile('Connect 4');
        break;
      case '/setup':
        setIsHome(false);
        setTile('Two Players Game');
        break;
      case '/game':
        setIsHome(false);
        setTile('Tournament');
        break;

      default:
        setIsHome(false);
        setTile('Hey there Pirate! Wrong island?');
        break;
    }

  }, [location]);

  return (
    <div className="App">
      <Segment piled className='top-bar' >
        {isHome ?
          <Icon /> :
          <Button basic icon='arrow left' onClick={() => history.goBack()} />
        }
        <p>{title}</p>
      </Segment>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/Setup' exact={true} component={Setup} />
        <Route path='/Game' exact={true} component={Game} />
        <Route path='/*' exact={true} component={NotFound} />
      </Switch>
    </div>

  );
}

export default App;
