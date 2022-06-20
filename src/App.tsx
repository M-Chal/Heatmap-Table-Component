import './App.css';
import Heatmap from './Components/Heatmap';
import transactions from "./transactions.json";

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Heatmap data={transactions as any} year={2019} ></Heatmap>
      </header>
    </div>
  );
}

export default App;
