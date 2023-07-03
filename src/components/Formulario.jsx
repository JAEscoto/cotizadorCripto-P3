import { useEffect, useState } from "react";

import styled from "@emotion/styled";
import Error from "./Error";

import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";

const InputSubmit = styled.input`
  background-color: #b961db;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 18px;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #7811a0;
    cursor: pointer;
  }
`;

const Formulario = ({ setMonedas }) => {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const [moneda, SelectMonedas] = useSelectMonedas("Elige la Moneda", monedas);
  const [criptoMoneda, SelectCriptoMoneda] = useSelectMonedas(
    "Elige la Cripto Moneda",
    criptos
  );

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const arrayCriptos = resultado.Data.map((cripto) => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return objeto;
      });
      setCriptos(arrayCriptos);
    };
    consultarAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([moneda, criptoMoneda].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setMonedas({
      moneda,
      criptoMoneda,
    });
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCriptoMoneda />
        {moneda}
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Formulario;
