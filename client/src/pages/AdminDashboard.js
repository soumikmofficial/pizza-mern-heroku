import React, { useState } from "react";
import styled from "styled-components";
import { AiFillDashboard } from "react-icons/ai";
import { BsTools } from "react-icons/bs";
import { motion } from "framer-motion";
import Dash from "../components/Dash";
import InventorySection from "../components/InventorySection";
import axios from "axios";
import { useQuery } from "react-query";

const buttonVariants = {
  visible: {
    color: "var(--col-accent)",
    scale: 0.9,
  },
};

const fetchDashboardData = async () => {
  const res = await axios.get("/api/v1/dashboard");
  return res.data;
};

const AdminDashboard = () => {
  const [panel, setPanel] = useState("dashboard");
  const { data, isLoading } = useQuery("dashboardData", fetchDashboardData, {
    refreshInterval: 1000 * 10,
    refetchIntervalInBackground: true,
  });

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  if (data) {
    const { verifiedUserCount, reviewCount, totalInventoryCount, totalSales } =
      data;

    return (
      <Container>
        <Sidebar>
          <Controller>
            <div className="dashboard-btn">
              <AiFillDashboard className="icon" />
              <motion.button
                whileTap="visible"
                variants={buttonVariants}
                onClick={() => setPanel("dashboard")}
              >
                dashboard
              </motion.button>
            </div>
            <div className="manage-btn">
              <BsTools className="icon" />
              <motion.button
                whileTap="visible"
                variants={buttonVariants}
                onClick={() => setPanel("inventory")}
              >
                Manage Inventory
              </motion.button>
            </div>
          </Controller>
          <Feature>
            <p>advertise</p>
          </Feature>
        </Sidebar>
        <MainBoard>
          {panel === "dashboard" ? (
            <Dash
              users={verifiedUserCount}
              reviews={reviewCount}
              inventory={totalInventoryCount}
              sales={totalSales}
            />
          ) : (
            <InventorySection />
          )}
        </MainBoard>
      </Container>
    );
  }
};

export default AdminDashboard;

const Container = styled.div`
  min-height: 90vh;
  width: 100%;
  color: white;
  display: flex;
`;

const Sidebar = styled.div`
  flex: 0.15;
  min-width: 190px;
  max-width: 250px;
  background: var(--col-pizza-grey);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 0;
`;

const Controller = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;

  & > div {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .icon {
    font-size: 1.6rem;
  }
  button {
    cursor: pointer;
    font-size: 1.5rem;
    background: none;
    border: none;
    color: white;
    text-transform: capitalize;

    &.active {
      color: var(--col-accent);
    }
  }
`;

const Feature = styled.div``;

const MainBoard = styled.div`
  flex: 0.85;
  background: var(--col-main);
  padding: 3rem;
`;

const Loading = styled.div`
  height: 90vh;
  width: 100vw;
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
