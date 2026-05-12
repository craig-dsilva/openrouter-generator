import Layout from "./components/Layout/Layout";
import "./App.css";

function App() {
  return (
    <>
      <Layout>
        <textarea name="prompt" id="prompt"></textarea>
        <button>Send</button>
      </Layout>
    </>
  );
}

export default App;
