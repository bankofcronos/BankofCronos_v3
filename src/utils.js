import { ethers } from "ethers";

//Contract Addresses
export const BOCMultisigAddress = "0x1087234fe877721F30016ebeD5BEd061397C8851";
export const BOCAddress = "0xe5786DDFc4D6DcA0973D1c5b02987cBbac66ed87";
export const USDCAddress = "0xc21223249ca28397b4b6541dffaecc539bff0c59";
export const BOCNFTAddress = "0x256e4532d42542Fe36B6F1d1439e91F31d9c70BE";
export const BOCNFTLaunchPremierAddress =
  "0x256e4532d42542Fe36B6F1d1439e91F31d9c70BE";
export const BOCNFTLaunchExclusiveAddress =
  "0x256e4532d42542Fe36B6F1d1439e91F31d9c70BE";
export const LPAddress = "0xb08e10C936688Ca42Bf41F52EC96238EBCE681fc";
export const CUSDLPAddress = "0xdEed2b16e3155ece68A25Adc4565c2A2A84AF823";
export const TreasuryAddress = "0xBacF28BF21B374459C738289559EF89978D08102";
export const OlympusBondingCalculatorAddress =
  "0x4b6dC33D190482c38648c8F23776c8a89B00aEFC";
export const DistributorAddress = "0x4D499157a35b1CC8b0E32Adb5E90022CD61822Eb";
export const SBOCAddress = "0xA0bA07Cfe371b2E768148308d1cc49333aF292C4";
export const StakingAddress = "0x8119595311e651a6598065AaEC9A10175a69b5b2";
export const StakingWarmpupAddress =
  "0x3caC16a64553E67A7a79BD4ae61E77A263f7A990";
export const StakingHelperAddress =
  "0x34020fAD38a52b7590430528D3Bc23E40E11E204";
export const USDCBondAddress = "0x3a2AE8078B85CAEBBb3e1B7B2B988004a0ff56Ce";
export const CusdBondAddress = "0x501ACC6f7f774826C3cbEEf8E4c83b42c5f87E09";
export const pBOCBondAddress = "0xF93fB4CDB0e40dbF33d2cDbf11D9516f6aDd7e8e";
export const ExercisePOLYBondAddress =
  "0x15648eECAE24CEF67ACA1d6cA23c94fAc5d5a71F";
export const BOCBondingCalculatorAddress =
  "0xCC6c7CB4B040a4D13011607734A77F46e9d20dB4";
export const BOCLPBondAddress = "0x86fC2055b4A4563e6D9E0E2f37f77c073f08682f";
export const CronaswapFactoryAddress =
  "0x73A48f8f521EB31c55c0e1274dB0898dE599Cb11";
export const CronaswapRouterAddress =
  "0xcd7d16fB918511BF7269eC4f48d61D79Fb26f918";

//Loans Addresses
export const CUSDAddress = "0x26043Aaa4D982BeEd7750e2D424547F5D76951d4";
export const WETHAddress = "0xe44Fd7fCb2b1581822D0c862B68222998a0c299a";
export const WCROAddress = "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23";
export const WBTCAddress = "0x062E66477Faf219F25D27dCED647BF57C3107d52";
export const ethPriceFeedAddress = "0x4E9add5464c5FA00a6A858d7A4047e06886662Df";
export const croPriceFeedAddress = "0xc1A57Bee847451E0A10c509f3cbF23feA37Bb8B3";
export const btcPriceFeedAddress = "0x1644C7A87b823496dfEC30E33b0dE42acF8CF6c0";
export const sortedTrovesAddress = "0xf10C47D919A505dd8ee35d991219101a2cbe135B";
export const troveManagerAddress = "0xE4661C83835180f893e3B2b9cc6A086491Bf1334";
export const activePoolAddress = "0xa86Ba8b60Aa4d943D15FF2894964da4C2A8F1B03";
export const stabilityPoolAddress =
  "0x4C45674ECB19Cc44b509005F0222534f58e2948B";
export const gasPoolAddress = "0x021d543b153625Cd6Edef431349765F3315Cc73e";
export const defaultPoolAddress = "0xF25DB267A0A17b41f0a22469eb68Ab85C2358Dec";
export const collSurplusPoolAddress =
  "0xFFd27cB8285aBB0036ea11d6dAeC0818739E0eFe";
export const borrowerOperationsAddress =
  "0x7B0EBc72c3e49800b6483c9C98eA8bc46dD6F3de";
export const hintHelpersAddress = "0xDf8c129Ec77e05735217bca0E71eE7cf2D289259";
export const troveManagerLiquidationsAddress =
  "0xf910A76122dFFFA00f9650d57569D71378a27627";
export const troveManagerRedemptionsAddress =
  "0x449EF7aDD3A945DC37F566b2C5F81C463510edbF";
export const whitelistAddress = "0x01e937f2013746d330cc4dFEEE5C1D115Ee45d9b";
export const ethlinearpricecurveAddress =
  "0x38471a775f0d787e69843Db743c1A524346114cE";
export const crolinearpricecurveAddress =
  "0x284B9754ea998CdF397bAe8610b3040Cd2E97Faf";
export const btclinearpricecurveAddress =
  "0xbE687AcFa322D6d9132A9735138b913132fD774B";

// base provider
export const baseProvider = new ethers.providers.JsonRpcProvider(
  "https://evm.cronos.org/"
);
