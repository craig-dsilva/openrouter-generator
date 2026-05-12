import { useState, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import ModelSelector from "./components/ModelSelector/ModelSelector";
import Prompt from "./components/Prompt/Prompt";
import "./App.css";

const App = () => {
  const [models, setModels] = useState<any>();
  const [selectedModel, setSelectedModel] = useState("");
  const [prompt, setPrompt] = useState("");

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

  const submitPrompt = async () => {
    try {
      const res = await fetch("http://localhost:8000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedModel, prompt }),
      });
      const data = await res.json();
      console.log(data);
      setPrompt("");
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
        <ModelSelector
          models={models}
          selectedModel={selectedModel}
          updateModel={setSelectedModel}
        />
        <Prompt />
      </Layout>
    </>
  );
};

export default App;
