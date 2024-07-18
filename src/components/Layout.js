import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

export default function Layout({ onSearchTerm }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = e => {
      const { value } = e.target;
      setSearchTerm(value);
      onSearchTerm(value);
    };

    const onClear = e => {
        onSearchTerm('');
        setSearchTerm('');
    }

  return (
    <header>
    <nav className="cf">
      <h1>
        <Link to="/" href='#' className='fl-lato link'>Airport Codes PH</Link>
        <Link to="/about" className='nav-about fl-lato link' href=''>About</Link>
      </h1>
      <input type='text' name='search' placeholder="Find your airport" value={searchTerm} onChange={handleInputChange} />
      <button className='clear' type='reset' onClick={onClear}></button>
    </nav>
    <Outlet />
  </header>
  );
}

