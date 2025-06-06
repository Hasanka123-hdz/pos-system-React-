// src/components/TableOrderManager.js
import React, { useState } from "react";
import OrderSummary from "./OrderSummary";
import BottomBar from "./BottomBar";
import OtherServicesModal from "./OtherServicesModal";

const TableOrderManager = ({ onRefetchTables }) => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [refetchTablesFn, setRefetchTablesFn] = useState(null);
  const [isOtherServicesModalVisible, setIsOtherServicesModalVisible] = useState(false);
  const [bottomBarKey, setBottomBarKey] = useState(0); // Add key to force re-render

  const handleTableSelect = (table) => {
    setSelectedTable(table);
  };

  const handleRefetchTables = (fetchFn) => {
    setRefetchTablesFn(() => fetchFn);
    if (onRefetchTables) {
      onRefetchTables(fetchFn);
    }
  };

  const handleClearTable = () => {
    setSelectedTable(null);
  };

  const handleItemDeleted = (orderId) => {
    // Trigger a refresh of the BottomBar by changing its key
    setBottomBarKey(prevKey => prevKey + 1);
    
    // Also call refetchTables if available
    if (refetchTablesFn && typeof refetchTablesFn === 'function') {
      refetchTablesFn();
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <OrderSummary 
          selectedTable={selectedTable} 
          refetchTables={refetchTablesFn} 
          onClearTable={handleClearTable}
          onItemDeleted={handleItemDeleted}
        />
        <BottomBar 
          key={bottomBarKey} // Add key to force re-render when items are deleted
          onTableSelect={handleTableSelect} 
          onRefetchTables={handleRefetchTables}
          onOtherServicesClick={() => setIsOtherServicesModalVisible(true)}
        />
        <OtherServicesModal 
          visible={isOtherServicesModalVisible}
          onClose={() => setIsOtherServicesModalVisible(false)}
        />
      </div>
    </div>
  );
};

export default TableOrderManager;