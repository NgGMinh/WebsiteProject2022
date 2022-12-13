import React from "react";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

export default function MuiDatatable({ title, data, columns, options }) {
  
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
        <MUIDataTable
          title={
            <>
              <p
                style={{
                  textAlign: "left",
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  paddingTop: "15px"
                }}
              >
                {title}
              </p>
            </>
          }
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </CacheProvider>
  );
}
