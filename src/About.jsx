import { Link } from "react-router-dom";
import "./styles.css"; 

function About() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-4xl font-bold mb-4">Vic Segen</h1>
      <p className="text-lg mb-6">PARIS</p>
      <p className="text-lg mb-6">Deliverables: Websites, Art direction & Branding, Typography, Photography, Videos</p>
      <img src="your-image-url.jpg" alt="About" className="w-1/2 rounded-lg shadow-lg" />
      
      <Link to="/" className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Go Back
      </Link>
    </div>
  );
}

export default About;
