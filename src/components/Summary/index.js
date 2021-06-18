import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import LineChart from "../Charts/LineChart";
import HighMaps from "../Charts/HighMaps";
import { getMapDataByCountryId } from "../../APIs";

export default function Summary({ selectedCountryId, report }) {
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    if (selectedCountryId) {
      if (selectedCountryId) {
        getMapDataByCountryId(selectedCountryId)
          .then((res) => {
            setMapData(res);
          })
          .catch((err) => console.log({ err }));
      }
    }
  }, [selectedCountryId]);

  return (
    <div style={{ height: "500px", marginTop: 10 }}>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineChart data={report} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <HighMaps mapData={mapData} />
        </Grid>
      </Grid>
    </div>
  );
}
