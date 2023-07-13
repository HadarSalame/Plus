import logo from "./Plus logo.png";
import "./App.css";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LoginIcon from "@mui/icons-material/Login";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Sidebar } from "flowbite-react";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();
  function ExpensesPage() {
    navigate("/Expenses");
  }
  function InsertionsPage() {
    navigate("/Insertions");
  }
  function TargetsPage() {
    navigate("/Targets");
  }

  return (
    <>
      <div className="page">
        <div >
          <div style={{display:"flex"}}>
            <img src={logo} className="App-logo" alt="logo" />
            <div className="SignandLog">
              <PersonAddAlt1Icon className="Icon" sx={{ fontSize: 35 }} />
              <LoginIcon className="Icon" sx={{ fontSize: 30 }} />
            </div>
          </div>
          <div className="Nav">
            <Sidebar>
              <Sidebar.Items>
                <Sidebar.ItemGroup className="ItemGroup" onClick={ExpensesPage}>
                  <TrendingDownIcon className="Icon" />
                  <p className="p">Expenses</p>
                </Sidebar.ItemGroup>

                <Sidebar.ItemGroup
                  className="ItemGroup"
                  onClick={InsertionsPage}
                >
                  <TrendingUpIcon className="Icon" />
                  <p className="p">Insertions</p>
                </Sidebar.ItemGroup>

                <Sidebar.ItemGroup className="ItemGroup" onClick={TargetsPage}>
                  <TrackChangesIcon className="Icon" />
                  <p className="p">Targets</p>
                </Sidebar.ItemGroup>

                {/* if the user is connect: */}

                <Sidebar.ItemGroup className="ItemGroup" onClick={TargetsPage}>
                  <LogoutIcon className="Icon" />
                  <p className="p">Disconnected</p>
                </Sidebar.ItemGroup>

                <Sidebar.ItemGroup className="ItemGroup" onClick={TargetsPage}>
                  <SettingsIcon className="Icon" />
                  <p className="p">Settings</p>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
