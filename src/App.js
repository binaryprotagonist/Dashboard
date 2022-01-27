import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
    <Navbar />
    <div className='container-fluid'>
      <div className='row row-offcanvas row-offcanvas-left'>
        <Sidebar/>
        <Dashboard />
        {/* <Dash/> */}
      </div>
    </div>
    </div>
  );
}

export default App;
