import { db } from "../base";
import { useAuth, useAccess } from "../components/handlers/UserContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBarCM from "../components/administrative/SearchBarCM";
const SearchCMPage = () => {
  const navigate = useNavigate();
  const access = useAccess();
  const currentUser = useAuth();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <SearchBarCM />
    </>
  );
};

export default SearchCMPage;
