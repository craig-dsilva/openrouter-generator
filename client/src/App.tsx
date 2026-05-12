import { useState, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import "./App.css";

const App = () => {
  const [models, setModels] = useState<any>();

  const fetchModels = async () => {
    try {
      const res = await fetch(
        "https://openrouter.ai/api/v1/models?output_modalities=image",
      );
      const data = await res.json();
      setModels(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <>
      <Layout>
        <select name="model-selector" id="model-selector">
          <option value="default">Select a model...</option>
          {models &&
            models.map((model: any) => {
              return <option id={model.id}>{model.name}</option>;
            })}
        </select>
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
