import React from "react";
import { AiOutlineWallet, AiOutlineMenu } from "react-icons/ai";
import { HiLightBulb, HiMoon } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { selectState, setState } from "../../features/state/stateSlice";

const TopBar = ({ switchTheme, theme }) => {
  const state = useSelector(selectState);
  const { address, isConnected, isScrolling } = state;
  const dispatch = useDispatch();
  return (
    <>
      <div className="top_bar">
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

        {isConnected ? (
          <button
            className="top_bar_btn"
            onClick={() => dispatch(setState({ name: "open", value: true }))}
          >
            <span>{address}</span>
          </button>
        ) : (
          <button
            className="top_bar_btn"
            style={{ opacity: isScrolling ? 0.5 : 1 }}
            onClick={() => dispatch(setState({ name: "open", value: true }))}
          >
            <AiOutlineWallet />
            <span>Connect</span>
          </button>
        )}
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
