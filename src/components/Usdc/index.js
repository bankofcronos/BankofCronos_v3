import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectState, setState } from "../../features/state/stateSlice";
import { Popper } from "..";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import leftArrow from "../../assets/ArrowCircleLeft.svg";
import arrow2 from "../../assets/arrow-2.svg";
import boc from "../../assets/boctoken.png";
import arrowDown from "../../assets/arrow-down.svg";
import usdc from "../../assets/USDC 1.svg";

const BocUsdcLp = ({
  redeem_lpbond_BOC,
  buy_lpbond_BOC,
  approve_lpbond_BOC,
}) => {
  const state = useSelector(selectState);
  const {
    isConnected,
    lpbocbondprice,
    lpbocprice,
    lpbondamount,
    lpbocmaxbond,
    lpbalance,
  } = state;
  const dispatch = useDispatch();

  return (
    <>
      <div className="container">
        <br /> <br /> <br /> <br />
        <div className="card_container" style={{ width: "100%" }}>
          <div className="main_card">
            <div className="bond_container">
              <div className="d-flex justify-content-between">
                {/* <button
                  className="modal_header_btn"
                  onClick={() =>
                    dispatch(setState({ name: "bondModal2", value: false }))
                  }
                >
                  <AiOutlineClose />
                </button> */}
                <div className="d-flex align-items-center gap-2">
                  {/* <img
                    src="https://bankofcronos.com/wp-content/uploads/2022/02/LPUSD.png"
                    width="40px"
                    className=""
                    alt=""
                  /> */}
                  <Link to="/bond">
                    <img src={leftArrow}></img>
                  </Link>
                  <h4 style={{ color: "#fff" }}>USDC</h4>
                </div>
                {/* <button className="modal_header_btn">
                  <AiOutlineSetting />
                </button> */}
              </div>

              <br></br>

              <div className="d-flex flex-column flex-md-row gap-1">
                <div className="card_box col-12 col-md-4">
                  <p className="m-0 card_title">Bond Price</p>
                  <p
                    style={{
                      fontSize: "1.5rem",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    $1.09
                  </p>
                </div>
                <div className="card_box col-12 col-md-4">
                  <p className="m-0 card_title">Market Price </p>
                  <p
                    style={{
                      fontSize: "1.5rem",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    $1.09
                  </p>
                </div>
                <div className="card_box col-12 col-md-4">
                  <p className="m-0 card_title">Premium </p>
                  <p>
                    <h6
                      className="text-danger"
                      style={{
                        fontSize: "1.5rem",
                        color: "#fff",
                        fontWeight: "bold",
                        backgroundColor: "transparent",
                      }}
                    >
                      -2.87%
                    </h6>
                  </p>
                </div>
              </div>
              <br />
              {isConnected ? (
                <div>
                  {/* <div>
                    <p className="m-0 text-center">
                      <i>
                        First time purchasing
                        <b className="px-1">BOC/USDC LP</b> bonds?
                      </i>
                    </p>
                    <p className="m-0 text-center">
                      <i>
                        Please approve Bank Of Cronos to use your
                        <b className="px-1">BOC/USDC LP</b>
                        for bonds.
                      </i>
                    </p>
                  </div> */}
                  <Row>
                    {/* <Col lg="6">
                      <div className="loan_card_input_box">
                        <div className="stake_card_input">
                          <div className="stake_token">
                            <img src={boc} width="32px" height="32px"></img>
                            <span
                              style={{
                                fontSize: "1.2rem",
                                color: "#fff",
                                flex: "1",
                                marginLeft: "0.2rem",
                              }}
                            >
                              BOC
                            </span>
                            <img
                              src={arrowDown}
                              style={{
                                position: "absolute",
                                right: "1rem",
                                top: "40%",
                              }}
                            ></img>
                          </div>
                          <div className="exc">
                            <img src={arrow2} />
                          </div>
                        </div>
                        <div className="d-flex gap-1 stake-input">
                          <input
                            // value={stakeamount}
                            // onChange={(val) =>
                            //   dispatch(
                            //     setState({
                            //       name: "stakeamount",
                            //       value: val.target.value,
                            //     })
                            //   )
                            // }
                            type="number"
                            placeholder="0.0000"
                            style={{
                              width: "100%",
                              paddingLeft: 10,
                              paddingLeft: 10,
                              backgroundColor: "transparent",
                              border: "none",
                              fontSize: "1.5rem",
                              fontWeight: "600",
                              color: "#fff",
                            }}
                          />
                          <span>BOC</span>
                        </div>
                      </div>
                    </Col> */}
                    {/* <Col lg="6">
                      <div className="loan_card_input_box">
                        <div className="stake_card_input">
                          <div className="stake_token">
                            <img src={usdc} width="32px" height="32px"></img>
                            <span
                              style={{
                                fontSize: "1.2rem",
                                color: "#fff",
                                flex: "1",
                                marginLeft: "0.2rem",
                              }}
                            >
                              USDC
                            </span>
                            <img
                              src={arrowDown}
                              style={{
                                position: "absolute",
                                right: "1rem",
                                top: "40%",
                              }}
                            ></img>
                          </div>
                          <div className="exc">
                            <img src={arrow2} />
                          </div>
                        </div>
                        <div className="d-flex gap-1 stake-input">
                          <input
                            value={stakeamount}
                            onChange={(val) =>
                              dispatch(
                                setState({
                                  name: "stakeamount",
                                  value: val.target.value,
                                })
                              )
                            }
                            type="number"
                            placeholder="0.0000"
                            style={{
                              width: "100%",
                              paddingLeft: 10,
                              paddingLeft: 10,
                              backgroundColor: "transparent",
                              border: "none",
                              fontSize: "1.5rem",
                              fontWeight: "600",
                              color: "#fff",
                            }}
                          />
                          <span>BOC</span>
                        </div>
                      </div>
                    </Col> */}
                  </Row>
                  <div style={{ maxWidth: "500px", margin: "0 auto" }}>
                    {/* <div className="d-flex gap-1 stake-input">
                      <input
                        type="number"
                        placeholder="0"
                        style={{ width: "100%" }}
                      />

                      <button className="max-btn">BOC</button>
                    </div> */}
                    <br />
                    <div className="d-flex justify-content-around gap-2">
                      <div>
                        <button className="form_btn">Approve</button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="d-flex justify-content-center py-3">
                    <button
                      className="approve_btn"
                      onClick={() => {
                        dispatch(setState({ name: "modalShow", value: true }));
                        dispatch(
                          setState({ name: "bondModal2", value: false })
                        );
                      }}
                    >
                      Connect Wallet
                    </button>
                  </div>
                  <p className="m-0 text-center card_title">
                    please connect you wallets to purchase bonds
                  </p>
                </div>
              )}
              <br />
              <br />

              <div>
                <div className="d-flex justify-content-between align-items-center lpinfo">
                  <h6>Your balance</h6>
                  <h6>
                    {isConnected ? Math.round(lpbalance * 1000) / 1000 : "-"} LP
                  </h6>
                </div>
                <div className="d-flex justify-content-between align-items-center lpinfo">
                  <h6>
                    You will get <Popper />
                  </h6>
                  <h6>
                    {isConnected
                      ? Math.round((lpbondamount / lpbocbondprice) * 1000) /
                        1000
                      : "-"}{" "}
                    BOC
                  </h6>
                </div>
                <div className="d-flex justify-content-between align-items-center lpinfo">
                  <h6>
                    Max you can buy <Popper />
                  </h6>
                  <h6>{Math.round(lpbocmaxbond * 1000) / 1000} BOC</h6>
                </div>
                <div className="d-flex justify-content-between align-items-center lpinfo">
                  <h6>
                    Discount <Popper />
                  </h6>
                  <h6
                    className="text-danger"
                    style={{ backgroundColor: "transparent" }}
                  >
                    {Math.round(
                      (lpbocprice / lpbocbondprice - 1) * 100 * 1000
                    ) / 1000}{" "}
                    %
                  </h6>
                </div>
                {/* <div style={{ maxWidth: "600px", margin: "auto" }}>
                  <p className="m-0 text-center">
                    Inverse bonds allows you to bond your BOC for treasury
                    assets. Vesting time is 0 and payouts are instant.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BocUsdcLp;
