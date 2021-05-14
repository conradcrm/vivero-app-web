import "./App.css";
import "./index.css";
import Layout from "./layout";
import ModuleRoutes from "./routes";
import FormRoutes from "./routes/forms";
import { useLocation } from "react-router-dom";
import LayoutAction from "./layout/action";

function App() {
  let location = useLocation();
  let route = location.pathname;
  return (
    <>
      {!route.includes('create') && !route.includes('edit')  ? (
        <Layout>
          <ModuleRoutes />
        </Layout>
      ) : (
        <LayoutAction>
          <FormRoutes />
        </LayoutAction>
      )}
    </>
  );
}

export default App;
