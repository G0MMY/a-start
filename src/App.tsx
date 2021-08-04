import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GridComparator from './GridComparator'
import MainGrid from './MainGrid'

export default function App(){
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={MainGrid}/>
                <Route path='/compare' component={GridComparator}/>
            </Switch>
        </Router>
    )
}