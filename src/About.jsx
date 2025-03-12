import { Link } from "react-router-dom";
import "./styles.css"; 

function About() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-4xl font-bold mb-4">About Page</h1>
      <p className="text-lg mb-6">This is a simple about page with some text and an image.</p>
      <img src="your-image-url.jpg" alt="About" className="w-1/2 rounded-lg shadow-lg" />
      
      <Link to="/" className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Go Back
      </Link>
    </div>
  );
}

export default About;
