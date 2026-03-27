import { useState } from "react";
  
function Toolbar({ filters, setFilters, records }) {

    const allCats = [...new Set(records?.map(r => r.Category))];
    // console.log(records,filters)
    return (
        <div className="exp-toolbar">

            {/* SEARCH */}
            <div className="exp-search-wrap">
                <svg className="exp-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    className="exp-search"
                    placeholder="Search transactions..."
                    value={filters.search}
                    onChange={(e) =>
                        setFilters(f => ({ ...f, search: e.target.value }))
                    }
                />
            </div>

            {/* FILTERS */}
            <div className="exp-filters">

                {/* CATEGORY */}
                <select
                    className="exp-select"
                    value={filters.Category}
                    onChange={(e) =>
                        setFilters(f => ({ ...f, Category: e.target.value }))
                    }
                >
                    <option value="All">All Categories</option>
                    {allCats.map(c => <option key={c}>{c}</option>)}
                </select>

                {/* SORT */}
                <select
                    className="exp-select"
                    value={filters.sortBy}
                    onChange={(e) =>
                        setFilters(f => ({ ...f, sortBy: e.target.value }))
                    }
                >
                    <option value="date">Sort: Date</option>
                    <option value="amount">Sort: Amount</option>
                </select>

            </div>
        </div>
    );
  }
export default Toolbar;