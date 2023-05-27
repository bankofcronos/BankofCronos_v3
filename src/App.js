import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Popper,
  SideBar,
  TopBar,
  Dashboard,
  Bond,
  Loan,
  Stake,
} from "./components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { AiOutlineClose, AiOutlineSetting } from "react-icons/ai";
import { Row, Col } from "react-bootstrap";
import { debounce } from "lodash";
import useLocalStorage from "use-local-storage";
import { BsGraphUp } from "react-icons/bs";
import { HiInformationCircle } from "react-icons/hi";
import {
  FaChartLine,
  FaExternalLinkAlt,
  FaFileContract,
  FaSatelliteDish,
} from "react-icons/fa";
import { AiFillInfoCircle } from "react-icons/ai";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import {
  FaGasPump,
  FaHandHoldingUsd,
  FaDollarSign,
  FaSearch,
  FaSwimmingPool,
} from "react-icons/fa";
import { GoSettings } from "react-icons/go";
import {
  AiOutlineWallet,
  AiFillMediumSquare,
  AiOutlineTwitter,
  AiOutlineMenu,
} from "react-icons/ai";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiStackLine } from "react-icons/ri";
import { BsCashStack } from "react-icons/bs";
import { HiLightBulb, HiMoon } from "react-icons/hi";
import { FaDiscord, FaEthereum, FaExchangeAlt, FaBook } from "react-icons/fa";
import BOCLOGO from "./assets/CMC token logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Drawer } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "./utils.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import { DeFiWeb3Connector } from "deficonnect";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import { providers } from "ethers";
import LogoLight from "./assets/Lion-Face-WHITE.png";
import LogoDark from "./assets/Lion-Face.png";
import BOCLogo from "./assets/boctoken.png";
import CUSDLogo from "./assets/cusdtoken.png";
import WCROLogo from "./assets/WCRO.jpg";
import CronaswapLogo from "./assets/cronaswaplogo.png";
import VvsLogo from "./assets/vvsfinancelogo.jpg";
import mmfLogo from "./assets/mmflogo.png";
import USDC from "./artifacts/contracts/mocks/USDC.sol/CronosCRC20.json";
import BOCNFTLaunch from "./artifacts/contracts/BOCLaunchNft.sol/BOC_NFT_Basic.json";
import BOCNFTLaunchPremier from "./artifacts/contracts/BOCLaunchNftPremier.sol/BOC_NFT_Premier.json";
import BOCNFTLaunchExclusive from "./artifacts/contracts/BOCLaunchNftExclusive.sol/BOC_NFT_Exclusive.json";
import BOCMultisig from "./artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json";

import BOC from "./artifacts/contracts/OlympusERC20.sol/OlympusERC20Token.json";
import Cusd from "./artifacts/loans/CUSDToken.sol/CUSDToken";
import WCRO from "./artifacts/contracts/mocks/USDC.sol/CronosCRC20.json";
import WETH from "./artifacts/contracts/mocks/USDC.sol/CronosCRC20.json";
import WBTC from "./artifacts/contracts/mocks/USDC.sol/CronosCRC20.json";

import PriceFeed from "./artifacts/loans/PriceFeed.sol/PriceFeed";
import ActivePool from "./artifacts/loans/ActivePool.sol/ActivePool.json";
import DefaultPool from "./artifacts/loans/DefaultPool.sol/DefaultPool.json";
import StabilityPool from "./artifacts/loans/StabilityPool.sol/StabilityPool.json";
import TroveManager from "./artifacts/loans/TroveManager.sol/TroveManager.json";
import TroveManagerLiquidations from "./artifacts/loans/TroveManagerLiquidations.sol/TroveManagerLiquidations.json";
import TroveManagerRedemptions from "./artifacts/loans/TroveManagerRedemptions.sol/TroveManagerRedemptions.json";
import WhiteList from "./artifacts/loans/Dependencies/Whitelist.sol/Whitelist.json";
import BorrowOperations from "./artifacts/loans/BorrowerOperations.sol/BorrowerOperations.json";
import PriceCurve from "./artifacts/loans/PriceCurves/ThreePieceWiseLinearPriceCurve.sol/ThreePieceWiseLinearPriceCurve.json";

import Treasury from "./artifacts/contracts/Treasury.sol/OlympusTreasury.json";
import OlympusBondingCalculator from "./artifacts/contracts/StandardBondingCalculator.sol/OlympusBondingCalculator.json";
import Distributor from "./artifacts/contracts/StakingDistributor.sol/Distributor.json";
import SBOC from "./artifacts/contracts/sOlympusERC20.sol/sOlympus.json";
import Staking from "./artifacts/contracts/Staking.sol/OlympusStaking.json";
import StakingWarmpup from "./artifacts/contracts/StakingWarmup.sol/StakingWarmup.json";
import StakingHelper from "./artifacts/contracts/StakingHelper.sol/StakingHelper.json";
import USDCBond from "./artifacts/contracts/mocks/MockBondDepository.sol/MockOlympusBondDepository.json";
import CusdBond from "./artifacts/contracts/mocks/MockBondDepository.sol/MockOlympusBondDepository.json";
import CronaswapFactory from "./artifacts/contracts/CronaSwapFactory.sol/CronaSwapFactory.json";
import CronaswapRouter from "./artifacts/contracts/CronaSwapRouter.sol/CronaSwapRouter.json";
import ExercisePBOC from "./artifacts/contracts/ExercisePOLY.sol/ExercisePOLY.json";
import PreBOC from "./artifacts/contracts/PreOlympus.sol/PreOlympusToken.json";
import CronaswapLp from "./artifacts/contracts/lptoken.json";

import {
  BOCMultisigAddress,
  BOCAddress,
  USDCAddress,
  BOCNFTAddress,
  BOCNFTLaunchPremierAddress,
  BOCNFTLaunchExclusiveAddress,
  LPAddress,
  TreasuryAddress,
  OlympusBondingCalculatorAddress,
  DistributorAddress,
  SBOCAddress,
  StakingAddress,
  StakingWarmpupAddress,
  StakingHelperAddress,
  USDCBondAddress,
  CusdBondAddress,
  pBOCBondAddress,
  ExercisePOLYBondAddress,
  BOCBondingCalculatorAddress,
  BOCLPBondAddress,
  CronaswapFactoryAddress,
  CronaswapRouterAddress,
  CUSDAddress,
  WETHAddress,
  WCROAddress,
  WBTCAddress,
  ethPriceFeedAddress,
  croPriceFeedAddress,
  btcPriceFeedAddress,
  sortedTrovesAddress,
  troveManagerAddress,
  activePoolAddress,
  stabilityPoolAddress,
  gasPoolAddress,
  defaultPoolAddress,
  collSurplusPoolAddress,
  borrowerOperationsAddress,
  hintHelpersAddress,
  troveManagerLiquidationsAddress,
  troveManagerRedemptionsAddress,
  whitelistAddress,
  ethlinearpricecurveAddress,
  crolinearpricecurveAddress,
  btclinearpricecurveAddress,
  baseProvider,
  CUSDLPAddress,
} from "./utils";
import { setState, selectState } from "./features/state/stateSlice";

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

