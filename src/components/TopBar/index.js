import React from "react";
import { AiOutlineWallet, AiOutlineMenu } from "react-icons/ai";
import { HiLightBulb, HiMoon } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { selectState, setState } from "../../features/state/stateSlice";
import emptyWallet from "../../assets/empty-wallet.svg";
import emptyWallet1 from "../../assets/empty-wallet1.svg";
import connectedWallet from "../../assets/Group 126.svg";
import user from "../../assets/profile-circle.svg";

const TopBar = ({ switchTheme, theme }) => {
  const state = useSelector(selectState);
  const {
    address,
    isConnected,
    isScrolling,
    crobalance,
    wcrobalance,
    cusdbalance,
    bocbalance,
  } = state;
  const dispatch = useDispatch();
  return (
    <>
      <div className="top_bar" style={{ opacity: isScrolling ? 0.5 : 1 }}>
        <div style={{ flex: 1 }}>
          <button
            onClick={() =>
              dispatch(setState({ name: "openSideBar", value: true }))
            }
            className="sidebar_toggle_btn"
            style={{ opacity: isScrolling ? 0.5 : 1 }}
          >
            <AiOutlineMenu />
          </button>
        </div>
        <div className="top_nav_info">
          {isConnected ? (
            <>
              <div className="user_info" style={{ padding: "0" }}>
                <img src={emptyWallet1} style={{ marginRight: "10px" }}></img>
                <div style={{ width: "65px", fontWeight: "bold" }}>
                  <div style={{ fontSize: "1.2rem" }}>CRO</div>
                  <div>{(Math.round(crobalance * 1000) / 1000).toFixed(2)}</div>
                </div>
                <div style={{ width: "65px", fontWeight: "bold" }}>
                  <div style={{ fontSize: "1.2rem" }}>WCRO</div>
                  <div>
                    {(Math.round(wcrobalance * 1000) / 1000).toFixed(2)}
                  </div>
                </div>
                <div style={{ width: "65px", fontWeight: "bold" }}>
                  <div style={{ fontSize: "1.2rem" }}>CUSD</div>
                  <div>
                    {(Math.round(cusdbalance * 1000) / 1000).toFixed(2)}
                  </div>
                </div>
                <div style={{ width: "65px", fontWeight: "bold" }}>
                  <div style={{ fontSize: "1.2rem" }}>BOC</div>
                  <div>{(Math.round(bocbalance * 1000) / 1000).toFixed(2)}</div>
                </div>
              </div>
              <div className="user_info">
                <img src={user} style={{ marginRight: "10px" }}></img>
                <div style={{ width: "120px", fontWeight: "bold" }}>
                  <div style={{ fontSize: "1.2rem" }}>Connected as</div>
                  <div>{address}</div>
                </div>
              </div>
              <button
                className="top_bar_btn"
                style={{
                  backgroundColor: "rgba(63, 255, 0, 0.2)",
                  color: "#3FFF00",
                }}
                onClick={() =>
                  dispatch(setState({ name: "open", value: true }))
                }
              >
                <img src={connectedWallet}></img>
                <span>Connected</span>
              </button>
            </>
          ) : (
            <button
              className="top_bar_btn"
              onClick={() => dispatch(setState({ name: "open", value: true }))}
            >
              {/* <AiOutlineWallet /> */}
              <img src={emptyWallet}></img>
              <span>Connect</span>
            </button>
          )}
        </div>
        {/* <button
          className="top_bar_btn"
          style={{ opacity: isScrolling ? 0.5 : 1 }}
          onClick={switchTheme}
        >
          {theme !== "dark" ? <HiLightBulb /> : <HiMoon />}
        </button> */}
      </div>
    </>
  );
};

export default TopBar;
