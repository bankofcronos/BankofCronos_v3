import React from "react";
import { Link } from "react-router-dom";
import LogoLight from "../../assets/Lion-Face-WHITE.png";
import { GoSettings } from "react-icons/go";
import { AiOutlineClose, AiOutlineSetting } from "react-icons/ai";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiStackLine } from "react-icons/ri";
import { BsCashStack } from "react-icons/bs";
import { FaBook, FaDiscord } from "react-icons/fa";
import { AiFillMediumSquare, AiOutlineTwitter } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { selectState, setState } from "../../features/state/stateSlice";
import arrowSquareDown from "../../assets/arrow-square-down.svg";
import moneyRec from "../../assets/money-recive.svg";
import line from "../../assets/Vector 1.svg";

const SideBar = ({ theme }) => {
  const state = useSelector(selectState);
  const {
    openSideBar,
    windowWidth,
    isConnected,
    address,
    currentPath,
    toggleSideBar,
    showBond,
    isConnecting,
    bocbondprice,
    bocprice,
    lpbocbondprice,
    lpbocprice,
  } = state;
  const dispatch = useDispatch();
  return (
    <>
      {openSideBar ? (
        <div className="sidebar">
          <div className="d-flex justify-content-end">
            {windowWidth > 900 ? (
              <br />
            ) : (
              <button
                onClick={() =>
                  dispatch(setState({ name: "openSideBar", value: false }))
                }
                className="sidebar_toggle_close"
              >
                <AiOutlineClose />
              </button>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <img src={LogoLight} width="200px" className="" alt="" />
          </div>
          {/* {isConnected ? (
            <p className="text-center primary-color">{address}</p>
          ) : null} */}
          <ul className="sidebar_list p-0">
            <li
              onClick={() => {
                dispatch(setState({ name: "currentPath", value: "/" }));
                windowWidth < 900
                  ? toggleSideBar()
                  : dispatch(setState({ name: "currentPath", value: "/" }));
              }}
              className={`sidebar_list_item ${
                currentPath === "/" ? "active" : ""
              }`}
            >
              <Link to="/" className="link">
                <img src={moneyRec}></img> <span>Loans</span>
              </Link>
            </li>
            <li
              className=""
              onClick={() => {
                dispatch(setState({ name: "currentPath", value: "/bond" }));
                windowWidth < 900
                  ? toggleSideBar()
                  : dispatch(setState({ name: "currentPath", value: "/bond" }));
              }}
            >
              <div
                className={`sidebar_list_item d-flex align-items-center justify-content-between ${
                  currentPath === "/bond" ? "active" : ""
                }`}
              >
                <Link to="/bond" className="link ">
                  <AiOutlineSetting /> <span>Bond</span>{" "}
                </Link>
                <img src={arrowSquareDown}></img>
              </div>
              {showBond ? (
                <div className="p-2 px-4">
                  <div
                    className="d-flex align-item-center"
                    style={{ position: "relative" }}
                  >
                    <img
                      src={line}
                      style={{ top: "-50%", position: "absolute" }}
                    ></img>
                    <Link
                      className="bond-sub d-flex align-items-center justify-content-between"
                      to="/usdc"
                      onClick={() => {
                        // dispatch(
                        //   setState({ name: "modalShowBond", value: true })
                        // );
                        dispatch(
                          setState({ name: "currentPath", value: "/bond" })
                        );
                      }}
                    >
                      <p className="m-0 primary-color">USDC</p>
                      {isConnecting ? (
                        <h5 className="placeholder-glow">
                          <span className="placeholder col-3"></span>
                        </h5>
                      ) : (
                        <p
                          className={
                            Math.round(
                              (bocprice / bocbondprice - 1) * 100 * 100
                            ) /
                              100 >=
                            0
                              ? "m-0 text-success"
                              : "m-0 text-danger"
                          }
                        >
                          {parseInt(
                            Math.abs(
                              Math.round(
                                (bocprice / bocbondprice - 1) * 100 * 100
                              )
                            ) / 100
                          )}{" "}
                          %
                        </p>
                      )}
                    </Link>
                  </div>
                  <div
                    className="d-flex align-item-center"
                    style={{ position: "relative" }}
                  >
                    <img
                      src={line}
                      style={{ top: "-50%", position: "absolute" }}
                    ></img>
                    <Link
                      className="bond-sub d-flex align-items-center justify-content-between"
                      to="bocusdclp"
                      onClick={() => {
                        // dispatch(setState({ name: "bondModal2", value: true }))
                        dispatch(
                          setState({ name: "currentPath", value: "/bond" })
                        );
                      }}
                    >
                      <p className="m-0 primary-color">BOC/USDC LP</p>
                      {isConnecting ? (
                        <h5 className="placeholder-glow">
                          <span className="placeholder col-3"></span>
                        </h5>
                      ) : (
                        <p
                          className={
                            Math.round(
                              (bocprice / bocbondprice - 1) * 100 * 100
                            ) /
                              100 >=
                            0
                              ? "m-0 text-success"
                              : "m-0 text-danger"
                          }
                        >
                          {parseInt(
                            Math.abs(
                              Math.round(
                                (lpbocprice / lpbocbondprice - 1) * 100 * 100
                              )
                            ) / 100
                          )}{" "}
                          %
                        </p>
                      )}
                    </Link>
                  </div>
                  <div
                    className="d-flex align-item-center"
                    style={{ position: "relative" }}
                  >
                    <img
                      src={line}
                      style={{ top: "-50%", position: "absolute" }}
                    ></img>
                    <div
                      className="bond-sub d-flex align-items-center justify-content-between"
                      // onClick={() => setBondModal(true)}
                    >
                      <p className="m-0 primary-color">CUSD</p>
                      <p className="m-0 text-info">Coming Soon</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </li>
            <li
              className={`sidebar_list_item ${
                currentPath === "/stake" ? "active" : ""
              }`}
              onClick={() => {
                dispatch(setState({ name: "currentPath", value: "/stake" }));
                windowWidth < 900
                  ? toggleSideBar()
                  : dispatch(
                      setState({ name: "currentPath", value: "/stake" + "" })
                    );
              }}
            >
              <Link to="/stake" className="link">
                <RiStackLine />
                <span>Stake</span>
              </Link>
            </li>
          </ul>
          <div className="position-fixed bottom-0 left-0 drawer__footer">
            <ul className="sidebar_list p-0 py-3">
              <li className="sidebar_list_item">
                <a
                  href="https://bank-of-cronos.gitbook.io/docs/"
                  className="link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaBook /> <span>Docs</span>
                </a>
              </li>
            </ul>
            <ul className="list-unstyled d-flex flex-row justify-content-around">
              <li className=" ">
                <a
                  href="https://bankofcronos.medium.com/"
                  target="_blank"
                  className="text-decoration-none text-black"
                  rel="noreferrer"
                >
                  <AiFillMediumSquare className="primary-color" />
                </a>
              </li>
              <li className=" ">
                <a
                  href="https://twitter.com/bankofcronos"
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none text-black"
                >
                  <AiOutlineTwitter className="primary-color" />
                </a>
              </li>
              <li className=" ">
                <a
                  href="https://discord.com/invite/YCauU2X2AE"
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none text-black"
                >
                  <FaDiscord className="primary-color" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SideBar;
