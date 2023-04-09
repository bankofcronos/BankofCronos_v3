import React from "react";
import { Link } from "react-router-dom";
import Popper from "../popper";
import { useSelector } from "react-redux";
import { selectState } from "../../features/state/stateSlice";

const Dashboard = () => {
  const state = useSelector(selectState);
  const { isConnecting, totalsupply, bocprice, circsupply, index } = state;
  return (
    <>
      <div className="container">
        <div className="main_nav">
          <Link to=".">Overview</Link>
        </div>
        <div className="card_container">
          <div className="main_card">
            <div className="d-flex flex-column flex-md-row">
              <div className="card_box col-12 col-md-6">
                <p className="card_title">Market Cap</p>
                <h3 className="card_value">
                  {isConnecting ? (
                    <h5 className="placeholder-glow">
                      <span className="placeholder col-3"></span>
                    </h5>
                  ) : (
                    <h3 className="card_value">
                      $ {Math.round(totalsupply * bocprice * 100) / 100}
                    </h3>
                  )}
                </h3>

                <p className="card_title">Circulating Supply (total)</p>
                {isConnecting ? (
                  <h5 className="placeholder-glow">
                    <span className="placeholder col-3"></span>
                  </h5>
                ) : (
                  <h3 className="card_value">
                    {Math.round(circsupply * 100) / 100} /{" "}
                    {Math.round(totalsupply * 100) / 100}
                  </h3>
                )}
              </div>

              <div className="card_box col-12 col-md-6">
                <p className="card_title d-flex justify-content-center align-items-center gap-2">
                  BOC Price
                </p>
                <h3 className="card_value d-flex justify-content-center align-items-center gap-2">
                  {isConnecting ? (
                    <h5 className="placeholder-glow">
                      <span className="placeholder col-3"></span>
                    </h5>
                  ) : (
                    <h3 className="card_value">
                      $ {Math.round(bocprice * 100) / 100}
                    </h3>
                  )}
                </h3>
                <p className="card_title d-flex justify-content-center align-items-center gap-2">
                  Current Index <Popper content="" />
                </p>
                <h3 className="card_value d-flex justify-content-center align-items-center gap-2">
                  {isConnecting ? (
                    <h5 className="placeholder-glow">
                      <span className="placeholder col-3"></span>
                    </h5>
                  ) : (
                    <h3 className="card_value">
                      {Math.round(index * 1000) / 1000} sBOC
                    </h3>
                  )}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
