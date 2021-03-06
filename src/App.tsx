import React from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import styles from './App.module.scss'
import Movies from './components/Movies/Movies'
import Share from './components/Share/Share'
import TopBar from './components/TopBar/TopBar';
const App = () => {
    return(
        <Router>
                <div className={styles['main-container']}>
                    <TopBar/>
                    <Switch>

                        <RouteWithTitle exact title="Peliculas" path="/inicio" component={Movies} />
                        <RouteWithTitle exact title="Compartir" path="/compartir" component={Share} />
                        <Redirect to="/inicio" />
                    </Switch>
                </div>
        </Router>
    )
}
const RouteWithTitle = ({ title, render, component: Comp, ...props }: any) => (
    <Route {...props} render={(p) => <DocumentTitle title={title}>{render ? render(p) :
        <Comp {...p} />}</DocumentTitle>} />
);

export default App;
