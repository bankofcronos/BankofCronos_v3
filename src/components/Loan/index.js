import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Row, Col } from "react-bootstrap";
import Popper from "../popper";
import {
  sortedTrovesAddress,
  troveManagerLiquidationsAddress,
  troveManagerRedemptionsAddress,
  troveManagerAddress,
  baseProvider,
} from "../../utils";
import StoredTrove from "../../artifacts/loans/SortedTroves.sol/SortedTroves.json";
import troveManagerLiquidationsABI from "../../artifacts/loans/TroveManagerLiquidations.sol/TroveManagerLiquidations.json";
import troveManager from "../../artifacts/loans/TroveManager.sol/TroveManager.json";
import TMR from "../../artifacts/loans/TroveManagerRedemptions.sol/TroveManagerRedemptions.json";
import { AiFillInfoCircle } from "react-icons/ai";
import {
  FaSwimmingPool,
  FaExchangeAlt,
  FaGasPump,
  FaHandHoldingUsd,
  FaDollarSign,
  FaChartLine,
  FaExternalLinkAlt,
  FaSatelliteDish,
  FaFileContract,
} from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { BsGraphUp } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { selectState, setState } from "../../features/state/stateSlice";
import WCROLogo from "../../assets/WCRO.jpg";
import CronaswapLogo from "../../assets/cronaswaplogo.png";
import mmfLogo from "../../assets/mmflogo.png";
import VvsLogo from "../../assets/vvsfinancelogo.jpg";
import BOCLOGO from "../../assets/CMC token logo.png";
import BOCLogo from "../../assets/boctoken.png";
import chart from "../../assets/chart-square.svg";
import repeat from "../../assets/repeat.svg";
import Export from "../../assets/export.svg";
import vector from "../../assets/Vector.svg";
import circledI from "../../assets/Group 53.svg";
import fuel from "../../assets/Group 55.svg";
import hand from "../../assets/Group 59.svg";
import dollar from "../../assets/Group 60.svg";
import upChart from "../../assets/Group 61.svg";
import question from "../../assets/question.svg";
import CUSDLogo from "../../assets/cusdtoken.png";

