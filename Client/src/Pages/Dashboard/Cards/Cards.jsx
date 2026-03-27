import React from 'react'
import "../../../components/Css/Dashboard/card.css"
const Cards = () => {
  return (
      <>
          <div className="cards">

              <div className="stat-card">
                  <div className="card-top">
                      <div className="icon purple">💰</div>
                      <span>Total Income</span>
                  </div>

                  <div className="card-bottom">
                      <h2>$38,000</h2>
                      <span className="badge green">+12%</span>
                  </div>
              </div>

              <div className="stat-card">
                  <div className="card-top">
                      <div className="icon purple">💳</div>
                      <span>Total Expenses</span>
                  </div>

                  <div className="card-bottom">
                      <h2>$16,400</h2>
                      <span className="badge green">+8%</span>
                  </div>
              </div>

              <div className="stat-card">
                  <div className="card-top">
                      <div className="icon purple">📊</div>
                      <span>Net Balances</span>
                  </div>

                  <div className="card-bottom">
                      <h2>$21,600</h2>
                  </div>
              </div>

              <div className="stat-card">
                  <div className="card-top">
                      <div className="icon purple">📦</div>
                      <span>Total Transactions</span>
                  </div>

                  <div className="card-bottom">
                      <h2>20</h2>
                  </div>
              </div>

          </div>
      </>
  )
}

export default Cards