import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-heading-main">OpenRouter Generator</h1>
      <button className="key-button">API KEY</button>
      <button className="header-button" disabled>
        Dark Mode
      </button>
    </header>
  );
};

export default Header;