export default function App() {
  const state = useSelector(selectState);
  const {
    address,
    usdcbalance,
    cusdbalance,
    wcrobalance,
    crobalance,
    wethbalance,
    wbtcbalance,
    bocbalance,
    sbocbalance,
    treasurybalance,
    lpbalance,
    cropricefeed,
    ethpricefeed,
    btcpricefeed,
    trovecrocol,
    troveethcol,
    trovebtccol,
    trovedebt,
    newtrovecrocol,
    newtroveethcol,
    newtrovebtccol,
    newtrovedebt,
    istroveactive,
    protocolborrowfee,
    protocoltvl,
    protocoltrovecount,
    protocolcusdsupply,
    protocoltcr,
    protocolisrecovery,
    protocolrecoverythreshold,
    protocolSystemVC,
    protocolCROVC,
    protocolBTCVC,
    protocolETHVC,
    spdeposits,
    newspdeposits,
    trovecrocolapproved,
    troveethcolapproved,
    trovebtccolapproved,
    connecterror,
    connectstep,
    status,
    mintsuccess,
    optionsState,
    connection,
    stakeamount,
    unstakeamount,
    index,
    reward,
    circsupply,
    rebasetime,
    bondamount,
    bocprice,
    cusdprice,
    bocbondprice,
    bocmaxbond,
    bondtime,
    bondpurchased,
    bondvested,
    bondstatus,
    totalsupply,
    lptreasurybalance,
    lpbondamount,
    lpbocprice,
    lpbocbondprice,
    lpbocmaxbond,
    lpbondtime,
    lpbondpurchased,
    lpbondvested,
    lpbondstatus,
    openSideBar,
    showBond,
    bondModal,
    bondModal2,
    modalShow,
    windowWidth,
    open,
    isStake,
    loader,
    toggle,
    showTotal,
    modalShowBond,
    isConnected,
    openLoanCard,
    openPoll,
    openStaking,
    showStatboard,
    isConnecting,
    currentPath,
    isScrolling,
    showAgreementModal,
    isAgreeToTermsPolicy,
  } = state;
  const dispatch = useDispatch();

  function updateStatesFromLocalStorage() {
    // Get data from localStorage and dispatch actions to update the state
    const localStorageItems = [
      "isConnected",
      "usdcbalance",
      "cusdbalance",
      "crobalance",
      "wcrobalance",
      "wethbalance",
      "wbtcbalance",
      "bocbalance",
      "sbocbalance",
      "treasurybalance",
      "lpbalance",
      "connecterror",
      "status",
      "mintsuccess",
      "optionsState",
      "connection",
      "stakeamount",
      "unstakeamount",
      "index",
      "reward",
      "circsupply",
      "rebasetime",
      "bondamount",
      "bocprice",
      "cusdprice",
      "bocbondprice",
      "bocmaxbond",
      "bondtime",
      "bondpurchased",
      "bondvested",
      "bondstatus",
      "totalsupply",
      "lptreasurybalance",
      "lpbondamount",
      "lpbocprice",
      "lpbocbondprice",
      "lpbocmaxbond",
      "lpbondtime",
      "lpbondpurchased",
      "lpbondvested",
      "lpbondstatus",
      "address",
      "OpenLoanCard",
      "cropricefeed",
      "ethpricefeed",
      "btcpricefeed",
      "trovecrocol",
      "troveethcol",
      "trovebtccol",
      "trovedebt",
      "istroveactive",
      "newtrovecrocol",
      "newtroveethcol",
      "newtrovebtccol",
      "newtrovedebt",
      "protocolborrowfee",
      "protocoltvl",
      "protocoltrovecount",
      "protocolcusdsupply",
      "protocoltcr",
      "protocolisrecovery",
      "protocolrecoverythreshold",
      "protocolSystemVC",
      "protocolCROVC",
      "protocolBTCVC",
      "protocolETHVC",
      "spdeposits",
      "newspdeposits",
      "trovecrocolapproved",
      "troveethcolapproved",
      "trovebtccolapproved",
      "showAgreementModal",
      "isAgreeToTermsPolicy",
    ];

    localStorageItems.forEach((item) => {
      const value = localStorage.getItem(item);
      if (value !== null) {
        dispatch(setState({ name: item, value }));
      }
    });

    const address = localStorage.getItem("address");
    if (address) {
      dispatch(
        setState({
          name: "address",
          value:
            address.substring(0, 4) +
            "..." +
            address.substring(address.length - 4, address.length),
        })
      );
    }
  }

  function handleSidebarState() {
    // Check window width and update the openSideBar state
    if (window.innerWidth > 900) {
      dispatch(setState({ name: "openSideBar", value: true }));
      dispatch(setState({ name: "windowWidth", value: window.innerWidth }));
    } else {
      dispatch(setState({ name: "openSideBar", value: false }));
      dispatch(setState({ name: "windowWidth", value: window.innerWidth }));
    }
  }

  function handleResize() {
    updateStatesFromLocalStorage();
    handleSidebarState();
  }

  const debouncedHandleResize = debounce(handleResize, 250);

  useEffect(() => {
    updateStatesFromLocalStorage();
    handleSidebarState();
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // connect to contract
  function retry(maxRetries, fn, provider, connection_num, signer, account) {
    return fn(provider, connection_num, signer, account).catch(function (err) {
      if (maxRetries <= 0) {
        throw err;
      }
      console.log("Retrying " + fn + " number left " + maxRetries);
      sleep(1000);
      return retry(
        maxRetries - 1,
        fn,
        provider,
        connection_num,
        signer,
        account
      );
    });
  }

  async function connectapp_loans_onload(
    provider,
    connection_num,
    signer,
    account
  ) {
    //pricefeeds
    //user troves
    //user stability pools
    //protocol stats
    const ethPF = new ethers.Contract(
      ethPriceFeedAddress,
      PriceFeed.abi,
      signer
    );
    const croPF = new ethers.Contract(
      croPriceFeedAddress,
      PriceFeed.abi,
      signer
    );
    const btcPF = new ethers.Contract(
      btcPriceFeedAddress,
      PriceFeed.abi,
      signer
    );
    const TM = new ethers.Contract(
      troveManagerAddress,
      TroveManager.abi,
      signer
    );
    const TML = new ethers.Contract(
      troveManagerLiquidationsAddress,
      TroveManagerLiquidations.abi,
      signer
    );
    const TMR = new ethers.Contract(
      troveManagerRedemptionsAddress,
      TroveManagerRedemptions.abi,
      signer
    );
    const cusd = new ethers.Contract(CUSDAddress, Cusd.abi, signer);
    const SB = new ethers.Contract(
      stabilityPoolAddress,
      StabilityPool.abi,
      signer
    );
    const WL = new ethers.Contract(whitelistAddress, WhiteList.abi, signer);
    const BO = new ethers.Contract(
      borrowerOperationsAddress,
      BorrowOperations.abi,
      signer
    );
    const AP = new ethers.Contract(activePoolAddress, ActivePool.abi, signer);
    const wcro = new ethers.Contract(WCROAddress, WCRO.abi, signer);
    const weth = new ethers.Contract(WETHAddress, WETH.abi, signer);
    const wbtc = new ethers.Contract(WBTCAddress, WBTC.abi, signer);

    let croprice;
    let ethprice;
    let btcprice;
    let isrecoverymode;
    let entireSystemColl;
    let entireSystemDebt;
    let sbdeposits;
    let cusdsupply;
    let trovecount;
    let trovestate;
    let mincolratio;
    let recoverymodemincolratio;

    let promises = [
      ethPF.fetchPrice_v(),
      croPF.fetchPrice_v(),
      btcPF.fetchPrice_v(),
      BO.getEntireSystemDebt(),
      AP.getVCforTCRSystem(),
      SB.getTotalCUSDDeposits(),
      cusd.totalSupply(),
      TM.getTroveOwnersCount(),
      TM.checkRecoveryMode(),
      TML.MCR(),
      TML.CCR(),
    ];

    Promise.all(promises).then((results) => {
      // Assign the results of the contract reads to the variables defined outside the callback
      [
        ethprice,
        croprice,
        btcprice,
        entireSystemDebt,
        entireSystemColl,
        sbdeposits,
        cusdsupply,
        trovecount,
        isrecoverymode,
        mincolratio,
        recoverymodemincolratio,
      ] = results;

      const recoverymode = isrecoverymode ? "Yes" : "No";

      dispatch(
        setState({
          name: "cropricefeed",
          value: croprice / 1000000000000000000,
        })
      );

      dispatch(
        setState({
          name: "ethpricefeed",
          value: ethprice / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "btcpricefeed",
          value: btcprice / 1000000000000000000,
        })
      );

      dispatch(
        setState({
          name: "protocoltvl",
          value:
            ethers.BigNumber.from(entireSystemColl[0]).toString() /
              1000000000000000000 +
            ethers.BigNumber.from(sbdeposits).toString() / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "protocoltrovecount",
          value: ethers.BigNumber.from(trovecount).toString(),
        })
      );
      dispatch(
        setState({
          name: "protocolcusdsupply",
          value:
            ethers.BigNumber.from(cusdsupply).toString() / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "protocoltcr",
          value:
            (100 * ethers.BigNumber.from(entireSystemColl[0]).toString()) /
            ethers.BigNumber.from(entireSystemDebt).toString(),
        })
      );
      dispatch(
        setState({
          name: "spdeposits",
          value:
            ethers.BigNumber.from(sbdeposits).toString() / 1000000000000000000,
        })
      );
      dispatch(setState({ name: "protocolisrecovery", value: recoverymode }));
      dispatch(
        setState({
          name: "protocolrecoverythreshold",
          value:
            ethers.BigNumber.from(recoverymodemincolratio).toString() /
            10000000000000000,
        })
      );

      localStorage.setItem("cropricefeed", croprice / 1000000000000000000);
      localStorage.setItem("ethpricefeed", ethprice / 1000000000000000000);
      localStorage.setItem("btcpricefeed", btcprice / 1000000000000000000);
      localStorage.setItem(
        "protocoltcr",
        (100 * ethers.BigNumber.from(entireSystemColl[0]).toString()) /
          ethers.BigNumber.from(entireSystemDebt).toString()
      );
      localStorage.setItem(
        "spdeposits",
        ethers.BigNumber.from(sbdeposits).toString() / 1000000000000000000
      );
      localStorage.setItem(
        "protocolcusdsupply",
        ethers.BigNumber.from(cusdsupply).toString() / 1000000000000000000
      );
      localStorage.setItem(
        "protocoltrovecount",
        ethers.BigNumber.from(trovecount).toString()
      );
      localStorage.setItem(
        "protocoltvl",
        ethers.BigNumber.from(entireSystemColl[0]).toString() /
          1000000000000000000 +
          ethers.BigNumber.from(sbdeposits).toString() / 1000000000000000000
      );
      localStorage.setItem("protocolisrecovery", recoverymode);
      localStorage.setItem(
        "protocolrecoverythreshold",
        ethers.BigNumber.from(recoverymodemincolratio).toString() /
          10000000000000000
      );
    });
  }

  const getBaseInfo = async () => {
    //boc -> boc balances
    const boc = new ethers.Contract(BOCAddress, BOC.abi, baseProvider);
    const sBOC = new ethers.Contract(SBOCAddress, SBOC.abi, baseProvider);
    const usdc = new ethers.Contract(USDCAddress, USDC.abi, baseProvider);
    const usdcbond = new ethers.Contract(
      USDCBondAddress,
      USDCBond.abi,
      baseProvider
    );
    const cronaswaplp = new ethers.Contract(
      LPAddress,
      CronaswapLp.abi,
      baseProvider
    );
    const cusdcronaswaplp = new ethers.Contract(
      CUSDLPAddress,
      CronaswapLp.abi,
      baseProvider
    );
    let lpbond = new ethers.Contract(
      BOCLPBondAddress,
      USDCBond.abi,
      baseProvider
    );
    const ethPF = new ethers.Contract(
      ethPriceFeedAddress,
      PriceFeed.abi,
      baseProvider
    );
    const croPF = new ethers.Contract(
      croPriceFeedAddress,
      PriceFeed.abi,
      baseProvider
    );
    const btcPF = new ethers.Contract(
      btcPriceFeedAddress,
      PriceFeed.abi,
      baseProvider
    );

    try {
      dispatch(setState({ name: "IsConnecting", value: true }));

      // Dashboard
      dispatch(
        setState({
          name: "totalsupply",
          value: (await boc.totalSupply()) / 1000000000,
        })
      );
      dispatch(
        setState({
          name: "circsupply",
          value: (await sBOC.circulatingSupply()) / 1000000000,
        })
      );
      let bocPrice = await cronaswaplp.getReserves();
      let cusdPrice = await cusdcronaswaplp.getReserves();
      dispatch(
        setState({
          name: "bocprice",
          value: (bocPrice[0] * 1000) / bocPrice[1],
        })
      );
      dispatch(
        setState({
          name: "index",
          value: ethers.BigNumber.from(await sBOC.index()) / 1000000000,
        })
      );
      console.log("DEBUG1: " + cusdPrice[0] + " and " + cusdPrice[1]);
      dispatch(
        setState({
          name: "cusdprice",
          value: cusdPrice[0] / (cusdPrice[1] * 1000000000000),
        })
      );

      // Stake
      await connectapp_staking(baseProvider, "", baseProvider, "");
      // settreasurybalance((await usdc.balanceOf(TreasuryAddress)) / 1000000);
      dispatch(
        setState({
          name: "treasurybalance",
          value: (await usdc.balanceOf(TreasuryAddress)) / 1000000,
        })
      );

      // SideBar
      dispatch(
        setState({
          name: "bondbocprice",
          value:
            ethers.BigNumber.from(await usdcbond.bondPriceInUSD()) / 1000000,
        })
      );
      let totallp = await cronaswaplp.totalSupply();
      dispatch(
        setState({
          name: "lpbocprice",
          value: (totallp * 0.5) / (bocPrice[1] / 1000000000) / 1000000,
        })
      );
      let lppayout = await lpbond.payoutFor(64);
      dispatch(
        setState({ name: "lpbondbocprice", value: 1 / (lppayout / 1000) })
      );
      dispatch(
        setState({
          name: "lpbocmaxbond",
          value: (await lpbond.maxPayout()) / 1000000000,
        })
      );

      // loan
      await connectapp_loans_onload(baseProvider, "", baseProvider, "");

      dispatch(setState({ name: "IsConnecting", value: false }));
    } catch (error) {
      console.log(error);
    }
    dispatch(setState({ name: "IsConnecting", value: false }));
  };

  async function connectapp(provider, connection_num) {
    const signer = provider.getSigner();
    const account = await provider.getSigner().getAddress();
    const chainId = await provider.getNetwork();
    if (chainId.chainId != "25") {
      console.log(chainId.chainId);
      toast.info(
        "Bank of Cronos is not supported on this network. Please connect to Cronos Mainnet"
      );
    }

    console.log("Starting connnect app balances");

    await retry(
      10,
      connectapp_balances,
      provider,
      connection_num,
      signer,
      account
    );

    console.log("Starting connnect app staking");

    await retry(
      10,
      connectapp_staking,
      provider,
      connection_num,
      signer,
      account
    );

    console.log("Starting connnect app cronaswap");
    await retry(
      10,
      connectapp_cronaswap,
      provider,
      connection_num,
      signer,
      account
    );

    console.log("Starting connnect app usdcbond");
    await retry(
      10,
      connectapp_usdcbond,
      provider,
      connection_num,
      signer,
      account
    );

    console.log("Starting connnect app lpbond");
    await retry(
      10,
      connectapp_lpbond,
      provider,
      connection_num,
      signer,
      account
    );

    console.log("Starting connnect app loans");
    await retry(
      10,
      connectapp_loans,
      provider,
      connection_num,
      signer,
      account
    );

    console.log("Finishing up...");

    dispatch(
      setState({
        name: "address",
        value: "Connecting..",
      })
    );
    dispatch(
      setState({
        name: "address",
        value: "Connecting...",
      })
    );
    dispatch(
      setState({
        name: "address",
        value:
          account.substring(0, 4) +
          "..." +
          account.substring(account.length - 4, account.length),
      })
    );

    localStorage.setItem(
      "address",
      account.substring(0, 4) +
        "..." +
        account.substring(account.length - 4, account.length)
    );
    dispatch(setState({ name: "connecterror", value: "" }));
    dispatch(setState({ name: "connecterror", value: "" }));
    dispatch(setState({ name: "connection", value: connection_num }));
    localStorage.setItem("connecterror", "");
    localStorage.setItem("status", status);
    localStorage.setItem("connection", connection_num);
    localStorage.setItem("stakeamount", 0.0);
    localStorage.setItem("unstakeamount", 0.0);
  }

  async function connectapp_balances(
    provider,
    connection_num,
    signer,
    account
  ) {
    //boc -> boc balances
    const boc = new ethers.Contract(BOCAddress, BOC.abi, signer);
    const usdc = new ethers.Contract(USDCAddress, USDC.abi, signer);
    const cusd = new ethers.Contract(CUSDAddress, Cusd.abi, signer);
    const wcro = new ethers.Contract(WCROAddress, WCRO.abi, signer);
    const weth = new ethers.Contract(WETHAddress, WETH.abi, signer);
    const wbtc = new ethers.Contract(WBTCAddress, WBTC.abi, signer);
    const sBOC = new ethers.Contract(SBOCAddress, SBOC.abi, signer);
    let bocbalance;
    let totsupply;

    let usdcbalance;
    let cusdbalance;
    let wcrobalance;
    let crobalance;
    let wethbalance;
    let wbtcbalance;
    let treasury_bal;

    let indext;
    let sbocbalance;
    let circ_supply;

    let promises = [
      boc.balanceOf(account),
      boc.totalSupply(),
      usdc.balanceOf(account),
      usdc.balanceOf(TreasuryAddress),
      ethers.BigNumber.from(await sBOC.index()),
      sBOC.balanceOf(account),
      sBOC.circulatingSupply(),
      cusd.balanceOf(account),
      wcro.balanceOf(account),
      weth.balanceOf(account),
      wbtc.balanceOf(account),
      provider.getBalance(account),
    ];

    Promise.all(promises).then((results) => {
      // Assign the results of the contract reads to the variables defined outside the callback
      [
        bocbalance,
        totsupply,
        usdcbalance,
        treasury_bal,
        indext,
        sbocbalance,
        circ_supply,
        cusdbalance,
        wcrobalance,
        wethbalance,
        wbtcbalance,
        crobalance,
      ] = results;

      dispatch(setState({ name: "usdcbalance", value: usdcbalance / 1000000 }));
      dispatch(setState({ name: "usdcbalance", value: usdcbalance / 1000000 }));
      dispatch(
        setState({ name: "bocbalance", value: bocbalance / 1000000000 })
      );
      dispatch(
        setState({ name: "sbocbalance", value: sbocbalance / 1000000000 })
      );
      // setbocbalance(bocbalance / 1000000000);
      // setsbocbalance(sbocbalance / 1000000000);
      dispatch(
        setState({
          name: "cusdbalance",
          value: cusdbalance / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "wcrobalance",
          value: wcrobalance / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "crobalance",
          value: crobalance / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "wethbalance",
          value: wethbalance / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "wbtcbalance",
          value: wbtcbalance / 1000000000000000000,
        })
      );
      // setwcrobalance(wcrobalance / 1000000000000000000);
      // setcrobalance(crobalance / 1000000000000000000);
      // setwethbalance(wethbalance / 1000000000000000000);
      // setwbtcbalance(wbtcbalance / 1000000000000000000);
      dispatch(
        setState({ name: "treasurybalance", value: treasury_bal / 1000000 })
      );
      dispatch(setState({ name: "treasurybalance", value: null }));
      dispatch(
        setState({ name: "circsupply", value: circ_supply / 1000000000 })
      );
      dispatch(setState({ name: "index", value: indext / 1000000000 }));
      dispatch(
        setState({ name: "totalsupply", value: totsupply / 1000000000 })
      );
      localStorage.setItem("address", account);
      localStorage.setItem("usdcbalance", usdcbalance / 1000000);
      localStorage.setItem("cusdbalance", cusdbalance / 1000000000000000000);
      localStorage.setItem("wcrobalance", wcrobalance / 1000000000000000000);
      localStorage.setItem("crobalance", crobalance / 1000000000000000000);
      localStorage.setItem("wethbalance", wethbalance / 1000000000000000000);
      localStorage.setItem("wbtcbalance", wbtcbalance / 1000000000000000000);
      localStorage.setItem("bocbalance", bocbalance / 1000000000);
      localStorage.setItem("sbocbalance", sbocbalance / 1000000000);
      localStorage.setItem("treasurybalance", treasury_bal / 1000000);
      localStorage.setItem("circsupply", circ_supply / 1000000000);
      localStorage.setItem("index", indext / 1000000000);
      localStorage.setItem("totalsupply", totsupply / 1000000000);
    });
  }

  async function connectapp_lpbond(provider, connection_num, signer, account) {
    //lpbond
    let lpbond = new ethers.Contract(BOCLPBondAddress, USDCBond.abi, signer);

    let block;
    let lppayout;
    let lpbondprice;
    let lpbondprice2;
    let bocmarketprice;
    let lpbondprice_real;
    let lpbondadjustment;
    let lpbondterms;
    let lpmaxPayout;
    let lpcurrentDebt;
    let lpdebtRatio;
    let lpautostake;
    let lpbondinfo;
    let lppercentVestedFor;
    let lppayoutfor;

    const promises = [
      provider.getBlockNumber(),
      lpbond.payoutFor(64),
      lpbond.bondPrice(),
      localStorage.getItem("bocprice"),
      localStorage.getItem("cusdbocprice"),
      lpbond.adjustment(),
      lpbond.terms(),
      lpbond.maxPayout(),
      lpbond.currentDebt(),
      lpbond.debtRatio(),
      lpbond.staking(),
      lpbond.bondInfo(account),
      lpbond.percentVestedFor(account),
      lpbond.payoutFor("10000000000"),
    ];

    Promise.all(promises).then((results) => {
      // Assign the results of the contract reads to the variables defined outside the callback
      [
        block,
        lppayout,
        lpbondprice2,
        bocmarketprice,
        lpbondadjustment,
        lpbondterms,
        lpmaxPayout,
        lpcurrentDebt,
        lpdebtRatio,
        lpautostake,
        lpbondinfo,
        lppercentVestedFor,
        lppayoutfor,
      ] = results;

      lpbondprice = ethers.BigNumber.from(lpbondprice2);
      lpbondprice_real = lpbondprice / (bocmarketprice * 6.426354816);

      let lptimeleftbond;
      lptimeleftbond =
        Number(lpbondinfo["lastBlock"]) + Number(lpbondinfo["vesting"]) - block;

      if (lptimeleftbond < 0) {
        lptimeleftbond = 0;
        lppercentVestedFor = 10000;
      }

      dispatch(
        setState({ name: "lpbondbocprice", value: 1 / (lppayout / 1000) })
      );
      dispatch(
        setState({ name: "lpbocmaxbond", value: lpmaxPayout / 1000000000 })
      );
      dispatch(setState({ name: "lpbondtime", value: lptimeleftbond / 600 }));
      dispatch(
        setState({
          name: "lpbondpurchased",
          value: lpbondinfo["payout"] / 1000000000,
        })
      );
      dispatch(
        setState({
          name: "lpbondvested",
          value:
            ((lpbondinfo["payout"] / 1000000000) * lppercentVestedFor) / 10000,
        })
      );
      localStorage.setItem("lpbondamount", lpbondamount);
      localStorage.setItem("lpbocbondprice", 1 / (lppayout / 1000));
      localStorage.setItem("lpbocmaxbond", lpmaxPayout / 1000000000);
      localStorage.setItem("lpbondtime", lptimeleftbond / 600);
      localStorage.setItem(
        "lpbondpurchased",
        lpbondinfo["payout"] / 1000000000
      );
      localStorage.setItem(
        "lpbondvested",
        ((lpbondinfo["payout"] / 1000000000) * lppercentVestedFor) / 10000
      );
      localStorage.setItem("lpbondstatus", lpbondstatus);
    });
  }

  async function connectapp_usdcbond(
    provider,
    connection_num,
    signer,
    account
  ) {
    //usdcbond
    const usdcbond = new ethers.Contract(USDCBondAddress, USDCBond.abi, signer);

    let bondprice;
    let bondprice2;
    let bondadjustment;
    let bondterms;
    let block;
    let maxPayout;
    let currentDebt;
    let debtRatio;
    let autostake;
    let bondinfo;
    let percentVestedFor;
    let payoutfor;

    const promises = [
      usdcbond.bondPriceInUSD(),
      usdcbond.adjustment(),
      usdcbond.adjustment(),
      usdcbond.terms(),
      provider.getBlockNumber(),
      usdcbond.maxPayout(),
      usdcbond.currentDebt(),
      usdcbond.debtRatio(),
      usdcbond.staking(),
      usdcbond.bondInfo(account),
      usdcbond.percentVestedFor(account),
      usdcbond.payoutFor("10000000000"),
    ];

    Promise.all(promises).then((results) => {
      // Assign the results of the contract reads to the variables defined outside the callback
      [
        bondprice2,
        bondadjustment,
        bondterms,
        block,
        maxPayout,
        currentDebt,
        debtRatio,
        autostake,
        bondinfo,
        percentVestedFor,
        payoutfor,
      ] = results;

      bondprice = ethers.BigNumber.from(bondprice2);

      let timeleftbond;
      timeleftbond =
        Number(bondinfo["lastBlock"]) + Number(bondinfo["vesting"]) - block;

      if (timeleftbond < 0) {
        timeleftbond = 0;
      }

      dispatch(
        setState({
          name: "bondbocprice",
          value: bondprice.toNumber() / 1000000,
        })
      );
      dispatch(setState({ name: "bocmaxbond", value: maxPayout / 1000000000 }));
      dispatch(setState({ name: "bondtime", value: timeleftbond / 600 }));
      dispatch(
        setState({
          name: "bondpurchased",
          value: bondinfo["payout"] / 1000000000,
        })
      );
      dispatch(
        setState({
          name: "bondvested",
          value: ((bondinfo["payout"] / 1000000000) * percentVestedFor) / 10000,
        })
      );

      localStorage.setItem("bocbondprice", bondprice.toNumber() / 1000000);
      localStorage.setItem("bocmaxbond", maxPayout / 1000000000);
      localStorage.setItem("bondtime", timeleftbond / 600);
      localStorage.setItem("bondpurchased", bondinfo["payout"] / 1000000000);
      localStorage.setItem(
        "bondvested",
        ((bondinfo["payout"] / 1000000000) * percentVestedFor) / 10000
      );
      localStorage.setItem("bondstatus", bondstatus);
      localStorage.setItem("bondamount", bondamount);
    });
  }

  async function connectapp_staking(provider, connection_num, signer, account) {
    //boc staking
    const staking = new ethers.Contract(StakingAddress, Staking.abi, signer);

    let index;
    let bonus;
    let epoch;
    let block;
    let eblock;

    let promises = [
      staking.index(),
      staking.totalBonus(),
      staking.epoch(),
      provider.getBlockNumber(),
    ];

    Promise.all(promises).then((results) => {
      // Assign the results of the contract reads to the variables defined outside the callback
      [index, bonus, epoch, block] = results;

      eblock = epoch["endBlock"];
      let timerebase;
      timerebase = ((eblock - block) * 6) / 3600;
      console.log("block is: " + block);
      console.log("eblock is: " + eblock);
      console.log("timerebase is: " + timerebase);
      if (timerebase < 0) {
        timerebase = ((4800 - (block - eblock)) * 6) / 3600;
      }
      console.log("timerebase is: " + timerebase);
      if (timerebase < 0) {
        timerebase = ((9600 - (block - eblock)) * 6) / 3600;
      }
      console.log("timerebase is: " + timerebase);

      dispatch(
        setState({ name: "reward", value: epoch["distribute"] / 1000000000 })
      );
      dispatch(setState({ name: "rebasetime", value: timerebase }));
      localStorage.setItem("reward", epoch["distribute"] / 1000000000);
      localStorage.setItem("rebasetime", timerebase);
    });
  }

  async function connectapp_cronaswap(
    provider,
    connection_num,
    signer,
    account
  ) {
    //cronaswap lp balance -> boc usdc
    const cronaswaplp = new ethers.Contract(LPAddress, CronaswapLp.abi, signer);

    let lptokenbalance;
    let price;
    let totallp;
    let lptreasury_bal;

    let promises = [
      cronaswaplp.balanceOf(account),
      cronaswaplp.getReserves(),
      cronaswaplp.totalSupply(),
      cronaswaplp.balanceOf(TreasuryAddress),
    ];

    Promise.all(promises).then((results) => {
      // Assign the results of the contract reads to the variables defined outside the callback
      [lptokenbalance, price, totallp, lptreasury_bal] = results;

      const bocmarketprice = (price[0] * 1000) / price[1];
      const lpmarketprice = (totallp * 0.5) / (price[1] / 1000000000) / 1000000;
      console.log("Cronaswap current price is: " + price);

      // setlpbalance(lptokenbalance / 1000000);
      dispatch(
        setState({ name: "lpbalance", value: lptokenbalance / 1000000 })
      );
      dispatch(
        setState({ name: "bocprice", value: (price[0] * 1000) / price[1] })
      );
      dispatch(setState({ name: "lpbocprice", value: lpmarketprice }));
      dispatch(
        setState({ name: "lptreasurybalance", value: lptreasury_bal / 1000000 })
      );
      localStorage.setItem("lpbalance", lptokenbalance / 1000000);
      localStorage.setItem("bocprice", (price[0] * 1000) / price[1]);
      localStorage.setItem("lpbocprice", lpmarketprice);
      localStorage.setItem("lptreasurybalance", lptreasurybalance);
    });
  }

  async function connectapp_loans(provider, connection_num, signer, account) {
    //pricefeeds
    //user troves
    //user stability pools
    //protocol stats
    const ethPF = new ethers.Contract(
      ethPriceFeedAddress,
      PriceFeed.abi,
      signer
    );
    const croPF = new ethers.Contract(
      croPriceFeedAddress,
      PriceFeed.abi,
      signer
    );
    const btcPF = new ethers.Contract(
      btcPriceFeedAddress,
      PriceFeed.abi,
      signer
    );
    const TM = new ethers.Contract(
      troveManagerAddress,
      TroveManager.abi,
      signer
    );
    const TML = new ethers.Contract(
      troveManagerLiquidationsAddress,
      TroveManagerLiquidations.abi,
      signer
    );
    const TMR = new ethers.Contract(
      troveManagerRedemptionsAddress,
      TroveManagerRedemptions.abi,
      signer
    );
    const cusd = new ethers.Contract(CUSDAddress, Cusd.abi, signer);
    const SB = new ethers.Contract(
      stabilityPoolAddress,
      StabilityPool.abi,
      signer
    );
    const WL = new ethers.Contract(whitelistAddress, WhiteList.abi, signer);
    const BO = new ethers.Contract(
      borrowerOperationsAddress,
      BorrowOperations.abi,
      signer
    );
    const AP = new ethers.Contract(activePoolAddress, ActivePool.abi, signer);
    const wcro = new ethers.Contract(WCROAddress, WCRO.abi, signer);
    const weth = new ethers.Contract(WETHAddress, WETH.abi, signer);
    const wbtc = new ethers.Contract(WBTCAddress, WBTC.abi, signer);
    const cusdcronaswaplp = new ethers.Contract(
      CUSDLPAddress,
      CronaswapLp.abi,
      signer
    );

    // import PriceFeed from "./artifacts/loans/PriceFeed.sol/PriceFeed";
    // const ethPriceFeedAddress="0x4E9add5464c5FA00a6A858d7A4047e06886662Df";
    // const croPriceFeedAddress="0xc1A57Bee847451E0A10c509f3cbF23feA37Bb8B3";
    // const btcPriceFeedAddress="0x1644C7A87b823496dfEC30E33b0dE42acF8CF6c0";
    let croprice;
    let ethprice;
    let btcprice;
    let isrecoverymode;
    let entireSystemColl;
    let entireSystemDebt;
    let sbdeposits;
    let cusdsupply;
    let trovecount;
    let trovestate;
    let mincolratio;
    let recoverymodemincolratio;
    let croapproved;
    let ethapproved;
    let btcapproved;
    let cusdlpreserves;

    let promises = [
      ethPF.fetchPrice_v(),
      croPF.fetchPrice_v(),
      btcPF.fetchPrice_v(),
      BO.getEntireSystemDebt(),
      AP.getVCforTCRSystem(),
      SB.getTotalCUSDDeposits(),
      cusd.totalSupply(),
      TM.getTroveOwnersCount(),
      TM.getCurrentTroveState(account),
      TM.checkRecoveryMode(),
      TML.MCR(),
      TML.CCR(),
      wcro.allowance(account, borrowerOperationsAddress),
      weth.allowance(account, borrowerOperationsAddress),
      wbtc.allowance(account, borrowerOperationsAddress),
      cusdcronaswaplp.getReserves(),
    ];

    Promise.all(promises).then((results) => {
      // Assign the results of the contract reads to the variables defined outside the callback
      [
        ethprice,
        croprice,
        btcprice,
        entireSystemDebt,
        entireSystemColl,
        sbdeposits,
        cusdsupply,
        trovecount,
        trovestate,
        isrecoverymode,
        mincolratio,
        recoverymodemincolratio,
        croapproved,
        ethapproved,
        btcapproved,
        cusdlpreserves,
      ] = results;

      console.log("TESTING...");
      console.log(
        ethers.BigNumber.from(entireSystemColl[0]).toString() /
          1000000000000000000
      );
      console.log(
        ethers.BigNumber.from(entireSystemColl[1]).toString() /
          1000000000000000000
      );
      console.log(
        ethers.BigNumber.from(entireSystemDebt).toString() / 1000000000000000000
      );
      console.log(
        ethers.BigNumber.from(sbdeposits).toString() / 1000000000000000000
      );
      console.log(
        ethers.BigNumber.from(cusdsupply).toString() / 1000000000000000000
      );
      console.log(ethers.BigNumber.from(trovecount).toString());
      console.log(isrecoverymode);
      console.log(
        ethers.BigNumber.from(mincolratio).toString() / 10000000000000000
      );
      console.log(
        ethers.BigNumber.from(recoverymodemincolratio).toString() /
          10000000000000000
      );

      const trovestatecolcro =
        typeof trovestate[0][0] === "undefined" ? 0 : trovestate[0][0];
      const trovestatecolcroAmt =
        typeof trovestate[1][0] === "undefined" ? 0 : trovestate[1][0];
      const trovestatecoleth =
        typeof trovestate[0][1] === "undefined" ? 0 : trovestate[0][1];
      const trovestatecolethAmt =
        typeof trovestate[1][1] === "undefined" ? 0 : trovestate[1][1];
      const trovestatecolbtc =
        typeof trovestate[0][2] === "undefined" ? 0 : trovestate[0][2];
      const trovestatecolbtcAmt =
        typeof trovestate[1][2] === "undefined" ? 0 : trovestate[1][2];
      const trovestateDebt =
        typeof trovestate[2] === "undefined" ? 0 : trovestate[2];

      const recoverymode = isrecoverymode ? "Yes" : "No";
      const troveactive = typeof trovestate[0][0] === "undefined" ? 0 : 1;

      console.log("trove state: " + trovestatecolcro);
      console.log("trove state: " + trovestatecolcroAmt);
      console.log("trove state: " + trovestatecoleth);
      console.log("trove state: " + trovestatecolethAmt);
      console.log("trove state: " + trovestatecolbtc);
      console.log("trove state: " + trovestatecolbtcAmt);
      console.log("trove debt: " + trovestateDebt);
      console.log("trove state whole" + trovestate);

      console.log("DEBUG2: " + cusdlpreserves[0] + " and " + cusdlpreserves[1]);
      dispatch(
        setState({
          name: "cusdprice",
          value: cusdlpreserves[0] / (cusdlpreserves[1] * 1000000000000),
        })
      );
      dispatch(
        setState({
          name: "cropricefeed",
          value: croprice / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "ethpricefeed",
          value: ethprice / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "btcpricefeed",
          value: btcprice / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "protocoltvl",
          value:
            ethers.BigNumber.from(entireSystemColl[0]).toString() /
              1000000000000000000 +
            ethers.BigNumber.from(sbdeposits).toString() / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "protocoltrovecount",
          value: ethers.BigNumber.from(trovecount).toString(),
        })
      );
      dispatch(
        setState({
          name: "protocolcusdsupply",
          value:
            ethers.BigNumber.from(cusdsupply).toString() / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "protocoltcr",
          value:
            (100 * ethers.BigNumber.from(entireSystemColl[0]).toString()) /
            ethers.BigNumber.from(entireSystemDebt).toString(),
        })
      );
      dispatch(
        setState({
          name: "spdeposits",
          value:
            ethers.BigNumber.from(sbdeposits).toString() / 1000000000000000000,
        })
      );
      dispatch(setState({ name: "protocolisrecovery", value: recoverymode }));
      dispatch(
        setState({
          name: "protocolrecoverythreshold",
          value:
            ethers.BigNumber.from(recoverymodemincolratio).toString() /
            10000000000000000,
        })
      );

      dispatch(
        setState({
          name: "trovecrocol",
          value: trovestatecolcroAmt / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "troveethcol",
          value: trovestatecolethAmt / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "trovebtccol",
          value: trovestatecolbtcAmt / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "trovedebt",
          value: trovestateDebt / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "newtrovecrocol",
          value: trovestatecolcroAmt / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "newtroveethcol",
          value: trovestatecolethAmt / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "newtrovebtccol",
          value: trovestatecolbtcAmt / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "newtrovedebt",
          value: trovestateDebt / 1000000000000000000,
        })
      );
      dispatch(
        setState({ name: "protocolborrowfee", value: protocolborrowfee })
      );
      dispatch(setState({ name: "protocolSystemVC", value: protocolSystemVC }));
      dispatch(setState({ name: "protocolCROVC", value: protocolCROVC }));
      dispatch(setState({ name: "protocolBTCVC", value: protocolBTCVC }));
      dispatch(setState({ name: "protocolETHVC", value: protocolETHVC }));
      dispatch(
        setState({
          name: "OpenLoanCard",
          value: troveactive == 0 ? false : true,
        })
      );
      dispatch(setState({ name: "istroveactive", value: troveactive }));
      dispatch(
        setState({
          name: "trovecrocolapproved",
          value: croapproved / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "troveethcolapproved",
          value: ethapproved / 1000000000000000000,
        })
      );
      dispatch(
        setState({
          name: "trovebtccolapproved",
          value: btcapproved / 1000000000000000000,
        })
      );

      localStorage.setItem(
        "cusdprice",
        cusdlpreserves[0] / (cusdlpreserves[1] * 1000000000000)
      );
      localStorage.setItem("cropricefeed", croprice / 1000000000000000000);
      localStorage.setItem("ethpricefeed", ethprice / 1000000000000000000);
      localStorage.setItem("btcpricefeed", btcprice / 1000000000000000000);
      localStorage.setItem(
        "protocoltcr",
        (100 * ethers.BigNumber.from(entireSystemColl[0]).toString()) /
          ethers.BigNumber.from(entireSystemDebt).toString()
      );
      localStorage.setItem(
        "spdeposits",
        ethers.BigNumber.from(sbdeposits).toString() / 1000000000000000000
      );
      localStorage.setItem(
        "protocolcusdsupply",
        ethers.BigNumber.from(cusdsupply).toString() / 1000000000000000000
      );
      localStorage.setItem(
        "protocoltrovecount",
        ethers.BigNumber.from(trovecount).toString()
      );
      localStorage.setItem(
        "protocoltvl",
        ethers.BigNumber.from(entireSystemColl[0]).toString() /
          1000000000000000000 +
          ethers.BigNumber.from(sbdeposits).toString() / 1000000000000000000
      );
      localStorage.setItem("protocolisrecovery", recoverymode);
      localStorage.setItem(
        "protocolrecoverythreshold",
        ethers.BigNumber.from(recoverymodemincolratio).toString() /
          10000000000000000
      );
      localStorage.setItem(
        "trovecrocol",
        trovestatecolcroAmt / 1000000000000000000
      );
      localStorage.setItem(
        "troveethcol",
        trovestatecolethAmt / 1000000000000000000
      );
      localStorage.setItem(
        "trovebtccol",
        trovestatecolbtcAmt / 1000000000000000000
      );
      localStorage.setItem("trovedebt", trovestateDebt / 1000000000000000000);
      localStorage.setItem(
        "newtrovecrocol",
        trovestatecolcroAmt / 1000000000000000000
      );
      localStorage.setItem(
        "etnewtroveethcol",
        trovestatecolethAmt / 1000000000000000000
      );
      localStorage.setItem(
        "newtrovebtccol",
        trovestatecolbtcAmt / 1000000000000000000
      );
      localStorage.setItem(
        "newtrovedebt",
        trovestateDebt / 1000000000000000000
      );
      localStorage.setItem("OpenLoanCard", troveactive == 0 ? false : true);
      localStorage.setItem("istroveactive", troveactive);
      localStorage.setItem("trovecrocolapproved", trovestateDebt);
      localStorage.setItem("troveethcolapproved", trovestateDebt);
      localStorage.setItem("trovebtccolapproved", trovestateDebt);
      localStorage.setItem(
        "trovecrocolapproved",
        croapproved / 1000000000000000000
      );
      localStorage.setItem(
        "troveethcolapproved",
        ethapproved / 1000000000000000000
      );
      localStorage.setItem(
        "trovebtccolapproved",
        btcapproved / 1000000000000000000
      );
    });
  }

  async function connect_WC() {
    const providerwc = new WalletConnectProvider({
      rpc: {
        25: "https://evm-cronos.crypto.org/",
      },
      chainId: 25,
    });
    await providerwc.enable();
    const provider = new ethers.providers.Web3Provider(providerwc);
    dispatch(setState({ name: "connection", value: 2 }));
    return provider;
  }

  async function connect_Cro() {
    const connector = new DeFiWeb3Connector({
      supportedChainIds: [25],
      rpc: {
        1: "https://mainnet.infura.io/v3/INFURA_API_KEY",
        25: "https://cronos.crypto.org:8545", // cronos mainet
      },
      pollingInterval: 15000,
    });
    await connector.activate();
    const providerwc = await connector.getProvider();
    const provider = new ethers.providers.Web3Provider(providerwc);
    dispatch(setState({ name: "connection", value: 1 }));
    return provider;
  }

  async function connect_Metamask() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId != "0x19") {
        toast.info(
          "Bank of Cronos is not supported on this network. Please connect to Cronos Mainnet"
        );
        await window.ethereum.request(
          {
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x19" }],
          },
          (error) => {
            if (error) {
              // setaddress("Not Connected");

              dispatch(
                setState({
                  name: "address",
                  value: "Not Connected",
                })
              );

              throw new Error("Unsupported Network");
            } else {
              console.log("Network switched successfully");
            }
          }
        );
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      dispatch(setState({ name: "connection", value: 0 }));
      return provider;
    }
  }

  async function GetBalances_BOC_WC() {
    dispatch(setState({ name: "isConnecting", value: true }));
    try {
      dispatch(setState({ name: "open", value: false }));
      dispatch(setState({ name: "modalShow", value: false }));
      dispatch(setState({ name: "connectstep", value: "0" }));
      localStorage.setItem("connectstep", "0");
      localStorage.setItem("retries", 0.0);
      toast.loading("Connecting...");
      // setaddress("Connecting.");

      dispatch(
        setState({
          name: "address",
          value: "Connecting.",
        })
      );

      const provider = await connect_WC();
      dispatch(setState({ name: "connection", value: 2 }));
      await connectapp(provider, 2);
      dispatch(
        setState({
          name: "isConnected",
          value: true,
        })
      );
      localStorage.setItem("isConnected", true);
      toast.dismiss();
      toast.info("Connected!");
      dispatch(setState({ name: "isConnecting", value: false }));
    } catch (e) {
      console.log(e);
      toast.dismiss();
      toast.error("Defi Wallet Connect Failed");
      dispatch(setState({ name: "isConnecting", value: false }));
      // setIsConnected(false);
      dispatch(
        setState({
          name: "isConnected",
          value: false,
        })
      );
    }
  }

  async function GetBalances_BOC() {
    dispatch(setState({ name: "setIsConnecting", value: true }));
    try {
      if (typeof window.ethereum !== "undefined") {
        dispatch(setState({ name: "open", value: false }));
        dispatch(setState({ name: "modalShow", value: false }));
        dispatch(setState({ name: "connectstep", value: "0" }));
        localStorage.setItem("connectstep", "0");
        localStorage.setItem("retries", 0.0);
        toast.loading("Connecting...");
        // setaddress("Connecting.");
        dispatch(
          setState({
            name: "address",
            value: "Connecting.",
          })
        );
        const provider = await connect_Metamask();
        await connectapp(provider, 0);
        // setIsConnected(true);
        dispatch(
          setState({
            name: "isConnected",
            value: true,
          })
        );
        localStorage.setItem("isConnected", true);
        toast.dismiss();
        toast.info("Connected!");
        dispatch(setState({ name: "setIsConnecting", value: false }));
      }
    } catch (e) {
      console.log(e);
      toast.dismiss();
      toast.error("Connect Wallet Failed");
      dispatch(setState({ name: "setIsConnecting", value: false }));
      // setIsConnected(false);
      dispatch(
        setState({
          name: "isConnected",
          value: false,
        })
      );
    }
  }

  async function call_rebase_BOC(provider) {
    const signer = provider.getSigner();
    const account = await provider.getSigner().getAddress();
    const stakingHelper = new ethers.Contract(
      StakingHelperAddress,
      StakingHelper.abi,
      signer
    );
    const staking = new ethers.Contract(StakingAddress, Staking.abi, signer);
    const sBOC = new ethers.Contract(SBOCAddress, SBOC.abi, signer);
    const usdc = new ethers.Contract(USDCAddress, USDC.abi, signer);
    try {
      await staking.rebase();
      dispatch(
        setState({
          name: "setmintsuccess",
          value: "BOC Rebase Run successfully...",
        })
      );
    } catch (e) {
      //console.log(e);
      try {
        if (e.data.message.toString().includes("exceeds allowance")) {
          toast.info(
            "Staking Rebase Failed, Please Allow for BOC to be unstaked"
          );
        } else if (e.data.message.toString().includes("insufficient-balance")) {
          toast.info("Staking Rebase Failed, Insufficient BOC token balance");
        } else {
          toast.info(
            "Staking Rebase Failed, Please ensure BOC Balance is approved"
          );
        }
      } catch (e) {
        //console.log(e);
        toast.info("Staking Rebase Failed");
      }
    }
  }

  async function call_stake_BOC(provider) {
    const signer = provider.getSigner();
    const account = await provider.getSigner().getAddress();
    const stakingHelper = new ethers.Contract(
      StakingHelperAddress,
      StakingHelper.abi,
      signer
    );
    const staking = new ethers.Contract(StakingAddress, Staking.abi, signer);
    const sBOC = new ethers.Contract(SBOCAddress, SBOC.abi, signer);
    const usdc = new ethers.Contract(USDCAddress, USDC.abi, signer);
    try {
      if (stakeamount <= 0) {
        toast.info("BOC Staking Failed, BOC amount must be greater than 0");
        return;
      }
      //console.log("Trying to stake: " + stakeamount)
      const stakeamt = stakeamount * 1000000000;
      //console.log("Trying to stake: " + stakeamt)
      await stakingHelper.stake(stakeamt);
      //await sBOC.setIndex('1000');
      //await staking.rebase();
      dispatch(
        setState({
          name: "setmintsuccess",
          value: "BOC Staked successfully...",
        })
      );
    } catch (e) {
      //console.log(e);
      try {
        if (e.data.message.toString().includes("exceeds allowance")) {
          toast.info("Staking Failed, Please Allow for BOC to be unstaked");
        } else if (e.data.message.toString().includes("insufficient-balance")) {
          toast.info("Staking Failed, Insufficient BOC token balance");
        } else {
          toast.info("Staking Failed, Please ensure BOC Balance is approved");
        }
      } catch (e) {
        //console.log(e);
        toast.info("Staking Failed");
      }
    }
  }

  async function call_unstake_sBOC(provider) {
    const signer = provider.getSigner();
    const account = await provider.getSigner().getAddress();
    const stakingHelper = new ethers.Contract(
      StakingHelperAddress,
      StakingHelper.abi,
      signer
    );
    const staking = new ethers.Contract(StakingAddress, Staking.abi, signer);
    const sBOC = new ethers.Contract(SBOCAddress, SBOC.abi, signer);
    const usdc = new ethers.Contract(USDCAddress, USDC.abi, signer);
    try {
      if (stakeamount <= 0) {
        toast.info("sBOC Unstaking Failed, sBOC amount must be greater than 0");
        return;
      }
      //console.log("Trying to unstake stake: " + stakeamount)
      const unstakeamt = stakeamount * 1000000000;
      //console.log("Trying to unstake: " + unstakeamt)
      await staking.unstake(unstakeamt, false);
      //await sBOC.setIndex('1000');
      //await staking.rebase();
      toast.info("BOC unstaked successfully...");
    } catch (e) {
      //console.log(e);
      try {
        if (e.data.message.toString().includes("exceeds allowance")) {
          toast.info("Unstaking Failed, Please Allow for sBOC to be unstaked");
        } else if (e.data.message.toString().includes("insufficient-balance")) {
          toast.info("Unstaking Failed, Insufficient sBOC token balance");
        } else {
          toast.info(
            "Unstaking Failed, Please ensure sBOC Balance is approved"
          );
        }
      } catch (e) {
        //console.log(e);
        toast.info("Unstaking Failed, Please ensure sBOC Balance is approved");
      }
    }
  }

  async function call_approve_BOC(provider) {
    const signer = provider.getSigner();
    const account = await provider.getSigner().getAddress();
    const stakingHelper = new ethers.Contract(
      StakingHelperAddress,
      StakingHelper.abi,
      signer
    );
    const staking = new ethers.Contract(StakingAddress, Staking.abi, signer);
    const sBOC = new ethers.Contract(SBOCAddress, SBOC.abi, signer);
    const usdc = new ethers.Contract(USDCAddress, USDC.abi, signer);
    const boc = new ethers.Contract(BOCAddress, BOC.abi, signer);
    try {
      //**CHANGE** max approval
      // if (stakeamount <= 0) {
      //   toast.info("BOC Approval Failed, BOC amount must be greater than 0");
      //   return;
      // }
      //console.log("Trying to stake: " + stakeamount)
      const stakeamt = stakeamount * 1000000000;
      //console.log("Trying to stake: " + stakeamt)
      //***CHANGE*** - update to approve max amount
      await boc.approve(StakingHelperAddress, 999999000000000);
      //await sBOC.setIndex('1000');
      //await staking.rebase();
      toast.info("BOC Approved successfully...");
    } catch (e) {
      //console.log(e);
      try {
        if (e.data.message.toString().includes("exceeds allowance")) {
          toast.info("BOC Failed, Please Allow for BOC");
        } else if (e.data.message.toString().includes("insufficient-balance")) {
          toast.info("BOC Approval Failed, Insufficient sBOC token balance");
        } else {
          toast.info(
            "BOC Approval Failed, Please ensure BOC Balance is approved"
          );
        }
      } catch (e) {
        toast.info("BOC Approval Failed");
      }
    }
  }

  async function call_approve_sBOC(provider) {
    const signer = provider.getSigner();
    const account = await provider.getSigner().getAddress();
    const stakingHelper = new ethers.Contract(
      StakingHelperAddress,
      StakingHelper.abi,
      signer
    );
    const staking = new ethers.Contract(StakingAddress, Staking.abi, signer);
    const sBOC = new ethers.Contract(SBOCAddress, SBOC.abi, signer);
    const usdc = new ethers.Contract(USDCAddress, USDC.abi, signer);
    const boc = new ethers.Contract(BOCAddress, BOC.abi, signer);
    try {
      //**CHANGE** - max staking approval
      // if (stakeamount <= 0) {
      //   toast.info("sBOC Approval Failed, sBOC amount must be greater than 0");
      //   return;
      // }
      //console.log("Trying to approve unstake: " + stakeamount)
      const stakeamt = stakeamount * 1000000000;
      //console.log("Trying to approve unstake: " + stakeamt)
      // ***CHANGE*** - update to approve max amount
      await sBOC.approve(StakingAddress, 999999000000000);
      //await sBOC.setIndex('1000');
      //await staking.rebase();
      toast.info("sBOC Approved successfully...");
    } catch (e) {
      //console.log(e);
      try {
        if (e.data.message.toString().includes("exceeds allowance")) {
          toast.info("sBOC Approval Failed, Please Allow for sBOC");
        } else if (e.data.message.toString().includes("insufficient-balance")) {
          toast.info("sBOC Approval Failed, Insufficient sBOC token balance");
        } else {
          toast.info(
            "sBOC Approval Failed, Please ensure BOC Balance is approved"
          );
        }
      } catch (e) {
        toast.info("sBOC Approval Failed");
      }
    }
  }

  async function call_approve_usdcbond(provider) {
    const signer = provider.getSigner();
    const account = await provider.getSigner().getAddress();
    const stakingHelper = new ethers.Contract(
      StakingHelperAddress,
      StakingHelper.abi,
      signer
    );
    const staking = new ethers.Contract(StakingAddress, Staking.abi, signer);
    const sBOC = new ethers.Contract(SBOCAddress, SBOC.abi, signer);
    const usdc = new ethers.Contract(USDCAddress, USDC.abi, signer);
    const boc = new ethers.Contract(BOCAddress, BOC.abi, signer);
    const usdcbond = new ethers.Contract(USDCBondAddress, USDCBond.abi, signer);
    try {
      //console.log("Trying to approve USDC Bond : " + USDCBondAddress)
      await usdc.approve(USDCBondAddress, "1000000000000");
      //await sBOC.setIndex('1000');
      //await staking.rebase();
      toast.info("USDC Bond Approved successfully...");
    } catch (e) {
      //console.log(e);
      try {
        if (e.data.message.toString().includes("exceeds allowance")) {
          toast.info("USDC Bond Approval Failed, Please Allow for sBOC");
        } else if (e.data.message.toString().includes("insufficient-balance")) {
          toast.info(
            "USDC Bond Approval Failed, Insufficient sBOC token balance"
          );
        } else {
          toast.info(
            "USDC Bond Approval Failed, Please ensure BOC Balance is approved"
          );
        }
      } catch (e) {
        toast.info("USDC Bond Approval Failed");
      }
    }
  }

  async function call_buy_usdcbond(provider) {
    const signer = provider.getSigner();
    const account = await provider.getSigner().getAddress();
    const stakingHelper = new ethers.Contract(
      StakingHelperAddress,
      StakingHelper.abi,
      signer
    );
    const staking = new ethers.Contract(StakingAddress, Staking.abi, signer);
    const sBOC = new ethers.Contract(SBOCAddress, SBOC.abi, signer);
    const usdc = new ethers.Contract(USDCAddress, USDC.abi, signer);
    const boc = new ethers.Contract(BOCAddress, BOC.abi, signer);
    const usdcbond = new ethers.Contract(USDCBondAddress, USDCBond.abi, signer);
    try {
      //console.log("Trying to buy USDC Bond : " + USDCBondAddress)
      await usdcbond.deposit(
        bondamount * 1000000,
        bocbondprice * 1000000,
        account
      );
      //await sBOC.setIndex('1000');
      //await staking.rebase();
      toast.info("USDC Bond Purchased successfully...");
    } catch (e) {
      //console.log(e);
      try {
        if (e.data.message.toString().includes("exceeds allowance")) {
          toast.info(
            "USDC Bond Purchase Failed, Please Allow for USDC first before Purchasing"
          );
        } else if (e.data.message.toString().includes("insufficient-balance")) {
          toast.info(
            "USDC Bond Purchase Failed, Insufficient USDC Token balance"
          );
        } else if (e.data.message.toString().includes("Bond too small")) {
          toast.info(
            "USDC Bond Purchase Failed, Bond payout too small, please increase purchase"
          );
        } else {
          toast.info(
            "USDC Bond Purchase Failed, Please ensure USDC Balance is approved"
          );
        }
      } catch (e) {
        toast.info("USDC Bond Purchase Failed");
      }
    }
  }

  async function call_redeem_usdcbond(provider) {
    const signer = provider.getSigner();
    const account = await provider.getSigner().getAddress();
    const stakingHelper = new ethers.Contract(
      StakingHelperAddress,
      StakingHelper.abi,
      signer
    );
    const staking = new ethers.Contract(StakingAddress, Staking.abi, signer);
    const sBOC = new ethers.Contract(SBOCAddress, SBOC.abi, signer);
    const usdc = new ethers.Contract(USDCAddress, USDC.abi, signer);
    const boc = new ethers.Contract(BOCAddress, BOC.abi, signer);
    const usdcbond = new ethers.Contract(USDCBondAddress, USDCBond.abi, signer);
    try {
      //console.log("Trying to buy USDC Bond : " + USDCBondAddress)
      await usdcbond.redeem(account, false);

      //await usdcbond.setAdjustment(true, '9', '2000', '1');

      //await sBOC.setIndex('1000');
      //await staking.rebase();
      toast.info("USDC Bond Redeemed successfully...");
    } catch (e) {
      //console.log(e);
      try {
        if (e.data.message.toString().includes("exceeds allowance")) {
          toast.info("USDC Bond Redemption Failed.");
        } else if (e.data.message.toString().includes("insufficient-balance")) {
          toast.info("USDC Bond Redemption Failed, Insufficient Token balance");
        } else if (e.data.message.toString().includes("Bond too small")) {
          toast.info(
            "USDC Bond Redemption Failed, Bond payout too small, please increase purchase"
          );
        } else {
          toast.info("USDC Bond Redemption Failed.");
        }
      } catch (e) {
        toast.info("USDC Bond Redemption Failed");
      }
    }
  }

  async function call_approve_lpbond(provider) {
    try {
      const signer = provider.getSigner();
      const cronaswaplp = new ethers.Contract(
        LPAddress,
        CronaswapLp.abi,
        signer
      );
      const boc = new ethers.Contract(BOCAddress, BOC.abi, signer);
      const lpbond = new ethers.Contract(
        BOCLPBondAddress,
        USDCBond.abi,
        signer
      );

      //console.log("Trying to approve LP Bond : " + BOCLPBondAddress)
      await cronaswaplp.approve(BOCLPBondAddress, "1000000000000");
      //await sBOC.setIndex('1000');
      //await staking.rebase();
      toast.info("LP Bond Approved successfully...");
    } catch (e) {
      //console.log(e);
      try {
        if (e.data.message.toString().includes("exceeds allowance")) {
          toast.info("LP Bond Approval Failed");
        } else if (e.data.message.toString().includes("insufficient-balance")) {
          toast.info(
            "LP Bond Approval Failed, Insufficient sBOC token balance"
          );
        } else {
          toast.info(
            "LP Bond Approval Failed, Please ensure BOC Balance is approved"
          );
        }
      } catch (e) {
        toast.info("LP Bond Approval Failed");
      }
    }
  }

  async function call_buy_lpbond(provider) {
    const signer = provider.getSigner();
    const account = await provider.getSigner().getAddress();
    const lpbond = new ethers.Contract(BOCLPBondAddress, USDCBond.abi, signer);
    try {
      //console.log("Trying to buy LP Bond : " + BOCLPBondAddress)
      const lp_bond_price = await lpbond.bondPrice();
      await lpbond.deposit(lpbondamount * 1000000, lp_bond_price, account);
      //await sBOC.setIndex('1000');
      //await staking.rebase();
      toast.info("LP Bond Purchased successfully...");
    } catch (e) {
      //console.log(e);
      try {
        if (e.data.message.toString().includes("exceeds allowance")) {
          toast.info(
            "LP Bond Purchase Failed, Please Allow for LP first before Purchasing"
          );
        } else if (e.data.message.toString().includes("insufficient-balance")) {
          toast.info(
            "LP Bond Purchase Failed, Insufficient USDC Token balance"
          );
        } else if (e.data.message.toString().includes("Bond too small")) {
          toast.info(
            "LP Bond Purchase Failed, Bond payout too small, please increase purchase"
          );
        } else {
          toast.info(
            "LP Bond Purchase Failed, Please ensure USDC Balance is approved"
          );
        }
      } catch (e) {
        toast.info("LP Bond Purchase Failed");
      }
    }
  }

  async function call_redeem_lpbond(provider) {
    const signer = provider.getSigner();
    const account = await provider.getSigner().getAddress();
    const stakingHelper = new ethers.Contract(
      StakingHelperAddress,
      StakingHelper.abi,
      signer
    );
    const staking = new ethers.Contract(StakingAddress, Staking.abi, signer);
    const sBOC = new ethers.Contract(SBOCAddress, SBOC.abi, signer);
    const cronaswaplp = new ethers.Contract(LPAddress, CronaswapLp.abi, signer);
    const boc = new ethers.Contract(BOCAddress, BOC.abi, signer);
    const lpbond = new ethers.Contract(BOCLPBondAddress, USDCBond.abi, signer);
    try {
      //console.log("Trying to buy LP Bond : " + BOCLPBondAddress)
      await lpbond.redeem(account, false);

      //await usdcbond.setAdjustment(true, '9', '2000', '1');

      //await sBOC.setIndex('1000');
      //await staking.rebase();
      toast.info("LP Bond Redeemed successfully...");
    } catch (e) {
      //console.log(e);
      try {
        if (e.data.message.toString().includes("exceeds allowance")) {
          toast.info("LP Bond Redemption Failed.");
        } else if (e.data.message.toString().includes("insufficient-balance")) {
          toast.info("LP Bond Redemption Failed, Insufficient Token balance");
        } else if (e.data.message.toString().includes("Bond too small")) {
          toast.info(
            "LP Bond Redemption Failed, Bond payout too small, please increase purchase"
          );
        } else {
          toast.info("LP Bond Redemption Failed.");
        }
      } catch (e) {
        toast.info("LP Bond Redemption Failed");
      }
    }
  }

  async function rebase_BOC() {
    //console.log("Connection == " + connection)
    if (connection == "1") {
      const provider = await connect_Cro();
      await call_rebase_BOC(provider);
    } else if (connection == "2") {
      const provider = await connect_WC();
      await call_rebase_BOC(provider);
    } else {
      const provider = await connect_Metamask();
      await call_rebase_BOC(provider);
    }
  }

  async function stake_BOC() {
    //console.log("Connection == " + connection)
    if (connection == "1") {
      const provider = await connect_Cro();
      await call_stake_BOC(provider);
    } else if (connection == "2") {
      const provider = await connect_WC();
      await call_stake_BOC(provider);
    } else {
      const provider = await connect_Metamask();
      await call_stake_BOC(provider);
    }
  }

  async function unstake_BOC() {
    dispatch(setState({ name: "unstakeamount", value: stakeamount }));
    if (connection == "1") {
      const provider = await connect_Cro();
      await call_unstake_sBOC(provider);
    } else if (connection == "2") {
      const provider = await connect_WC();
      await call_unstake_sBOC(provider);
    } else {
      const provider = await connect_Metamask();
      await call_unstake_sBOC(provider);
    }
  }

  async function approve_stake_BOC() {
    if (connection == "1") {
      const provider = await connect_Cro();
      await call_approve_BOC(provider);
    } else if (connection == "2") {
      const provider = await connect_WC();
      await call_approve_BOC(provider);
    } else {
      const provider = await connect_Metamask();
      await call_approve_BOC(provider);
    }
  }

  async function approve_unstake_BOC() {
    if (connection == "1") {
      const provider = await connect_Cro();
      await call_approve_sBOC(provider);
    } else if (connection == "2") {
      const provider = await connect_WC();
      await call_approve_sBOC(provider);
    } else {
      const provider = await connect_Metamask();
      await call_approve_sBOC(provider);
    }
  }

  async function approve_usdcbond_BOC() {
    if (connection == "1") {
      const provider = await connect_Cro();
      await call_approve_usdcbond(provider);
    } else if (connection == "2") {
      const provider = await connect_WC();
      await call_approve_usdcbond(provider);
    } else {
      const provider = await connect_Metamask();
      await call_approve_usdcbond(provider);
    }
  }

  async function buy_usdcbond_BOC() {
    if (connection == "1") {
      const provider = await connect_Cro();
      await call_buy_usdcbond(provider);
    } else if (connection == "2") {
      const provider = await connect_WC();
      await call_buy_usdcbond(provider);
    } else {
      const provider = await connect_Metamask();
      await call_buy_usdcbond(provider);
    }
  }

  async function redeem_usdcbond_BOC() {
    if (connection == "1") {
      const provider = await connect_Cro();
      await call_redeem_usdcbond(provider);
    } else if (connection == "2") {
      const provider = await connect_WC();
      await call_redeem_usdcbond(provider);
    } else {
      const provider = await connect_Metamask();
      await call_redeem_usdcbond(provider);
    }
  }

  async function approve_lpbond_BOC() {
    if (connection == "1") {
      const provider = await connect_Cro();
      await call_approve_lpbond(provider);
    } else if (connection == "2") {
      const provider = await connect_WC();
      await call_approve_lpbond(provider);
    } else {
      const provider = await connect_Metamask();
      await call_approve_lpbond(provider);
    }
  }

  async function buy_lpbond_BOC() {
    if (connection == "1") {
      const provider = await connect_Cro();
      await call_buy_lpbond(provider);
    } else if (connection == "2") {
      const provider = await connect_WC();
      await call_buy_lpbond(provider);
    } else {
      const provider = await connect_Metamask();
      await call_buy_lpbond(provider);
    }
  }

  async function redeem_lpbond_BOC() {
    if (connection == "1") {
      const provider = await connect_Cro();
      await call_redeem_lpbond(provider);
    } else if (connection == "2") {
      const provider = await connect_WC();
      await call_redeem_lpbond(provider);
    } else {
      const provider = await connect_Metamask();
      await call_redeem_lpbond(provider);
    }
  }

  async function call_openLoan(
    provider,
    crocolchange,
    ethcolchange,
    btccolchange,
    cusdchange
  ) {
    const signer = provider.getSigner();
    const account = await provider.getSigner().getAddress();
    const BO = new ethers.Contract(
      borrowerOperationsAddress,
      BorrowOperations.abi,
      signer
    );
    try {
      const _collsIn = [];
      const _amountsIn = [];
      if (crocolchange > 0) {
        _collsIn.push(WCROAddress);
        _amountsIn.push((crocolchange * 1000000000000000000).toString());
      }
      if (ethcolchange > 0) {
        _collsIn.push(WETHAddress);
        _amountsIn.push((ethcolchange * 1000000000000000000).toString());
      }
      if (btccolchange > 0) {
        _collsIn.push(WBTCAddress);
        _amountsIn.push((btccolchange * 1000000000000000000).toString());
      }

      console.log(
        "BO.openTrove(" +
          _collsIn +
          "," +
          _amountsIn +
          "," +
          cusdchange * 1000000000000000000 +
          ")"
      );
      const tx = await BO.openTrove(
        "50000000000000000",
        (cusdchange * 1000000000000000000).toString(),
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        _collsIn,
        _amountsIn
      );

      const txReceipt = await tx.wait();
      console.log("Transaction Receipt:", txReceipt);
      await retry(10, connectapp_loans, provider, connection, signer, account);
      toast.info(
        "Loan Opened Successfully: <a href='https://cronoscan.com/tx/" +
          tx.hash +
          "'>View on Cronoscan</a>"
      );
    } catch (e) {
      console.log(e);
      try {
        if (e.data.message.toString().includes("insufficient-balance")) {
          toast.info("Loan opening Failed, Insufficient Token balance");
        } else if (
          e.data.message.toString().includes("insufficient-approval")
        ) {
          toast.info(
            "Loan opening Failed, Approve required for tokens to be used by BOC Loans Borrower Operations Contract"
          );
        } else {
          toast.info("Loan opening Failed.");
        }
      } catch (e) {
        toast.info("Loan opening Failed");
      }
    }
  }

  async function call_adjustloan(
    provider,
    crocolchange,
    ethcolchange,
    btccolchange,
    cusdchange
  ) {
    const signer = provider.getSigner();
    const account = await provider.getSigner().getAddress();
    const BO = new ethers.Contract(
      borrowerOperationsAddress,
      BorrowOperations.abi,
      signer
    );
    try {
      //console.log("Trying to adjust loan: " + BOCLPBondAddress)
      const _isDebtIncrease = cusdchange > 0 ? true : false;
      cusdchange = cusdchange < 0 ? -1 * cusdchange : cusdchange;
      const _collsIn = [];
      const _amountsIn = [];
      const _collsOut = [];
      const _amountsOut = [];
      if (crocolchange < 0) {
        _collsOut.push(WCROAddress);
        _amountsOut.push((-crocolchange * 1000000000000000000).toString());
      } else if (crocolchange > 0) {
        _collsIn.push(WCROAddress);
        _amountsIn.push((crocolchange * 1000000000000000000).toString());
      }
      if (ethcolchange < 0) {
        _collsOut.push(WETHAddress);
        _amountsOut.push((-ethcolchange * 1000000000000000000).toString());
      } else if (ethcolchange > 0) {
        _collsIn.push(WETHAddress);
        _amountsIn.push((ethcolchange * 1000000000000000000).toString());
      }
      if (btccolchange < 0) {
        _collsOut.push(WBTCAddress);
        _amountsOut.push((-btccolchange * 1000000000000000000).toString());
      } else if (btccolchange > 0) {
        _collsIn.push(WBTCAddress);
        _amountsIn.push((btccolchange * 1000000000000000000).toString());
      }

      console.log(
        "BO.adjustTrove(" +
          _collsIn +
          "," +
          _amountsIn +
          "," +
          _collsOut +
          "," +
          _amountsOut +
          "," +
          cusdchange * 1000000000000000000
      );
      const tx = await BO.adjustTrove(
        _collsIn,
        _amountsIn,
        _collsOut,
        _amountsOut,
        (cusdchange * 1000000000000000000).toString(),
        _isDebtIncrease,
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        "1000000000000000000"
      );

      const txReceipt = await tx.wait();
      console.log("Transaction Receipt:", txReceipt);

      //await usdcbond.setAdjustment(true, '9', '2000', '1');

      //await sBOC.setIndex('1000');
      //await staking.rebase();
      await retry(10, connectapp_loans, provider, connection, signer, account);
      toast.info(
        "Loan Adjusted Successfully: <a href='https://cronoscan.com/tx/" +
          tx.hash +
          "'>View on Cronoscan</a>"
      );
    } catch (e) {
      console.log(e);
      try {
        if (e.data.message.toString().includes("exceeds allowance")) {
          toast.info("Loan Adjustment Failed.");
        } else if (e.data.message.toString().includes("insufficient-balance")) {
          toast.info("Loan Adjustment Failed, Insufficient Token balance");
        } else if (
          e.data.message.toString().includes("insufficient-approval")
        ) {
          toast.info(
            "Loan Adjustment Failed, Approve required for tokens to be used by BOC Loans Borrower Operations Contract"
          );
        } else {
          toast.info("Loan Adjustment Failed.");
        }
      } catch (e) {
        toast.info("Loan Adjustment Failed");
      }
    }
  }

  async function adjustloan(
    crocolchange,
    ethcolchange,
    btccolchange,
    cusdchange
  ) {
    if (connection == "1") {
      const provider = await connect_Cro();
      await call_adjustloan(
        provider,
        crocolchange,
        ethcolchange,
        btccolchange,
        cusdchange
      );
    } else if (connection == "2") {
      const provider = await connect_WC();
      await call_adjustloan(
        provider,
        crocolchange,
        ethcolchange,
        btccolchange,
        cusdchange
      );
    } else {
      const provider = await connect_Metamask();
      await call_adjustloan(
        provider,
        crocolchange,
        ethcolchange,
        btccolchange,
        cusdchange
      );
    }
  }

  async function call_approve_wcro_bo(provider, amount) {
    try {
      const signer = provider.getSigner();
      const wcro = new ethers.Contract(WCROAddress, WCRO.abi, signer);
      console.log(
        borrowerOperationsAddress + " amount: " + amount * 1000000000000000000
      );
      await wcro.approve(
        borrowerOperationsAddress,
        (amount * 1000000000000000000).toString()
      );
      toast.info("WCRO Approval successfully...");
    } catch (e) {
      console.log(e);
      try {
        if (e.data.message.toString().includes("exceeds allowance")) {
          toast.info("WCRO Approval Failed");
        } else if (e.data.message.toString().includes("insufficient-balance")) {
          toast.info("WCRO Approval Failed, Insufficient token balance");
        } else {
          toast.info("WCRO Approval Failed");
        }
      } catch (e) {
        toast.info("WCRO Approval Failed");
      }
    }
  }

  async function approve_wcro_BO(amount) {
    if (connection == "1") {
      const provider = await connect_Cro();
      await call_approve_wcro_bo(provider, amount);
    } else if (connection == "2") {
      const provider = await connect_WC();
      await call_approve_wcro_bo(provider, amount);
    } else {
      const provider = await connect_Metamask();
      await call_approve_wcro_bo(provider, amount);
    }
  }

  async function call_approve_weth_bo(provider, amount) {
    try {
      const signer = provider.getSigner();
      const weth = new ethers.Contract(WETHAddress, WETH.abi, signer);
      await weth.approve(
        borrowerOperationsAddress,
        (amount * 1000000000000000000).toString()
      );
      toast.info("WETH Approval successfully...");
    } catch (e) {
      //console.log(e);
      try {
        if (e.data.message.toString().includes("exceeds allowance")) {
          toast.info("WETH Approval Failed");
        } else if (e.data.message.toString().includes("insufficient-balance")) {
          toast.info("WETH Approval Failed, Insufficient token balance");
        } else {
          toast.info("WETH Approval Failed");
        }
      } catch (e) {
        toast.info("WETH Approval Failed");
      }
    }
  }

  async function approve_weth_BO(amount) {
    if (connection == "1") {
      const provider = await connect_Cro();
      await call_approve_weth_bo(provider, amount);
    } else if (connection == "2") {
      const provider = await connect_WC();
      await call_approve_weth_bo(provider, amount);
    } else {
      const provider = await connect_Metamask();
      await call_approve_weth_bo(provider, amount);
    }
  }

  async function call_approve_wbtc_bo(provider, amount) {
    try {
      const signer = provider.getSigner();
      const wbtc = new ethers.Contract(WBTCAddress, WBTC.abi, signer);
      await wbtc.approve(
        borrowerOperationsAddress,
        (amount * 1000000000000000000).toString()
      );
      toast.info("WBTC Approval successfully...");
    } catch (e) {
      //console.log(e);
      try {
        if (e.data.message.toString().includes("exceeds allowance")) {
          toast.info("WBTC Approval Failed");
        } else if (e.data.message.toString().includes("insufficient-balance")) {
          toast.info("WBTC Approval Failed, Insufficient token balance");
        } else {
          toast.info("WBTC Approval Failed");
        }
      } catch (e) {
        toast.info("WBTC Approval Failed");
      }
    }
  }

  async function approve_wbtc_BO(amount) {
    if (connection == "1") {
      const provider = await connect_Cro();
      await call_approve_wbtc_bo(provider, amount);
    } else if (connection == "2") {
      const provider = await connect_WC();
      await call_approve_wbtc_bo(provider, amount);
    } else {
      const provider = await connect_Metamask();
      await call_approve_wbtc_bo(provider, amount);
    }
  }

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 900) {
        dispatch(setState({ name: "windowWidth", value: window.innerWidth }));
      } else {
        dispatch(setState({ name: "windowWidth", value: window.innerWidth }));
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [windowWidth]);

  useEffect(() => {
    const isConnected = localStorage.getItem("isConnected");
    // setIsConnected(isConnected);
    dispatch(
      setState({
        name: "isConnected",
        value: isConnected,
      })
    );
    setTimeout(() => {
      dispatch(setState({ name: "loader", value: false }));
    }, 1000);
  }, [isConnected, loader]);

  const toggleSideBar = () => {
    dispatch(setState({ name: "openSideBar", value: false }));
  };

  function handleScroll(event) {
    if (event.target.scrollTop > 0) {
      dispatch(setState({ name: "isScrolling", value: true }));
    } else {
      dispatch(setState({ name: "isScrolling", value: false }));
    }
  }

  return (
    <div>
      <Router>
        <div
          style={{
            overflow: "scroll",
          }}
          className="sidebar_layout"
          data-theme={theme}
        >
          <SideBar
            toggleSideBar={toggleSideBar}
            openSideBar={openSideBar}
            windowWidth={windowWidth}
            theme={theme}
            isConnected={isConnected}
            address={address}
            currentPath={currentPath}
            showBond={showBond}
            isConnecting={isConnecting}
            bocbondprice={bocbondprice}
            bocprice={bocprice}
            cusdprice={cusdprice}
            lpbocbondprice={lpbocbondprice}
            lpbocprice={lpbocprice}
          />

          <TopBar
            switchTheme={switchTheme}
            address={address}
            isConnected={isConnected}
            isScrolling={isScrolling}
            theme={theme}
          />

          <div onScroll={handleScroll} className="main_container">
            <Switch>
              {/* <Route exact path="/">
                <Dashboard
                  isConnecting={isConnecting}
                  totalsupply={totalsupply}
                  bocprice={bocprice}
                  cusdprice={cusdprice}
                  circsupply={circsupply}
                  index={index}
                />
              </Route> */}
              <Route path="/bond">
                <Bond
                  isConnected={isConnected}
                  isConnecting={isConnecting}
                  treasurybalance={treasurybalance}
                  bocprice={bocprice}
                  cusdprice={cusdprice}
                  bocbondprice={bocbondprice}
                  lpbocbondprice={lpbocbondprice}
                  lpbocprice={lpbocprice}
                  modalShowBond={modalShowBond}
                  theme={theme}
                />
              </Route>
              <Route exact path="/">
                <Loan
                  windowWidth={windowWidth}
                  crobalance={crobalance}
                  wcrobalance={wcrobalance}
                  WCROAddress={WCROAddress}
                  WBTCAddress={WBTCAddress}
                  wethbalance={wethbalance}
                  bocbalance={bocbalance}
                  bocprice={bocprice}
                  cusdprice={cusdprice}
                  cusdbalance={cusdbalance}
                  CUSDAddress={CUSDAddress}
                  BOCAddress={BOCAddress}
                  openLoanCard={openLoanCard}
                  openPoll={openPoll}
                  newtrovebtccol={newtrovebtccol}
                  trovebtccolapproved={trovebtccolapproved}
                  newtrovedebt={newtrovedebt}
                  newtrovecrocol={newtrovecrocol}
                  protocolrecoverythreshold={protocolrecoverythreshold}
                  protocoltcr={protocoltcr}
                  protocolisrecovery={protocolisrecovery}
                  protocolcusdsupply={protocolcusdsupply}
                  spdeposits={spdeposits}
                  protocoltvl={protocoltvl}
                  protocoltrovecount={protocoltrovecount}
                  ethpricefeed={ethpricefeed}
                  btcpricefeed={btcpricefeed}
                  showStatboard={showStatboard}
                  trovedebt={trovedebt}
                  trovebtccol={trovebtccol}
                  troveethcol={troveethcol}
                  trovecrocolapproved={trovecrocolapproved}
                  trovecrocol={trovecrocol}
                  approve_wcro_BO={approve_wcro_BO}
                  newtroveethcol={newtroveethcol}
                  troveethcolapproved={troveethcolapproved}
                  approve_weth_BO={approve_weth_BO}
                  approve_wbtc_BO={approve_wbtc_BO}
                  cropricefeed={cropricefeed}
                  istroveactive={istroveactive}
                  borrowerOperationsAddress={borrowerOperationsAddress}
                  adjustloan={adjustloan}
                  wbtcbalance={wbtcbalance}
                  WETHAddress={WETHAddress}
                  address={address}
                  connect_Metamask={connect_Metamask}
                  isConnected={isConnected}
                />
              </Route>
              <Route path="/stake">
                <Stake
                  isConnecting={isConnecting}
                  rebasetime={rebasetime}
                  rebase_BOC={rebase_BOC}
                  reward={reward}
                  circsupply={circsupply}
                  treasurybalance={treasurybalance}
                  index={index}
                  isConnected={isConnected}
                  isStake={isStake}
                  approve_stake_BOC={approve_stake_BOC}
                  approve_unstake_BOC={approve_unstake_BOC}
                  loader={loader}
                  stakeamount={stakeamount}
                  bocbalance={bocbalance}
                  sbocbalance={sbocbalance}
                  stake_BOC={stake_BOC}
                  unstake_BOC={unstake_BOC}
                  showTotal={showTotal}
                />
              </Route>
            </Switch>
          </div>

          <Drawer
            open={open}
            onClose={() => dispatch(setState({ name: "open", value: false }))}
          >
            <Drawer.Body>
              <div
                className={
                  theme === "dark"
                    ? "side_drawer dark position-relative h-100"
                    : "side_drawer light position-relative h-100"
                }
              >
                <div className="p-4 ">
                  <div className="d-flex align-items-center justify-content-between">
                    {isConnected ? (
                      <button
                        className="connect_wallet_btn"
                        onClick={() =>
                          dispatch(setState({ name: "open", value: true }))
                        }
                      >
                        <FaEthereum />
                        <span>{address}</span>
                      </button>
                    ) : (
                      <button
                        className="connect_wallet_btn"
                        onClick={() =>
                          dispatch(setState({ name: "modalShow", value: true }))
                        }
                      >
                        <AiOutlineWallet />
                        <span>Connect</span>
                      </button>
                    )}
                    <button
                      onClick={() =>
                        dispatch(setState({ name: "open", value: false }))
                      }
                      className="bg-transparent"
                    >
                      <AiOutlineClose />
                    </button>
                  </div>

                  <div className="my-3 p-2 rounded-1 d-flex  align-content-center drawer_tab">
                    <p className="p-2 px-3 m-0 bg-warning d-inline-block rounded-1">
                      Wallet
                    </p>
                  </div>
                  {isConnected ? (
                    <div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p>Balance</p>
                        <p>Today's Forecast</p>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h3>
                            {(Math.round(sbocbalance * 100) +
                              Math.round(bocbalance * 100)) /
                              100}{" "}
                            BOC
                          </h3>
                          <p>
                            ${" "}
                            {(Math.round(bocbalance * bocprice * 100) +
                              Math.round(sbocbalance * bocprice * 100)) /
                              100}{" "}
                            <FaExchangeAlt />
                          </p>
                        </div>
                        <div>
                          <h3>
                            +
                            {Math.round(
                              ((3 * reward * sbocbalance) / circsupply) * 100
                            ) / 100}{" "}
                            BOC
                          </h3>
                          <p style={{ textAlign: "right" }}>
                            +$
                            {Math.round(
                              ((bocprice * 3 * reward * sbocbalance) /
                                circsupply) *
                                100
                            ) / 100}{" "}
                            <FaExchangeAlt />
                          </p>
                        </div>
                      </div>

                      <br />
                      <br />
                      <p>My Wallet</p>
                      <div className="side_drawer_card d-flex align-items-center justify-content-between">
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={BOCLogo}
                              width="30px"
                              className=""
                              alt=""
                            />
                            <h5>BOC</h5>
                          </div>
                          <p className="p-0 m-0"></p>
                        </div>
                        <div>
                          <p className="p-0 m-0">
                            <b>
                              $ {Math.round(bocbalance * bocprice * 100) / 100}
                            </b>
                          </p>
                          <p className="p-0 m-0">
                            {Math.round(bocbalance * 100) / 100} BOC
                          </p>
                        </div>
                      </div>
                      <div className="side_drawer_card d-flex align-items-center justify-content-between">
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={BOCLogo}
                              width="30px"
                              className=""
                              alt=""
                            />
                            <h5>sBOC</h5>
                          </div>
                          <p className="p-0 m-0">
                            Stakes in {Math.round(rebasetime * 1000) / 1000} hrs
                          </p>
                        </div>
                        <div>
                          <p className="p-0 m-0">
                            <b>
                              $ {Math.round(sbocbalance * bocprice * 100) / 100}
                            </b>
                          </p>
                          <p className="p-0 m-0">
                            {Math.round(sbocbalance * 100) / 100} BOC
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center py-5">
                      Please Connect Your Wallet
                    </p>
                  )}
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>

                <div className="drawer_footer position-fixed bottom-0 shadow-sm">
                  {isConnected ? (
                    <button
                      className="light_blue_btn"
                      onClick={() => {
                        localStorage.removeItem("isConnected");
                        dispatch(
                          setState({
                            name: "isConnected",
                            value: false,
                          })
                        );
                        dispatch(
                          setState({ name: "openLoanCard", value: false })
                        );
                        const fun = async () => {
                          await getBaseInfo();
                        };
                        fun();
                        localStorage.setItem("OpenLoanCard", false);
                      }}
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      className="light_blue_btn"
                      onClick={() =>
                        dispatch(setState({ name: "modalShow", value: true }))
                      }
                    >
                      Connect Wallet
                    </button>
                  )}
                </div>
              </div>
            </Drawer.Body>
          </Drawer>

          {/* agreement modal */}
          <Modal
            show={showAgreementModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body className={theme === "dark" ? " dark " : " light "}>
              <div className="d-flex justify-content-center">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={theme === "dark" ? LogoLight : LogoDark}
                    width="200px"
                    className=""
                    alt=""
                  />
                </div>
              </div>
              <br />
              <div>
                <p
                  style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    textAlign: "justify",
                  }}
                  className="m-10"
                >
                  Please read our{" "}
                  <a
                    href={
                      "https://bank-of-cronos.gitbook.io/docs/terms-of-service/terms-of-service"
                    }
                  >
                    Terms of Service Agreement
                  </a>{" "}
                  which explains the terms and conditions by which you may
                  access and use the website and any services offer through it
                  that may be legally accessible to you. You must read this
                  agreement carefully and agree to it before proceeding. By
                  accessing or using the Interface, you signify that you have
                  read, understand, and agree to be bound by these terms of
                  service in its entirety. If you do not agree, you are not
                  authorized to access or use the website. Before borrowing,
                  staking, or liquidity providing you should fully review our
                  technical documentation to understand how the Yeti Finance
                  protocol works.
                </p>
              </div>
              <div
                style={{
                  marginTop: 30,
                }}
                className="d-flex justify-content-center"
              >
                <label>
                  <input
                    onClick={() =>
                      dispatch(
                        setState({
                          name: "isAgreeToTermsPolicy",
                          value: !isAgreeToTermsPolicy,
                        })
                      )
                    }
                    type="checkbox"
                    name="myCheckbox"
                  />
                  <span
                    style={{
                      paddingLeft: 10,
                      paddingRight: 30,
                      textAlign: "justify",
                    }}
                    className="m-10"
                  >
                    By checking this box, I have reviewed and understand the
                    terms of service - and agreed to the stated terms and
                    conditions.
                  </span>
                </label>
              </div>
              <div
                style={{ marginTop: 30 }}
                className="d-flex justify-content-center"
              >
                <button
                  disabled={isAgreeToTermsPolicy}
                  className="approve_btn"
                  onClick={() => {
                    dispatch(
                      setState({ name: "isAgreeToTermsPolicy", value: true })
                    );
                    dispatch(
                      setState({ name: "showAgreementModal", value: false })
                    );
                  }}
                >
                  Proceed
                </button>
              </div>
              <br />
            </Modal.Body>
          </Modal>

          <Modal
            show={bondModal2}
            onHide={() =>
              dispatch(setState({ name: "bondModal2", value: false }))
            }
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body className={theme === "dark" ? " dark " : " light "}>
              <div className="d-flex justify-content-between">
                <button
                  className="modal_header_btn"
                  onClick={() =>
                    dispatch(setState({ name: "bondModal2", value: false }))
                  }
                >
                  <AiOutlineClose />
                </button>
                <div className="d-flex align-items-center gap-2">
                  <img
                    src="https://bankofcronos.com/wp-content/uploads/2022/02/LPUSD.png"
                    width="40px"
                    className=""
                    alt=""
                  />
                  <h4>BOC/USDC LP</h4>
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
                    {Math.round(lpbocbondprice * 100) / 100} LP
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
                    {Math.round(lpbocprice * 100) / 100} LP
                  </p>
                </div>
              </div>
              <br />

              {isConnected ? (
                <div>
                  <div>
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
                  </div>
                  <br />
                  <div style={{ maxWidth: "500px", margin: "0 auto" }}>
                    <div className="d-flex gap-1 stake-input">
                      <input
                        type="number"
                        placeholder="0"
                        style={{ width: "100%" }}
                      />

                      <button className="max-btn">BOC</button>
                    </div>
                    <br />
                    <div className="d-flex justify-content-around gap-2">
                      <button className="form_btn" onClick={approve_lpbond_BOC}>
                        Approve
                      </button>
                      <button className="form_btn" onClick={buy_lpbond_BOC}>
                        Buy Bond
                      </button>
                      <button className="form_btn" onClick={redeem_lpbond_BOC}>
                        Redeem
                      </button>
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

              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <h6>Your balance</h6>
                  <h6>
                    {isConnected ? Math.round(lpbalance * 1000) / 1000 : "-"} LP
                  </h6>
                </div>
                <div className="d-flex justify-content-between align-items-center">
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
                <div className="d-flex justify-content-between align-items-center">
                  <h6>
                    Max you can buy <Popper />
                  </h6>
                  <h6>{Math.round(lpbocmaxbond * 1000) / 1000} BOC</h6>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <h6>
                    Discount <Popper />
                  </h6>
                  <h6 className="text-danger">
                    {Math.round(
                      (lpbocprice / lpbocbondprice - 1) * 100 * 1000
                    ) / 1000}{" "}
                    %
                  </h6>
                </div>
                <div style={{ maxWidth: "600px", margin: "auto" }}>
                  <p className="m-0 text-center">
                    Inverse bonds allows you to bond your BOC for treasury
                    assets. Vesting time is 0 and payouts are instant.
                  </p>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Modal
            show={modalShow}
            onHide={() =>
              dispatch(setState({ name: "modalShow", value: false }))
            }
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <div>
                <Row>
                  <Col sm="12" md="6">
                    <div
                      className="wallet_card"
                      onClick={() => {
                        GetBalances_BOC();
                      }}
                      type="button"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
                        alt=""
                        width="50px"
                      />
                      <p className="m-0 wallet_name">MetaMask</p>
                      <p className="m-0 wallet_description">
                        Connect to your MetaMask Wallet
                      </p>
                    </div>
                  </Col>
                  <Col sm="12" md="6">
                    <div
                      className="wallet_card"
                      onClick={() => {
                        GetBalances_BOC_WC();
                      }}
                      type="button"
                    >
                      <img
                        src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png"
                        alt=""
                        width="50px"
                      />
                      <p className="m-0 wallet_name">WalletConnect</p>
                      <p className="m-0 wallet_description">
                        Scan with WalletConnect to connect
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </Router>
    </div>
  );
}
