// import FlexCard from "../FlexCard/FlexCard";
import Navbar from "../Navbar/Navbar";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <main>
      <Navbar />
      {/* <FlexCard /> */}
      <section>{children}</section>
    </main>
  );
};

export default Layout;
