import React from 'react';
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz.js'
import {Route, Switch} from 'react-router-dom'
import QuizList from './containers/QuizList/QuizList'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Auth from './containers/Auth/Auth'
import Rpd from './containers/Rpd/Rpd'
import Pd from './containers/Pd/Pd'


function App() {
  return (
<Layout>
   <Switch>
     <Route path="/auth" component={Auth}/>
     <Route path="/pd" component={Pd}/>
     <Route path="/rpd" component={Rpd}/>
     <Route path="/quiz-creator" component={QuizCreator}/>
     <Route path="/quiz/:id" component={Quiz}/>
     <Route path="/" component={QuizList}/>
   </Switch>
</Layout>
  );
}

export default App;