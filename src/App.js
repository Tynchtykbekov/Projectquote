import { Switch, Route, Redirect } from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
// import QuoteDetail from "./pages/QuoteDetail";
// import NewQuote from "./pages/NewQuote";
import Layout from "./components/layout/Layout";
// import NotFoundPage from "./pages/NotFoundPage";
import React, {Suspense} from "react";
import LoadingSpinner from "./components/UI/LoadingSpinner";
 
// const AllQuotes = React.lazy(() => import('./pages/AllQuotes'))
function App() {
  const NewQuote = React.lazy(() => import('./pages/NewQuote'))

const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'))
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'))
  return (
    <Suspense fallback={
      <div className="centered">
<LoadingSpinner/>
      </div>
    }>
    
    <Layout>
 
      <Switch>
        <Route path='/' exact>
          <Redirect to='/quotes' />
        </Route>
        <Route path='/quotes' exact>
          <AllQuotes />
        </Route>
        <Route path='/quotes/:quoteId'>
          <QuoteDetail />
        </Route>
        <Route path='/new-quote'>
          <NewQuote />
        </Route>
        <Route path='/*'>
          <NotFoundPage/>
        </Route>
      </Switch>
      
    
    </Layout>
    </Suspense>

  );
}

export default App;
