import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/visiteur/Layout';
import Articles from './components/visiteur/Articles';
import ArticleDetail from './components/visiteur/ArticleDetail';

import Articleprop from './components/pro/Articleprop';
import EditArticle from './components/pro/EditArticle';
import CategoryPage from './components/pro/Categoriepage';
import HomePage from './components/pro/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Layout />}></Route>
        <Route path="/articles" exact element={<Articles />}></Route>
        <Route path="/articledetail" exact element={<ArticleDetail />}></Route>
        <Route path="/articleadmin" exact element={<Articleprop />}></Route>
        <Route path="/articledit" exact element={<EditArticle />}></Route>
        <Route path="/categorie" exact element={<CategoryPage />}></Route>
        <Route path="/home" exact element={<HomePage />}></Route>
        

      </Routes>
    </Router>
  );
}

export default App;
