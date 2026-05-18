import { useState } from "react";
import Layout from "./components/Layout/Layout";
import ModelSelector from "./components/ModelSelector/ModelSelector";
import Prompt from "./components/Prompt/Prompt";
import "./App.css";

const App = () => {
  const [models, setModels] = useState<[]>();
  const [model, setModel] = useState("");
  const [message, setMessage] = useState(
    "Generate a beautiful sunset over mountains",
  );

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
      if (!model) throw new Error("Please select a model");
      if (!message) throw new Error("Empty prompt");
      const res = await fetch("http://localhost:8000/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model, message }),
      });
      const data = await res.json();
      console.log(data);
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  fetchModels();

  return (
    <>
      <Layout>
        <ModelSelector
          models={models}
          selectedModel={model}
          handleModel={setModel}
        />
        <Prompt
          message={message}
          handlePrompt={setMessage}
          submitPrompt={submitPrompt}
        />
      </Layout>
    </>
  );
};

export default App;
