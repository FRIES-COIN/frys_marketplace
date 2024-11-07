import Footer from "../src/app/Footer";
import Navbar from "../src/app/Navbar";
import Sidebar from "../src/app/profile/sidebar";

function Profile() {
  return (
    <div className="w-full">
      <Navbar />
      <div className="md:mt-12 mx-auto my-0">
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
