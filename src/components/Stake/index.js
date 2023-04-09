import React from "react";
import { Row, Col } from "react-bootstrap";
import Popper from "../popper";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { selectState, setState } from "../../features/state/stateSlice";

const Stake = () => {
  const state = useSelector(selectState);
  const {
    isConnecting,
    rebasetime,
    rebase_BOC,
    reward,
    circsupply,
    treasurybalance,
    index,
    isConnected,
    isStake,
    approve_stake_BOC,
    approve_unstake_BOC,
    loader,
    stakeamount,
    bocbalance,
    sbocbalance,
    stake_BOC,
    unstake_BOC,
    showTotal,
  } = state;
  const dispatch = useDispatch();
  return (
    <>
      <div className="container">
        <br /> <br /> <br /> <br />
        <div className="card_container">
          <div className="main_card">
            <h4 className="p-0 m-0 primary-color">BOC Staking</h4>
            {isConnecting ? (
              <p className="placeholder-glow">
                <span className="placeholder col-3"></span>
              </p>
            ) : (
              <p className="p-0 m-0 primary-color">
                {" "}
                {Math.round(rebasetime * 1000) / 1000} hrs &nbsp;to next rebase{" "}
              </p>
            )}

            <p className="p-0 m-0 primary-color">
              {rebasetime < 0
                ? "If rebase time is negative you can run the rebase manually"
                : " "}
              <br />{" "}
              <button className="form_btn-2" onClick={rebase_BOC}>
                {" "}
                Rebase{" "}
              </button>
            </p>
            <br />
            <br />
            <div className="d-flex flex-column flex-md-row">
              <div className="card_box col-12 col-md-4">
                <p className="card_title">APY</p>
                {isConnecting ? (
                  <h5 className="placeholder-glow">
                    <span className="placeholder col-3"></span>
                  </h5>
                ) : (
                  <h3 className="card_value">
                    {Math.round(
                      Math.pow(1 + reward / circsupply, 1095) * 1000000
                    ) / 10000}
                    %
                  </h3>
                )}
              </div>
              <div className="card_box col-12 col-md-4">
                <p className="card_title">Total Value Deposited </p>
                {isConnecting ? (
                  <h5 className="placeholder-glow">
                    <span className="placeholder col-3"></span>
                  </h5>
                ) : (
                  <h3 className="card_value">
                    <h3 className="card_value">$ {treasurybalance}</h3>
                  </h3>
                )}
              </div>
              <div className="card_box col-12 col-md-4">
                <p className="card_title">
                  Current Index <Popper />
                </p>
                {isConnecting ? (
                  <h5 className="placeholder-glow">
                    <span className="placeholder col-3"></span>
                  </h5>
                ) : (
                  <h3 className="card_value">
                    {Math.round(index * 1000) / 1000} sBOC
                  </h3>
                )}
              </div>
            </div>
            <br />
            {isConnected ? (
              <div>
                <div className="d-flex justify-content-center py-4 gap-4">
                  <div
                    onClick={() =>
                      dispatch(setState({ name: "isStake", value: true }))
                    }
                    className={isStake ? "bond_tab active" : "bond_tab"}
                  >
                    Stake
                  </div>
                  <div
                    className={isStake ? "bond_tab" : "bond_tab active"}
                    onClick={() =>
                      dispatch(setState({ name: "isStake", value: false }))
                    }
                  >
                    Unstake
                  </div>
                </div>

                <Row>
                  <Col lg="8">
                    <div>
                      <p className="m-0 text-center primary-color">
                        <i>
                          First time
                          {isStake ? (
                            <b className="m-0 text-center primary-color">
                              {" "}
                              staking
                            </b>
                          ) : (
                            <b className="m-0 text-center primary-color">
                              {" "}
                              unstaking
                            </b>
                          )}
                          {isStake ? (
                            <b className="px-1">BOC</b>
                          ) : (
                            <b className="px-1">sBOC</b>
                          )}
                          ?
                        </i>
                      </p>
                      <p className="m-0 text-center primary-color">
                        <i>
                          Please approve Bank Of Cronos to use your
                          {isStake ? (
                            <b className="px-1">BOC</b>
                          ) : (
                            <b className="px-1">sBOC</b>
                          )}
                          for
                          {isStake ? (
                            <b className="px-1">staking</b>
                          ) : (
                            <b className="px-1">unstaking</b>
                          )}
                          .
                        </i>
                      </p>
                    </div>
                  </Col>
                  <Col lg="4">
                    <button
                      className="form_btn-1"
                      onClick={
                        isStake ? approve_stake_BOC : approve_unstake_BOC
                      }
                    >
                      {loader ? "Approving..." : "Approve"}
                    </button>
                  </Col>
                </Row>
                <Row>
                  <Col lg="8"></Col>
                  <Col lg="4"></Col>{" "}
                </Row>
                <Row>
                  <Col lg="8">
                    <div className="loan_card_input_box">
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
                          }}
                        />
                        <button
                          className="max-btn"
                          onClick={() =>
                            dispatch(
                              setState({
                                name: "stakeamount",
                                value: isStake
                                  ? Math.round(bocbalance * 1000) / 1000
                                  : Math.round(sbocbalance * 1000) / 1000,
                              })
                            )
                          }
                        >
                          max
                        </button>
                      </div>
                    </div>
                  </Col>
                  <Col lg="4">
                    <button
                      className="form_btn-1"
                      onClick={isStake ? stake_BOC : unstake_BOC}
                    >
                      {isStake ? "Stake" : "Unstake"}
                    </button>
                  </Col>
                </Row>
                <div className="p-0 m-0">
                  <div className="d-flex justify-content-between m-0">
                    <p className="m-0 primary-color">Unstaked Balance</p>
                    <p className="m-0 primary-color">
                      {Math.round(bocbalance * 1000) / 1000} BOC
                    </p>
                  </div>
                </div>
                <div className="p-0 m-0">
                  <div className="d-flex justify-content-between m-0">
                    <p className="m-0 primary-color">
                      Total Staked Balance
                      {showTotal ? (
                        <IoIosArrowDown
                          onClick={() =>
                            dispatch(
                              setState({ name: "showTotal", value: false })
                            )
                          }
                        />
                      ) : (
                        <IoIosArrowUp
                          onClick={() =>
                            dispatch(
                              setState({ name: "showTotal", value: true })
                            )
                          }
                        />
                      )}
                    </p>
                    <p className="m-0 primary-color">
                      {Math.round(sbocbalance * 1000) / 1000} BOC
                    </p>
                  </div>
                  {showTotal ? null : (
                    <div className="px-2">
                      <div className=" d-flex justify-content-between m-0">
                        <p className="m-0 primary-color">sBOC</p>
                        <p className="m-0 primary-color">
                          {Math.round(sbocbalance * 1000) / 1000} sBOC
                        </p>
                      </div>
                      <div className="d-flex justify-content-between m-0">
                        <p className="m-0 primary-color">gBOC</p>
                        <p className="m-0 primary-color">0.0000 gBOC</p>
                      </div>
                    </div>
                  )}
                </div>
                <hr />
                <div className="p-0 m-0">
                  <div className="d-flex justify-content-between m-0">
                    <p className="m-0 primary-color">Next Reward Amount</p>
                    <p className="m-0 primary-color">
                      {Math.round(
                        ((reward * sbocbalance) / circsupply) * 1000
                      ) / 1000}{" "}
                      sBOC
                    </p>
                  </div>
                </div>
                <div className="p-0 m-0">
                  <div className="d-flex justify-content-between m-0">
                    <p className="m-0 primary-color">Next Reward Yield</p>
                    <p className="m-0 primary-color">
                      {Math.round((reward / circsupply) * 100 * 1000) / 1000} %
                    </p>
                  </div>
                </div>
                <div className="p-0 m-0">
                  <div className="d-flex justify-content-between m-0">
                    <p className="m-0 primary-color">ROI (5-Day Rate)</p>
                    <p className="m-0 primary-color">
                      {Math.round((reward / circsupply) * 1500 * 1000) / 1000} %
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="d-flex justify-content-center">
                  <button
                    className="pruple_btn"
                    onClick={() =>
                      dispatch(setState({ name: "modalShow", value: true }))
                    }
                  >
                    Connect Wallet
                  </button>
                </div>
                <br />
                <p className="text-center primary-color">
                  Connect your wallet to stake BOC
                </p>
              </div>
            )}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default Stake;
