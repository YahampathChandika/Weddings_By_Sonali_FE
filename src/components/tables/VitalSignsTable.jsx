import React, { useState, useEffect } from "react";
import { Table } from "rsuite";
import { useGetPatientVitalsIdQuery } from "../../store/api/patientApi";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function VitalSignsTable({ startDate, endDate }) {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const { Column, HeaderCell, Cell } = Table;
  const { id } = useParams();
  const { data: vitalData, isLoading, error } = useGetPatientVitalsIdQuery(id);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const getData = () => {
    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    if (isLoading || !vitalData) {
      return [];
    }

    // Filter data based on date range
    const filteredData = vitalData.payload.filter((item) => {
      const itemDate = moment(item.date, "YYYY-MM-DD");
      const isAfterStartDate = startDate
        ? itemDate.isSameOrAfter(moment(startDate))
        : true;
      const isBeforeEndDate = endDate
        ? itemDate.isSameOrBefore(moment(endDate))
        : true;
      return isAfterStartDate && isBeforeEndDate;
    });

    // Sort data if sortColumn and sortType are specified
    if (sortColumn && sortType) {
      filteredData.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];

        if (typeof x === "string") {
          x = x.toLowerCase();
        }
        if (typeof y === "string") {
          y = y.toLowerCase();
        }

        if (x < y) {
          return sortType === "asc" ? -1 : 1;
        }
        if (x > y) {
          return sortType === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const handleOnRowClick = (rowIndex) => {
    console.log(rowIndex);
  };

  return (
    <Table
      height={420}
      data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
      onRowClick={handleOnRowClick}
      headerHeight={70}
    >
      <Column flexGrow={100} align="center" fixed sortable>
        <HeaderCell align="center">Date</HeaderCell>
        <Cell align="center" dataKey="date" />
      </Column>

      <Column flexGrow={100} align="center" fixed sortable>
        <HeaderCell align="center">Time</HeaderCell>
        <Cell align="center" dataKey="time" />
      </Column>

      <Column flexGrow={100} fixed sortable>
        <HeaderCell align="center">Heart Rate</HeaderCell>
        <Cell align="center" dataKey="heartRate" />
      </Column>
      <Column flexGrow={100} fixed sortable>
        <HeaderCell align="center">
          Repository <br /> Rate
        </HeaderCell>
        <Cell align="center" dataKey="respiratoryRate" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell align="center">
          Supplemental <br /> O2
        </HeaderCell>
        <Cell align="center" dataKey="supplementedO2" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell align="center">
          Saturation <br /> O2
        </HeaderCell>
        <Cell align="center" dataKey="O2saturation" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell align="center">
          Systolic <br /> BP
        </HeaderCell>
        <Cell align="center" dataKey="systolicBP" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell align="center">
          Diastolic <br /> BP
        </HeaderCell>
        <Cell align="center" dataKey="diastolicBP" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell align="center">Temperature</HeaderCell>
        <Cell align="center" dataKey="temperature" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell align="center">LOC</HeaderCell>
        <Cell align="center" dataKey="avpuScore" />
      </Column>

      <Column flexGrow={80}>
        <HeaderCell align="center">Actions</HeaderCell>
        <Cell align="right">
          <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 cursor-pointer">
            edit
          </span>
          <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-red mr-3 cursor-pointer">
            delete
          </span>
        </Cell>
      </Column>
    </Table>
  );
}
