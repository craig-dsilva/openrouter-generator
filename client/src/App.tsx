import Layout from "./components/Layout/Layout";
import "./App.css";

const App = () => {
  return (
    <>
      <Layout>
        <div className="main-prompt-container">
          <textarea
            className="main-prompt-textbox"
            name="prompt"
            id="prompt"
          ></textarea>
          <button>Send</button>
        </div>
      </Layout>
    </>
  );
};

export default App;
