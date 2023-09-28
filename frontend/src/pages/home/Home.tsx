import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OmxHead } from "../../components/OmxHead/OmxHead";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <>
      <OmxHead />
    </>
  );
};
