import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flexGrow: 1 }}>
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;