import Footer from "../src/app/Footer";
import Navbar from "../src/app/Navbar";
import Sidebar from "../src/app/profile/sidebar";

function Profile() {
  return (
    <div>
      <Navbar />
      <div className="max-w-[96rem] mx-auto my-0">
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
