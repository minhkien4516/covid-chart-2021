import { useCallback, useState } from "react";
import { useEffect } from "react";
import { getCountries, getReportByCountry } from "./APIs";
import "./App.css";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";
import { Container, Typography } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [report, setReport] = useState([]);
  useEffect(() => {
    getCountries().then((res) => {
      setCountries(res.data);

      setSelectedCountryId("vn");
    });
  }, []);

  const handleOnChange = useCallback((e) => {
    setSelectedCountryId(e.target.value);
  }, []);
  useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = countries.find(
        (country) => country.ISO2.toLowerCase() === selectedCountryId
      );

      getReportByCountry(Slug).then((res) => {
        res.data.pop();
        setReport(res.data);
      });
    }
  }, [countries, selectedCountryId]);

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h2" component="h2">
        Số liệu COVID-19
      </Typography>
      <CountrySelector
        value={selectedCountryId}
        countries={countries}
        handleOnChange={handleOnChange}
      />
      <Highlight report={report} />
      <Summary selectedCountryId={selectedCountryId} report={report} />
    </Container>
  );
}

export default App;