const Loan = ({
  adjustloan,
  approve_wcro_BO,
  approve_weth_BO,
  approve_wbtc_BO,
  connect_Metamask,
}) => {
  const state = useSelector(selectState);
  const {
    wbtcbalance,
    windowWidth,
    crobalance,
    wcrobalance,
    WCROAddress,
    wethbalance,
    bocbalance,
    bocprice,
    cusdprice,
    cusdbalance,
    CUSDAddress,
    BOCAddress,
    openLoanCard,
    openPoll,
    newtrovebtccol,
    trovebtccolapproved,
    newtrovedebt,
    newtrovecrocol,
    protocolrecoverythreshold,
    protocoltcr,
    protocolisrecovery,
    protocolcusdsupply,
    spdeposits,
    protocoltvl,
    protocoltrovecount,
    ethpricefeed,
    btcpricefeed,
    showStatboard,
    trovedebt,
    trovebtccol,
    troveethcol,
    trovecrocolapproved,
    trovecrocol,
    newtroveethcol,
    troveethcolapproved,
    cropricefeed,
    istroveactive,
    borrowerOperationsAddress,
    isConnected,
  } = state;
  const dispatch = useDispatch();

  // States
  const [showRedeem, setShowRedeem] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [amount, setAmount] = useState(0);

  // Functions
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      console.log("loading");
      const storedTrove = new ethers.Contract(
        sortedTrovesAddress,
        StoredTrove.abi,
        baseProvider
      );
      const TM = new ethers.Contract(
        troveManagerAddress,
        troveManager.abi,
        baseProvider
      );
      const first = await storedTrove.getFirst();
      const last = await storedTrove.getLast();
      console.log("got 1st and last");
      const arr = [];
      for (let i = 0; i < 4; i++) {
        let address;
        if (i === 0) {
          address = last;
        } else {
          address = await storedTrove.getPrev(arr[i - 1].address);
        }
        if (address === "0x0000000000000000000000000000000000000000") {
          break;
        }
        let trovestate = await TM.getCurrentTroveState(address);
        const trovestatecolcro =
          typeof trovestate[0][0] === "undefined" ? 0 : trovestate[0][0];
        const trovestatecolcroAmt =
          typeof trovestate[1][0] === "undefined"
            ? 0
            : trovestate[1][0] / 1000000000000000000;
        const trovestatecoleth =
          typeof trovestate[0][1] === "undefined" ? 0 : trovestate[0][1];
        const trovestatecolethAmt =
          typeof trovestate[1][1] === "undefined"
            ? 0
            : trovestate[1][1] / 1000000000000000000;
        const trovestatecolbtc =
          typeof trovestate[0][2] === "undefined" ? 0 : trovestate[0][2];
        const trovestatecolbtcAmt =
          typeof trovestate[1][2] === "undefined"
            ? 0
            : trovestate[1][2] / 1000000000000000000;
        const trovestateDebt =
          typeof trovestate[2] === "undefined"
            ? 0
            : trovestate[2] / 1000000000000000000;

        const colRatio =
          Math.round(
            ((trovestatecolcroAmt * cropricefeed +
              trovestatecolethAmt * ethpricefeed +
              trovestatecolbtcAmt * btcpricefeed) *
              10000) /
              trovestateDebt
          ) / 100;

        let obj = {
          address,
          trovestatecolcro,
          trovestatecolcroAmt,
          trovestatecoleth,
          trovestatecolethAmt,
          trovestatecolbtc,
          trovestatecolbtcAmt,
          trovestateDebt,
          colRatio,
        };
        arr.push(obj);
      }
      console.log(arr);
      setUsers(arr);
      setLoadingUsers(false);
    } catch (error) {
      console.log(error);
      setLoadingUsers(false);
    }
    setLoadingUsers(false);
  };

  const handleLiquidate = async () => {
    try {
      if (!isConnected) {
        return;
      }
      const provider = await connect_Metamask();
      const signer = provider.getSigner();

      const liquidate = new ethers.Contract(
        troveManagerAddress,
        troveManager.abi,
        signer
      );

      const txn = await liquidate.liquidate(users[0].address);
      const complete = await txn.wait();
      console.log(complete);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRedeem = async (amount) => {
    try {
      if (!isConnected) {
        return;
      }
      const provider = await connect_Metamask();
      const signer = provider.getSigner();
      const address = await provider.getSigner().getAddress();

      const troveManagerRedemptions = new ethers.Contract(
        troveManagerRedemptionsAddress,
        TMR.abi,
        signer
      );

      console.log(amount, address);
      console.log(troveManagerRedemptions);

      // issue
      await troveManagerRedemptions.redeemCollateral(
        amount,
        50000000000000000n,
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        0,
        0,
        `${address}`
      );
      console.log("done");
    } catch (error) {
      console.log(error);
    }
  };

  const handleMax = () => {
    setAmount(cusdbalance);
  };

  const handleMaxWCRO = () => {
    const wcro_ = trovecrocol;
    console.log("TESTING " + wcro_);
    console.log("TESTING " + wcrobalance);
    dispatch(
      setState({ name: "newtrovecrocol", value: +wcro_ + +wcrobalance })
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <div style={{ marginBottom: 100 }} className="container loans">
        <br /> <br /> <br /> <br />
        {/* <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2"></div>
          <button
            className="hide-desktop my-2 p-2 rounded"
            onClick={() =>
              dispatch(setState({ name: "showStatboard", value: true }))
            }
          >
            <AiFillInfoCircle style={{ fontSize: "30px" }} />
          </button>
        </div> */}
        <Row>
          <Col sm={12} md={7}>
            <div className="card_container">
              {windowWidth < 900 ? (
                <br />
              ) : (
                ""
                // <div className=" loan_card">
                //   <div className="loan_card_header justify-content-between">
                //     <div className="d-flex align-items-center gap-2">
                //       {/* <FaSwimmingPool /> */}
                //       Token Balances
                //     </div>
                //   </div>
                //   <div className="loan_card_body">
                //     <Row>
                //       <Col
                //         xs={6}
                //         sm={6}
                //         md={2}
                //         style={{
                //           padding: 4,
                //         }}
                //         className="my-2"
                //       >
                //         <div className="text-center">
                //           <img
                //             src="https://seeklogo.com/images/C/cronos-cro-logo-29748E04B2-seeklogo.com.png"
                //             width="40px"
                //             alt=""
                //           />
                //           <p className="p-0 m-0 primary-color bold">CRO</p>
                //           <p className="p-0 m-0 primary-color bold">
                //             {Math.round(crobalance * 1000) / 1000}
                //           </p>
                //         </div>
                //       </Col>
                //       <Col
                //         xs={6}
                //         sm={6}
                //         md={2}
                //         style={{
                //           padding: 4,
                //         }}
                //         className="my-2"
                //       >
                //         <div className="text-center">
                //           <div className="token-balance-cards">
                //             <img src={WCROLogo} width="40px" alt="" />
                //             <p className="p-0 m-0 primary-color  bold">WCRO</p>
                //             <p className="p-0 m-0 primary-color  bold">
                //               {Math.round(wcrobalance * 1000) / 1000}
                //             </p>
                //           </div>
                //           <div style={{ marginTop: 6 }}>
                //             <p className="p-0 m-0 primary-color">
                //               <img src={CronaswapLogo} width="20px" alt="" />
                //               &nbsp;&nbsp;
                //               <a
                //                 target="_blank"
                //                 href={
                //                   "https://app.cronaswap.org/swap?outputCurrency=" +
                //                   WCROAddress
                //                 }
                //                 rel="noreferrer"
                //               >
                //                 <FaExchangeAlt />
                //               </a>{" "}
                //             </p>
                //             <p className="p-0 m-0 primary-color">
                //               <img src={mmfLogo} width="20px" alt="" />
                //               &nbsp;&nbsp;
                //               <a
                //                 target="_blank"
                //                 href={
                //                   "https://cronosmm.finance/swap?outputCurrency=" +
                //                   WCROAddress
                //                 }
                //                 rel="noreferrer"
                //               >
                //                 <FaExchangeAlt />
                //               </a>{" "}
                //             </p>
                //             <p className="p-0 m-0 primary-color">
                //               <img src={VvsLogo} width="20px" alt="" />
                //               &nbsp;&nbsp;
                //               <a
                //                 target="_blank"
                //                 href={"https://cronosmm.finance/swap"}
                //                 rel="noreferrer"
                //               >
                //                 <FaExchangeAlt />
                //               </a>{" "}
                //             </p>
                //           </div>
                //         </div>
                //       </Col>

                //       <Col
                //         xs={6}
                //         sm={6}
                //         md={2}
                //         style={{
                //           padding: 4,
                //         }}
                //       >
                //         <div className="text-center">
                //           <div className="token-balance-cards">
                //             <img src={BOCLogo} width="40px" alt="" />
                //             <p className="p-0 m-0 primary-color  bold">BOC</p>
                //             <p className="p-0 m-0 primary-color  bold">
                //               {Math.round(bocbalance * 1000) / 1000}{" "}
                //             </p>
                //           </div>
                //           <div style={{ marginTop: 6 }}>
                //             <p className="p-0 m-0 primary-color">
                //               <img src={CronaswapLogo} width="20px" alt="" />
                //               &nbsp;&nbsp;
                //               <a
                //                 target="_blank"
                //                 href={
                //                   "https://app.cronaswap.org/swap?outputCurrency=" +
                //                   BOCAddress
                //                 }
                //                 rel="noreferrer"
                //               >
                //                 <FaExchangeAlt />
                //               </a>{" "}
                //             </p>
                //             {/*
                //             <p className="p-0 m-0 primary-color">
                //               <img src={mmfLogo} width="20px" alt="" />
                //               &nbsp;&nbsp;
                //               <a
                //                 target="_blank"
                //                 href={
                //                   "https://cronosmm.finance/swap?outputCurrency=" +
                //                   BOCAddress
                //                 }
                //                 rel="noreferrer"
                //               >
                //                 <FaExchangeAlt />
                //               </a>{" "}
                //             </p>
                //             <p className="p-0 m-0 primary-color">
                //               <img src={VvsLogo} width="20px" alt="" />
                //               &nbsp;&nbsp;
                //               <a
                //                 target="_blank"
                //                 href={"https://cronosmm.finance/swap"}
                //                 rel="noreferrer"
                //               >
                //                 <FaExchangeAlt />
                //               </a>{" "}
                //             </p>
                //             */}
                //           </div>
                //         </div>
                //       </Col>
                //       <Col
                //         xs={6}
                //         sm={6}
                //         md={2}
                //         style={{
                //           padding: 4,
                //         }}
                //       >
                //         <div className="text-center">
                //           <div className="token-balance-cards">
                //             <img src={CUSDLogo} width="40px" alt="" />
                //             <p className="p-0 m-0 primary-color bold">CUSD</p>
                //             <p className="p-0 m-0 primary-color bold">
                //               {Math.round(cusdbalance * 1000) / 1000}{" "}
                //             </p>
                //           </div>
                //           <div style={{ marginTop: 6 }}>
                //             <p className="p-0 m-0 primary-color">
                //               <img src={CronaswapLogo} width="20px" alt="" />
                //               &nbsp;&nbsp;
                //               <a
                //                 target="_blank"
                //                 href={
                //                   "https://app.cronaswap.org/swap?outputCurrency=" +
                //                   CUSDAddress
                //                 }
                //                 rel="noreferrer"
                //               >
                //                 <FaExchangeAlt />
                //               </a>{" "}
                //             </p>
                //             {/*
                //             <p className="p-0 m-0 primary-color">
                //               <img src={mmfLogo} width="20px" alt="" />
                //               &nbsp;&nbsp;
                //               <a
                //                 target="_blank"
                //                 href={
                //                   "https://cronosmm.finance/swap?outputCurrency=" +
                //                   CUSDAddress
                //                 }
                //                 rel="noreferrer"
                //               >
                //                 <FaExchangeAlt />
                //               </a>{" "}
                //             </p>
                //             <p className="p-0 m-0 primary-color">
                //               <img src={VvsLogo} width="20px" alt="" />
                //               &nbsp;&nbsp;
                //               <a
                //                 target="_blank"
                //                 href={"https://cronosmm.finance/swap"}
                //                 rel="noreferrer"
                //               >
                //                 <FaExchangeAlt />
                //               </a>{" "}
                //             </p>
                //             */}
                //           </div>
                //         </div>
                //       </Col>
                //     </Row>
                //     <div></div>

                //     <br />
                //   </div>
                // </div>
              )}
              <div className="loan_card">
                <div className="loan_card_header gap-2">
                  {/* <FaSwimmingPool /> */}
                  Loan
                </div>
                <div className="loan_card_body">
                  {openLoanCard ? (
                    <div>
                      <div className="loan_card_input_box">
                        <p className="p-0 m-0 loan_card_input_title">
                          <img
                            src={WCROLogo}
                            width="20px"
                            alt=""
                            style={{ borderRadius: "50%" }}
                          />
                          &nbsp;&nbsp; WCRO Collateral
                        </p>
                        <div className="d-flex">
                          <input
                            value={newtrovecrocol}
                            onChange={(val) =>
                              dispatch(
                                setState({
                                  name: "newtrovecrocol",
                                  value: val.target.value,
                                })
                              )
                            }
                            type="number"
                            placeholder="0"
                            style={{ width: "100%" }}
                          />
                          WCRO&nbsp;&nbsp;{" "}
                          <button onClick={handleMaxWCRO}>max</button>
                          &nbsp;&nbsp;
                          {trovecrocolapproved <
                          newtrovecrocol - trovecrocol ? (
                            <button
                              className="blue_btn"
                              onClick={() =>
                                approve_wcro_BO(
                                  newtrovecrocol - trovecrocol + 1
                                )
                              }
                            >
                              Approve{" "}
                            </button>
                          ) : (
                            <a></a>
                          )}
                        </div>
                      </div>

                      <div className="loan_card_input_box">
                        <p className="p-0 m-0 loan_card_input_title">
                          <img src={CUSDLogo} width="20px" alt="" />
                          &nbsp;&nbsp; CUSD Loan
                        </p>
                        <div className="d-flex">
                          <input
                            value={Math.round(newtrovedebt * 100) / 100}
                            onChange={(val) =>
                              dispatch(
                                setState({
                                  name: "newtrovedebt",
                                  value: val.target.value,
                                })
                              )
                            }
                            type="number"
                            placeholder="0"
                            style={{ width: "100%" }}
                          />
                          CUSD&nbsp;&nbsp;
                        </div>
                      </div>

                      <div className="notification_box d-flex align-items-center gap-2">
                        {/* <HiInformationCircle
                          style={{
                            fontSize: "25px",
                            margin: 0,
                            padding: 0,
                          }}
                        /> */}
                        <img src={circledI}></img>
                        {Math.round(
                          ((newtrovecrocol * cropricefeed +
                            newtroveethcol * ethpricefeed +
                            newtrovebtccol * btcpricefeed) *
                            10000) /
                            newtrovedebt
                        ) /
                          100 <
                        110 ? (
                          <p className="p-0 m-0">
                            Collateral Raio less than 110% (minimum loan
                            collateral ratio). Update Collateral or CUSD Loan
                            Amounts.
                          </p>
                        ) : trovecrocolapproved <
                          newtrovecrocol - trovecrocol ? (
                          <p className="p-0 m-0">
                            Bank of Cronos{" "}
                            <a
                              target="_blank"
                              href={
                                "https://cronoscan.com/address/" +
                                borrowerOperationsAddress
                              }
                              rel="noreferrer"
                            >
                              BorrowerOperations
                            </a>{" "}
                            contract is not approved to transfer your selected
                            WCRO amount. Current approval is{" "}
                            {trovecrocolapproved} which is less than{" "}
                            {newtrovecrocol - trovecrocol} required for this
                            transaction.
                          </p>
                        ) : Math.round(
                            ((newtrovecrocol * cropricefeed +
                              newtroveethcol * ethpricefeed +
                              newtrovebtccol * btcpricefeed) *
                              10000) /
                              newtrovedebt
                          ) /
                            100 <
                          protocolrecoverythreshold ? (
                          <p className="p-0 m-0">
                            Collateral Ratio less than{" "}
                            {protocolrecoverythreshold}% which would be
                            liquidatable under system Recovery Mode (Total
                            Collateral Ratio less than 150%)
                          </p>
                        ) : istroveactive == 1 ? (
                          newtrovecrocol - trovecrocol > 0 ||
                          newtrovedebt - trovedebt > 0 ? (
                            <p className="p-0 m-0">
                              Adjusting Loan: {newtrovecrocol - trovecrocol}{" "}
                              WCRO : {newtrovedebt - trovedebt} CUSD
                            </p>
                          ) : (
                            <p className="p-0 m-0">
                              You can adjust your loan by updating your WCRO
                              collateral or CUSD loan amount.
                            </p>
                          )
                        ) : (
                          <p className="p-0 m-0">
                            Start by entering the amount of Collateral tokens
                            you would like to deposit.
                          </p>
                        )}
                      </div>
                      {troveethcolapproved < newtroveethcol - troveethcol ? (
                        <div className="notification_box d-flex align-items-center gap-2">
                          <HiInformationCircle
                            style={{
                              fontSize: "25px",
                              margin: 0,
                              padding: 0,
                            }}
                          />
                          <p className="p-0 m-0">
                            Bank of Cronos{" "}
                            <a
                              target="_blank"
                              href={
                                "https://cronoscan.com/address/" +
                                borrowerOperationsAddress
                              }
                              rel="noreferrer"
                            >
                              BorrowerOperations
                            </a>{" "}
                            contract is not approved to transfer your selected
                            WETH amount. Current approval is{" "}
                            {troveethcolapproved} which is less than{" "}
                            {newtroveethcol - troveethcol} required for this
                            transaction.
                          </p>
                        </div>
                      ) : (
                        <a></a>
                      )}
                      {trovebtccolapproved < newtrovebtccol - trovebtccol ? (
                        <div className="notification_box d-flex align-items-center gap-2">
                          <HiInformationCircle
                            style={{
                              fontSize: "25px",
                              margin: 0,
                              padding: 0,
                            }}
                          />
                          <p className="p-0 m-0">
                            Bank of Cronos{" "}
                            <a
                              target="_blank"
                              href={
                                "https://cronoscan.com/address/" +
                                borrowerOperationsAddress
                              }
                              rel="noreferrer"
                            >
                              BorrowerOperations
                            </a>{" "}
                            contract is not approved to transfer your selected
                            WBTC amount. Current approval is{" "}
                            {trovebtccolapproved} which is less than{" "}
                            {newtrovebtccol - trovebtccol} required for this
                            transaction.
                          </p>
                        </div>
                      ) : (
                        <a></a>
                      )}
                      <div className="d-flex align-items-center gap-2 py-3 open_loan_list">
                        <div className="icon">
                          <img src={fuel}></img>
                        </div>
                        <div>
                          <p className="p-0 m-0" style={{ fontSize: "14px" }}>
                            Liquidation Reverse
                          </p>
                          <p
                            className="p-0 m-0 primary-color"
                            style={{ fontSize: "20px" }}
                          >
                            <b>20 USD</b>
                          </p>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-2 py-3 open_loan_list">
                        <div className="icon">
                          <img src={hand}></img>
                        </div>
                        <div>
                          <p className="p-0 m-0" style={{ fontSize: "14px" }}>
                            Fixed Loan Fee
                          </p>
                          <p
                            className="p-0 m-0 primary-color"
                            style={{ fontSize: "20px" }}
                          >
                            <b>
                              {parseFloat(newtrovedebt) -
                                parseFloat(trovedebt) <
                              0
                                ? 0.0
                                : Math.round(
                                    (parseFloat(newtrovedebt) -
                                      parseFloat(trovedebt)) *
                                      0.005 *
                                      100
                                  ) / 100}
                            </b>{" "}
                            CUSD
                          </p>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-2 py-3 open_loan_list">
                        <div className="icon">
                          <img src={dollar}></img>
                        </div>
                        <div>
                          <p className="p-0 m-0" style={{ fontSize: "14px" }}>
                            Total Loan Amount
                          </p>
                          <p
                            className="p-0 m-0 primary-color"
                            style={{ fontSize: "20px" }}
                          >
                            {Math.round(
                              (parseFloat(newtrovedebt) -
                                parseFloat(trovedebt) +
                                (parseFloat(newtrovedebt) -
                                  parseFloat(trovedebt)) *
                                  0.005) *
                                100
                            ) / 100}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 py-3 open_loan_list">
                        <div className="icon">
                          <img src={upChart}></img>
                        </div>
                        <div>
                          <p className="p-0 m-0" style={{ fontSize: "14px" }}>
                            Collateral Ratio
                          </p>
                          <p
                            className="p-0 m-0 primary-color"
                            style={{ fontSize: "20px" }}
                          >
                            {newtrovedebt <= 0
                              ? 0.0
                              : Math.round(
                                  ((newtrovecrocol * cropricefeed +
                                    newtroveethcol * ethpricefeed +
                                    newtrovebtccol * btcpricefeed) *
                                    10000) /
                                    newtrovedebt
                                ) / 100}{" "}
                            %
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="my-2">
                        <b className="d-flex align-items-center gap-1 primary-color">
                          <img
                            src={vector}
                            style={{ marginRight: "0.5rem" }}
                          ></img>
                          You haven't borrowed any CUSD yet.
                        </b>
                      </p>
                      <p className="my-2 primary-color">
                        You can borrow CUSD by opening a Loan. Learn more:
                        <a
                          target="_blank"
                          href="https://bank-of-cronos.gitbook.io/docs/basics-of-using-bankofcronos-treasury-protocol/how-do-loans-work"
                          className=""
                          rel="noreferrer"
                        >
                          {" "}
                          How do Loans work? <img src={Export}></img>
                        </a>
                      </p>
                      <br />
                    </div>
                  )}
                  <br />
                  {openLoanCard ? (
                    istroveactive == 1 ? (
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="blue_btn"
                          onClick={() =>
                            adjustloan(
                              newtrovecrocol - trovecrocol,
                              newtroveethcol - troveethcol,
                              newtrovebtccol - trovebtccol,
                              newtrovedebt - trovedebt
                            )
                          }
                        >
                          Adjust Loan
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="blue_btn"
                          onClick={() =>
                            dispatch(
                              setState({ name: "openLoanCard", value: false })
                            )
                          }
                        >
                          Cancel
                        </button>
                        <button
                          className="blue_btn"
                          onClick={() =>
                            dispatch(
                              setState({ name: "openLoanCard", value: false })
                            )
                          }
                        >
                          Open Loan
                        </button>
                      </div>
                    )
                  ) : (
                    <div className="d-flex justify-content-end">
                      <button
                        className="blue_btn"
                        onClick={() =>
                          dispatch(
                            setState({ name: "openLoanCard", value: true })
                          )
                        }
                      >
                        Open Loan
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="loan_card">
                <div className="loan_card_header justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    {/* <FaSwimmingPool /> */}
                    Stability Pool
                  </div>
                  <p className="p-0 m-0"></p>
                </div>
                <div className="loan_card_body">
                  {openPoll ? (
                    <div>
                      <div className="loan_card_input_box">
                        <p className="p-0 m-0 loan_card_input_title">
                          <img src={CUSDLogo} width="20px" alt="" />
                          &nbsp;&nbsp; CUSD
                        </p>
                        <div className="d-flex">
                          <input
                            type="number"
                            placeholder="0.0000"
                            style={{ width: "100%" }}
                          />
                          CUSD &nbsp;&nbsp;<button>max</button>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-2 p-3 pool-share">
                        <div>
                          <p className="p-0 m-0" style={{ fontSize: "12px" }}>
                            Poll Share
                          </p>
                          <p
                            className="p-0 m-0 primary-color"
                            style={{ fontSize: "20px", fontWeight: "bold" }}
                          >
                            0.000000 %
                          </p>
                        </div>
                      </div>

                      <div className="notification_box d-flex align-items-center gap-2">
                        <img src={circledI}></img>
                        <p className="p-0 m-0 ">
                          Enter the amount of CUSD you'd like to deposit into
                          Stability Pool.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="my-2">
                        <b className="d-flex align-items-center gap-1 primary-color">
                          <img
                            src={vector}
                            style={{ marginRight: "0.5rem" }}
                          ></img>
                          You have no CUSD in the Stability Pool.
                        </b>
                      </p>
                      <p className="my-2 primary-color">
                        You can earn Collateral (WCRO) from liquidations by
                        depositing CUSD. Learn more:
                        <a
                          target="_blank"
                          href="https://bank-of-cronos.gitbook.io/docs/basics-of-using-bankofcronos-treasury-protocol/what-is-the-stability-pool"
                          className="my-2"
                          rel="noreferrer"
                        >
                          {" "}
                          What is the Stability Pool? <img src={Export}></img>
                        </a>
                      </p>
                      <br />
                    </div>
                  )}
                  <br />
                  {openPoll ? (
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        className="blue_btn"
                        onClick={() =>
                          dispatch(setState({ name: "openPoll", value: false }))
                        }
                      >
                        Cancel
                      </button>
                      <button
                        className="blue_btn"
                        onClick={() =>
                          dispatch(setState({ name: "openPoll", value: false }))
                        }
                      >
                        Confirm
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-end">
                      <button
                        className="blue_btn"
                        onClick={() =>
                          dispatch(setState({ name: "openPoll", value: true }))
                        }
                      >
                        Deposit
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="loan_card">
                <div className="loan_card_header justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    {/* <FaSwimmingPool /> */}
                    Liquidation/Redemption
                  </div>
                  <p className="p-0 m-0"></p>
                </div>
                <div className="loan_card_body">
                  <div className="list">
                    {loadingUsers ? (
                      "loading..."
                    ) : (
                      <div className="liq-red-container">
                        <Row className="headings">
                          <Col>
                            <b className="d-flex align-items-center gap-1 primary-color">
                              Address
                            </b>
                          </Col>
                          <Col>
                            <b className="d-flex align-items-center gap-1 primary-color">
                              WCRO Collateral
                            </b>
                          </Col>
                          {/*<Col>
                            <b className="d-flex align-items-center gap-1 primary-color">
                              WETH Collateral
                            </b>
                          </Col>
                          <Col>
                            <b className="d-flex align-items-center gap-1 primary-color">
                              WBTC Collateral
                            </b>
                          </Col>
                          */}
                          <Col>
                            <b className="d-flex align-items-center gap-1 primary-color">
                              CUSD Debt
                            </b>
                          </Col>
                          <Col>
                            <b className="d-flex align-items-center gap-1 primary-color">
                              Collateral Ratio
                            </b>
                          </Col>
                        </Row>
                        {users.map((e, i) => {
                          return (
                            <>
                              <hr></hr>
                              <Row>
                                <Col title={e.address}>
                                  {e.address.slice(0, 5)}...
                                  {e.address.slice(-4)}
                                </Col>
                                <Col>
                                  {Math.round(e.trovestatecolcroAmt * 1000) /
                                    1000}
                                </Col>
                                {/*
                              <Col>{e.trovestatecolethAmt}</Col>
                              <Col>{e.trovestatecolbtcAmt}</Col>
                              */}
                                <Col>$ {e.trovestateDebt.toFixed(2)}</Col>
                                <Col>{e.colRatio} %</Col>
                              </Row>
                            </>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  {showRedeem ? (
                    <div>
                      <div className="loan_card_input_box">
                        <p className="p-0 m-0 loan_card_input_title">
                          <img src={CUSDLogo} width="20px" alt="" />
                          &nbsp;&nbsp; CUSD
                        </p>
                        <div className="d-flex">
                          <input
                            type="number"
                            placeholder="0.0000"
                            style={{ width: "100%" }}
                            value={amount}
                            onChange={(e) => {
                              setAmount(e.target.value);
                            }}
                          />
                          CUSD &nbsp;&nbsp;
                          <button onClick={handleMax}>max</button>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-2 p-3">
                        <div>
                          <p
                            className="p-0 m-0 primary-color"
                            style={{ fontSize: "12px" }}
                          >
                            Poll Share
                          </p>
                          <p className="p-0 m-0 primary-color">0.000000 %</p>
                        </div>
                      </div>

                      <div className="notification_box d-flex align-items-center gap-2">
                        <img src={circledI}></img>
                        <p className="p-0 m-0 ">
                          Enter the amount of CUSD you'd like to redeem for
                          system collateral.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="my-2">
                        <b className="d-flex align-items-center gap-1 primary-color">
                          <img
                            src={vector}
                            style={{ marginRight: "0.5rem" }}
                          ></img>
                          You can Liquidate Loans under minimum collateral ratio
                          (%110 or %150 when protocol is in recovery mode).
                        </b>
                      </p>
                      <p className="my-2 primary-color">
                        You always redeem CUSD for Loan Collateral (WCRO). Learn
                        more:
                        <a
                          target="_blank"
                          href="https://bank-of-cronos.gitbook.io/docs/basics-of-using-bankofcronos-treasury-protocol/what-are-redemptions"
                          className="my-2"
                          rel="noreferrer"
                        >
                          {" "}
                          What are Redemptions? <img src={Export}></img>
                        </a>
                      </p>
                      <br />
                    </div>
                  )}
                  <br />
                  {showRedeem ? (
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        className="blue_btn"
                        onClick={() => setShowRedeem(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="blue_btn"
                        onClick={async () => {
                          await handleRedeem(amount);
                          setShowRedeem(false);
                        }}
                      >
                        Redeem
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        className="blue_btn"
                        onClick={() => setShowRedeem(true)}
                      >
                        Redeem
                      </button>
                      <button
                        className="blue_btn"
                        onClick={() => handleLiquidate()}
                      >
                        Liquidate
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* <br /> */}
              {/* <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br /> */}
            </div>
          </Col>
          <Col sm={12} md={5}>
            <div
              style={{ marginBottom: 100 }}
              // className={
              //   windowWidth < 900
              //     ? showStatboard
              //       ? "liquidy_card"
              //       : "liquidy_card d-none"
              //     : "liquidy_card"
              // }
              className="liquidy_card"
            >
              <div className="d-flex gap-2 align-items-center justify-content-between">
                <div>
                  {/* <BsGraphUp /> */}
                  {/* &nbsp;&nbsp;{" "} */}
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Loans Protocol Statistics
                  </span>
                  <br></br>
                </div>
                {/* <div>
                  {windowWidth < 900 ? (
                    <button
                      style={{ fontSize: 30 }}
                      onClick={() =>
                        dispatch(
                          setState({ name: "showStatboard", value: false })
                        )
                      }
                      className="bg-transparent"
                    >
                      x
                    </button>
                  ) : null}
                </div> */}
              </div>
              <div style={{ marginTop: 20 }} className="hide-desktop">
                <p
                  style={{
                    fontSize: 16,
                    textAlign: "left",
                    fontWeight: "700",
                  }}
                >
                  My Account Balances
                </p>
                <div className="d-flex py-1 m-1 protocol ">
                  <p className="m-0 property ">CRO </p>
                  <p className="m-0">{Math.round(crobalance * 1000) / 1000}</p>
                </div>
                <div className="d-flex py-1 m-1 protocol ">
                  <p className="m-0 property ">WCRO </p>
                  <p className="m-0">{Math.round(wcrobalance * 1000) / 1000}</p>
                </div>
                <div className="d-flex py-1 m-1 protocol ">
                  <p className="m-0 property ">BTC </p>
                  <p className="m-0">{Math.round(wbtcbalance * 1000) / 1000}</p>
                </div>
                <div className="d-flex py-1 m-1 protocol ">
                  <p className="m-0 property ">ETH </p>
                  <p className="m-0">{Math.round(wethbalance * 1000) / 1000}</p>
                </div>
                <div className="d-flex py-1 m-1 protocol ">
                  <p className="m-0 property ">BOC </p>
                  <p className="m-0">{Math.round(bocbalance * 1000) / 1000}</p>
                </div>
                <div className="d-flex py-1 m-1 protocol ">
                  <p className="m-0 property ">CUSD </p>
                  <p className="m-0">{Math.round(cusdbalance * 1000) / 1000}</p>
                </div>
              </div>
              <Row>
                <Col
                  xs={6}
                  sm={6}
                  md={3}
                  style={{ padding: 10 }}
                  className="my-2"
                >
                  <div className="text-center">
                    <img
                      style={{ objectFit: "contain" }}
                      src="https://seeklogo.com/images/C/cronos-cro-logo-29748E04B2-seeklogo.com.png"
                      width="40px"
                      height="40px"
                      alt=""
                    />
                    <p className="m-0 bold">CRO</p>
                    <p className="m-0 bold">
                      ${Math.round(cropricefeed * 1000) / 1000}
                    </p>
                    <p>
                      Oracle Price{" "}
                      <Popper content="The Bank of Cronos Loans Protocol uses the Tectonic CRO/USD price feed  as an Oracle for the price of CRO. This price feed determines System and Loan Collateral Ratios, and when liquidations can happen." />
                    </p>
                    <a
                      title="Tectonic Oracles"
                      href={
                        "https://tectonic.gitbook.io/docs/developer/price-oracle"
                      }
                    >
                      <img src={chart} width="16px" height="16px"></img>
                    </a>
                    &nbsp;&nbsp;
                    <a
                      title="Tectonic CRO Pricefeed contract"
                      href={
                        "https://cronoscan.com/address/0x4636ac8216805fe96de9e7afc62da99096a930f6"
                      }
                    >
                      <img src={repeat} width="16px" height="16px"></img>
                    </a>
                    <div className="m-0 d-flex align-items-center justify-content-center"></div>
                  </div>
                </Col>
                <Col
                  xs={6}
                  sm={6}
                  md={3}
                  style={{ padding: 10 }}
                  className="my-2"
                >
                  <div className="text-center">
                    <img
                      style={{
                        objectFit: "contain",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                      src={WCROLogo}
                      width="40px"
                      height="40px"
                      alt=""
                    />
                    <p className="m-0 bold">WCRO</p>
                    <p className="m-0 bold">
                      ${Math.round(cropricefeed * 1000) / 1000}
                    </p>
                    <p>
                      Oracle Price{" "}
                      <Popper content="The Bank of Cronos Loans Protocol uses the Tectonic CRO/USD price feed  as an Oracle for the price of CRO. This price feed determines System and Loan Collateral Ratios, and when liquidations can happen." />
                    </p>
                    <a
                      title="Tectonic Oracles"
                      href={
                        "https://tectonic.gitbook.io/docs/developer/price-oracle"
                      }
                    >
                      <img src={chart} width="16px" height="16px"></img>
                    </a>
                    &nbsp;&nbsp;
                    <a
                      title="Tectonic BTC Pricefeed contract"
                      href={
                        "https://cronoscan.com/address/0xb3df0a9582361db08ec100bd5d8cb70fa8579f4b"
                      }
                    >
                      <img src={repeat} width="16px" height="16px"></img>
                    </a>
                  </div>
                </Col>
                <Col
                  xs={6}
                  sm={6}
                  md={3}
                  style={{ padding: 10 }}
                  className="my-2"
                >
                  <div className="text-center">
                    <img
                      style={{ objectFit: "contain" }}
                      src={CUSDLogo}
                      width="40px"
                      height="40px"
                      alt=""
                    />
                    <p className="m-0 bold">CUSD</p>
                    <p className="m-0 bold">
                      ${Math.round(cusdprice * 100) / 100}
                    </p>
                    <p>
                      Market Price{" "}
                      <Popper content="Bank of Cronos token market price as per CUSD/USDC Cronaswap Liquidity Pool" />
                    </p>
                    <a
                      title="Tectonic Oracles"
                      href={
                        "https://tectonic.gitbook.io/docs/developer/price-oracle"
                      }
                    >
                      <img src={chart} width="16px" height="16px"></img>
                    </a>
                    &nbsp;&nbsp;
                    <a
                      title="Tectonic BTC Pricefeed contract"
                      href={
                        "https://cronoscan.com/address/0xb3df0a9582361db08ec100bd5d8cb70fa8579f4b"
                      }
                    >
                      <img src={repeat} width="16px" height="16px"></img>
                    </a>
                  </div>
                </Col>
                <Col
                  xs={6}
                  sm={6}
                  md={3}
                  style={{ padding: 10 }}
                  className="my-2"
                >
                  <div className="text-center">
                    <img
                      style={{ objectFit: "contain" }}
                      src={BOCLogo}
                      width="40px"
                      alt=""
                    />
                    <p className="m-0 bold">BOC</p>
                    <p className="m-0 bold">
                      $ {Math.round(bocprice * 100) / 100}
                    </p>
                    <p>
                      Market Price{" "}
                      <Popper content="Bank of Cronos token market price as per BOC/USDC Cronaswap Liquidity Pool" />
                    </p>
                    <a
                      title="Tectonic Oracles"
                      href={
                        "https://tectonic.gitbook.io/docs/developer/price-oracle"
                      }
                    >
                      <img src={chart} width="16px" height="16px"></img>
                    </a>
                    &nbsp;&nbsp;
                    <a
                      title="Tectonic BTC Pricefeed contract"
                      href={
                        "https://cronoscan.com/address/0xb3df0a9582361db08ec100bd5d8cb70fa8579f4b"
                      }
                    >
                      <img src={repeat} width="16px" height="16px"></img>
                    </a>
                  </div>
                </Col>
              </Row>

              <div>
                <span
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  className="m-1"
                >
                  Protocol
                </span>

                <div className="d-flex py-1 protocol ">
                  <p className="m-0 property ">
                    Borrowing Fee{" "}
                    <img
                      src={question}
                      title={
                        "The Bank of Cronos Loans protocol applies a fixed 0.5% fee (when not in recovery mode). See documentation on fee calculations."
                      }
                    />
                  </p>
                  <p className="m-0 value">0.5%</p>
                </div>

                <div className="d-flex py-1 protocol">
                  <p className="m-0 property">
                    TVL{" "}
                    <img
                      src={question}
                      title={
                        "TVL includes all Collateral in the system + Stability Pool Deposits."
                      }
                    />
                  </p>
                  <p className="m-0 value">
                    $ {Math.round(protocoltvl * 100) / 100}{" "}
                  </p>
                </div>

                <div className="d-flex py-1 protocol">
                  <p className="m-0 property">
                    Number of Active Loans{" "}
                    <img
                      src={question}
                      title={"Number of loans active in the protocol."}
                    />
                  </p>
                  <p className="m-0 value">
                    {Math.round(protocoltrovecount * 100) / 100}
                  </p>
                </div>

                <div className="d-flex py-1 protocol">
                  <p className="m-0 property">
                    CUSD supply{" "}
                    <img src={question} title={"Total CUSD token supply."} />
                  </p>
                  <p className="m-0 value">
                    $ {Math.round(protocolcusdsupply * 100) / 100}
                  </p>
                </div>

                <div className="d-flex py-1 protocol">
                  <p className="m-0 property">
                    CUSD in Stability Pool{" "}
                    <img
                      src={question}
                      title={"Total CUSD in Stability Pool."}
                    />
                  </p>
                  <p className="m-0 value">
                    $ {Math.round(spdeposits * 100) / 100}
                  </p>
                </div>

                <div className="d-flex py-1 protocol">
                  <p className="m-0 property">
                    Total Collateral Ratio{" "}
                    <img
                      src={question}
                      title={
                        "System Total Collateral Ratio. If this ratio is below 150%, the system will enter recovery mode."
                      }
                    />
                  </p>
                  <p className="m-0 value">
                    {Math.round(protocoltcr * 100) / 100}%
                  </p>
                </div>

                <div className="d-flex py-1 protocol">
                  <p className="m-0 property">
                    Recovery Mode{" "}
                    <img
                      src={question}
                      title={
                        "Recovery mode is enabled once total collateral ratio is under 150%. In recovery mode all individual Loans with collateral ratio under 150% can be liquidated."
                      }
                    />
                  </p>
                  <p className="m-0 value">{protocolisrecovery}</p>
                </div>

                <div className="d-flex py-1 protocol">
                  <p className="m-0 property">
                    Recovery Mode Collateral Ratio Threshold
                  </p>
                  <p className="m-0 value">{protocolrecoverythreshold}%</p>
                </div>
              </div>
              {/* <div className="py-2">
                <p className="m-0">Deployed: 3/09/2023, 4:33:10AM</p>
                <p className="m-0">Frontend version: 1.0.1</p>
              </div> */}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Loan;
