import React, { useEffect, useState } from "react";
import Popper from "../popper";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { AiOutlineClose, AiOutlineSetting } from "react-icons/ai";
import BOCLOGO from "../../assets/CMC token logo.png";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectState, setState } from "../../features/state/stateSlice";
import Export from "../../assets/export1.svg";
import I from "../../assets/Vector.svg";

const Bond = ({ theme }) => {
  const [isBond, setIsBond] = useState(true);

  const state = useSelector(selectState);
  const {
    isConnecting,
    isConnected,
    treasurybalance,
    bocprice,
    bocbondprice,
    lpbocbondprice,
    lpbocprice,
    modalShowBond,
  } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isConnecting);
  });
  return (
    <>
      <div className="container">
        <br /> <br /> <br /> <br />
        <div className="card_container" style={{ width: "100%" }}>
          <div className="main_card">
            {/* {isBond ? (
              <h3 className="primary-color">Bond</h3>
            ) : (
              <h3 className="primary-color">Inverse Bond</h3>
            )} */}
            <br />
            <div className="d-flex flex-column flex-md-row">
              <div className="card_box col-12 col-md-4  bond_price_card">
                <p className="card_title">BOC Treasury</p>

                {isConnecting ? (
                  <h5 className="placeholder-glow">
                    <span className="placeholder col-3"></span>
                  </h5>
                ) : (
                  <h3 className="card_value">
                    $ {Math.round(treasurybalance * 100) / 100}
                  </h3>
                )}
              </div>
              <br></br>
              <div className="card_box col-12 col-md-4 bond_price_card">
                <p className="card_title">
                  {" "}
                  BOC Price <img src={I} width="12px" height="12px"></img>
                </p>

                {isConnecting ? (
                  <h5 className="placeholder-glow">
                    <span className="placeholder col-3"></span>
                  </h5>
                ) : (
                  <h3 className="card_value">
                    $ {Math.round(bocprice * 100) / 100}
                  </h3>
                )}
              </div>
            </div>
            <br />
            <div className="d-flex p-4 gap-4 bond_input_box">
              <div
                onClick={() => setIsBond(true)}
                className={isBond ? "bond_tab active " : "bond_tab"}
              >
                Bond
              </div>
              <div
                className={isBond ? "bond_tab" : "bond_tab active "}
                onClick={() => setIsBond(false)}
              >
                Inverse Bond
              </div>
              <div
                style={{
                  backgroundColor: "var(--blue)",
                  borderRadius: "10px",
                  color: "#fff",
                  padding: "0.2rem 1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Coming Soon
              </div>
            </div>
            {isBond ? (
              <div className="bond_table_box px-4">
                <table className="bond_table desktop">
                  <tr>
                    <th
                      style={{
                        fontSize: "1rem",
                        color: "#fff",
                        padding: "0.6rem 0",
                      }}
                    >
                      Token
                    </th>
                    <th
                      style={{
                        fontSize: "1rem",
                        color: "#fff",
                        padding: "0.6rem 0",
                      }}
                    >
                      Payout Asset
                    </th>
                    <th
                      style={{
                        fontSize: "1rem",
                        color: "#fff",
                        padding: "0.6rem 0",
                      }}
                    >
                      Price
                    </th>
                    <th
                      style={{
                        fontSize: "1rem",
                        color: "#fff",
                        padding: "0.6rem 0",
                      }}
                    >
                      Discount
                    </th>
                    <th
                      style={{
                        fontSize: "1rem",
                        color: "#fff",
                        padding: "0.6rem 0",
                      }}
                    ></th>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "0.6rem 0",
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src="https://bankofcronos.com/wp-content/uploads/2022/01/usdc.webp"
                          width="30px"
                          alt=""
                        />

                        <div>
                          <p className="p-0 m-0 lh-1  primary-color">
                            <b>USDC</b>
                          </p>
                          <p className="p-0 m-0 lh-1">
                            <b>
                              Get Asset
                              <a
                                to="https://app.cronaswap.org/swap?outputCurrency=0xc21223249ca28397b4b6541dffaecc539bff0c59"
                                className="primary-color"
                              >
                                {" "}
                                <img src={Export}></img>{" "}
                              </a>
                            </b>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "0.6rem 0",
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img src={BOCLOGO} width="30px" alt="" />
                        <div>
                          <p className="p-0 m-0 lh-1  primary-color">
                            <b>BOC</b>
                          </p>
                          <p className="p-0 m-0 lh-1">
                            <b>
                              Explore
                              <Link to="" className="primary-color">
                                {" "}
                                <img src={Export}></img>{" "}
                              </Link>
                            </b>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "0.6rem 0",
                      }}
                    >
                      <p className="p-0 m-0  primary-color">
                        {isConnecting ? (
                          <h5 className="placeholder-glow">
                            <span className="placeholder col-10"></span>
                          </h5>
                        ) : (
                          <b> $ {Math.round(bocbondprice * 100) / 100}</b>
                        )}
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "0.6rem 0",
                      }}
                    >
                      {isConnecting ? (
                        <h5 className="placeholder-glow">
                          <span className="placeholder col-10"></span>
                        </h5>
                      ) : (
                        <p
                          className="p-0 m-0 text-danger"
                          style={{ width: "5rem", textAlign: "center" }}
                        >
                          {Math.round(
                            (bocprice / bocbondprice - 1) * 100 * 1000
                          ) / 1000}{" "}
                          %
                        </p>
                      )}
                    </td>
                    <td
                      style={{
                        padding: "0.6rem 0",
                      }}
                    >
                      <Link
                        className="bond_table_btn"
                        to="/usdc"
                        onClick={() =>
                          dispatch(
                            setState({ name: "currentPath", value: "/bond" })
                          )
                        }
                      >
                        Bond
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "0.6rem 0",
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src="https://bankofcronos.com/wp-content/uploads/2022/02/LPUSD.png"
                          width="30px"
                          alt=""
                        />

                        <div>
                          <p className="p-0 m-0 lh-1  primary-color">
                            <b>BOC USDC LP</b>
                          </p>
                          <p className="p-0 m-0 lh-1">
                            <b>
                              Get Asset
                              <Link
                                to="https://app.cronaswap.org/add/0xc21223249CA28397B4B6541dfFaEcC539BfF0c59/0xe5786DDFc4D6DcA0973D1c5b02987cBbac66ed87"
                                className="primary-color"
                              >
                                {" "}
                                <img src={Export}></img>{" "}
                              </Link>
                            </b>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "0.6rem 0",
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img src={BOCLOGO} width="30px" alt="" />
                        <div>
                          <p className="p-0 m-0 lh-1  primary-color">
                            <b>BOC</b>
                          </p>
                          <p className="p-0 m-0 lh-1">
                            <b>
                              Explore
                              <Link to="" className="primary-color">
                                {" "}
                                <img src={Export}></img>{" "}
                              </Link>
                            </b>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "0.6rem 0",
                      }}
                    >
                      <p className="p-0 m-0  primary-color">
                        {isConnecting ? (
                          <h5 className="placeholder-glow">
                            <span className="placeholder col-10"></span>
                          </h5>
                        ) : (
                          <b> {Math.round(lpbocbondprice * 100) / 100} LP</b>
                        )}
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "0.6rem 0",
                      }}
                    >
                      {isConnecting ? (
                        <h5 className="placeholder-glow">
                          <span className="placeholder col-10"></span>
                        </h5>
                      ) : (
                        <div
                          className="p-0 m-0 text-danger"
                          style={{ width: "5rem", textAlign: "center" }}
                        >
                          {Math.round(
                            (lpbocprice / lpbocbondprice - 1) * 100 * 1000
                          ) / 1000}{" "}
                          %
                        </div>
                      )}
                    </td>
                    <td
                      style={{
                        padding: "0.6rem 0",
                      }}
                    >
                      <Link
                        className="bond_table_btn"
                        to="/bocusdclp"
                        onClick={() =>
                          dispatch(
                            setState({ name: "currentPath", value: "/bond" })
                          )
                        }
                      >
                        Bond
                      </Link>
                    </td>
                  </tr>
                </table>
                <div className="mobile">
                  <div className="py-3">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src="https://s2.coinmarketcap.com/static/img/coins/64x64/9067.png"
                        width="30px"
                        alt=""
                      />

                      <div>
                        <p className="p-0 m-0 lh-1  primary-color">
                          <b>BOC</b>
                        </p>
                        <p className="p-0 m-0 lh-1  primary-color">
                          <b>
                            Get Asset
                            <Link to="" className="primary-color">
                              {" "}
                              <img src={Export}></img>{" "}
                            </Link>
                          </b>
                        </p>
                      </div>
                    </div>
                    <div className="py-2">
                      <div className="d-flex align-items-center justify-content-between">
                        <p className=" m-0 mobile_table_th">Token</p>
                        <p className="p-0 m-0  primary-color">
                          <b> $1.8</b>
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="mobile_table_th m-0">Discount</p>
                        <p className="p-0 m-0 text-danger">-3.5%</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="mobile_table_th m-0">Payout</p>
                        <p className="text-white m-0">USDC</p>
                      </div>
                    </div>
                    <button
                      className="bond_table_btn"
                      onClick={() =>
                        dispatch(
                          setState({ name: "modalShowBond", value: true })
                        )
                      }
                    >
                      Bond
                    </button>
                  </div>

                  <div className="py-3">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src="https://s2.coinmarketcap.com/static/img/coins/64x64/9067.png"
                        width="30px"
                        alt=""
                      />

                      <div>
                        <p className="p-0 m-0 lh-1  primary-color">
                          <b>BOC</b>
                        </p>
                        <p className="p-0 m-0 lh-1  primary-color">
                          <b>
                            Get Asset
                            <Link to="" className="primary-color">
                              {" "}
                              <img src={Export}></img>{" "}
                            </Link>
                          </b>
                        </p>
                      </div>
                    </div>
                    <div className="py-2">
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="mobile_table_th m-0">Token</p>
                        <p className="p-0 m-0  primary-color">
                          <b> $1.8</b>
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="mobile_table_th m-0">Discount</p>
                        <p className="p-0 m-0 text-danger">-3.5%</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="mobile_table_th m-0">Payout</p>
                        <p className="text-white m-0">USDC</p>
                      </div>
                    </div>
                    <Link
                      className="bond_table_btn"
                      to=""
                      onClick={() => {
                        dispatch(
                          setState({ name: "currentPath", value: "/bond" })
                        );
                      }}
                    >
                      Bond
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "0 0 6px 6px",
                  padding: "1rem 0",
                }}
              >
                <p className="text-center primary-color">
                  No active inverse bond
                </p>
                <br />
                <br />
              </div>
            )}
            <p className="m-4 text-center">
              Important: Inverse bonds allow you to bond your BOC for teasury
              assets.<br></br> Vesting time is 0 and payouts are instant.
            </p>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* <Modal
          show={modalShowBond}
          onHide={() =>
            dispatch(setState({ name: "modalShowBond", value: false }))
          }
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body className={theme === "dark" ? " dark " : " light "}>
            <div className=" d-flex justify-content-between">
              <button
                className="modal_header_btn"
                onClick={() =>
                  dispatch(setState({ name: "modalShowBond", value: false }))
                }
              >
                <AiOutlineClose />
              </button>
              <div className="d-flex align-items-center gap-2">
                <img
                  src="https://bankofcronos.com/wp-content/uploads/2022/01/usdc.webp"
                  width="40px"
                  className=""
                  alt=""
                />
                <h4>USDC</h4>
              </div>
              <button className="modal_header_btn">
                <AiOutlineSetting />
              </button>
            </div>

            <div className="d-flex flex-column flex-md-row">
              <div className="card_box col-12 col-md-6 text-center">
                <p className="m-0 card_title">Bond Price</p>
                <p
                  className={
                    theme === "dark"
                      ? "m-0 card_value light-color"
                      : " m-0 card_value dark-color"
                  }
                >
                  $1.09
                </p>
              </div>
              <div className="card_box col-12 col-md-6 text-center">
                <p className="m-0 card_title">BOC Price </p>
                <p
                  className={
                    theme === "dark"
                      ? "m-0 card_value light-color"
                      : " m-0 card_value dark-color"
                  }
                >
                  $1.09
                </p>
              </div>
            </div>
            <br />

            {isConnected ? (
              <div>
                <div>
                  <p className="m-0 text-center">
                    <i>
                      First time unstaking
                      <b className="px-1">BOC</b>?
                    </i>
                  </p>
                  <p className="m-0 text-center">
                    <i>
                      Please approve Bank Of Cronos to use your
                      <b className="px-1">BOC</b>
                      for unstaking.
                    </i>
                  </p>
                </div>
                <br />
                <div style={{ maxWidth: "400px", margin: "0 auto" }}>
                  <button className="form_btn">Approve</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="d-flex justify-content-center py-3">
                  <button
                    className="approve_btn"
                    onClick={() =>
                      dispatch(setState({ name: "modalShow", value: true }))
                    }
                  >
                    Connect Wallet
                  </button>
                </div>
                <p className="m-0 text-center card_title">
                  please collect you wallets to purchase bonds
                </p>
              </div>
            )}
            <br />

            <div>
              <div className="d-flex justify-content-between align-items-center">
                <h6>Your balance</h6>
                <h6>0 BOC</h6>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <h6>
                  You will get <Popper />
                </h6>
                <h6>0 USDC</h6>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <h6>
                  Max you can buy <Popper />
                </h6>
                <h6>69,053,1565 USDC(~2,688739.09)</h6>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <h6>
                  Discount <Popper />
                </h6>
                <h6 className="text-danger">-2.87%</h6>
              </div>
            </div>
          </Modal.Body>
        </Modal> */}
      </div>
    </>
  );
};

export default Bond;
