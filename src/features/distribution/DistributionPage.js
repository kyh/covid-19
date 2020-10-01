import React, { useState, useMemo, useEffect } from "react";
import { set } from "d3-collection";
import { sum } from "d3-array";

import { useGetStatesDailyData } from "hooks/useGetStatesDailyData";
import { Loader } from "components/Loader";
import { PageContainer } from "components/PageContainer";
import { Map } from "components/Map";
import { formatDate, formatNumber, parseDate } from "utils/formatter";

export const DistributionPage = () => {
  const { raw, isLoading } = useGetStatesDailyData();

  const dates = useMemo(() => set(raw.map((s) => s.date)).values());
  const [sliderIndex, setSliderIndex] = useState(0);

  const [sliderInterval, setSliderInterval] = useState(null);

  // holds the date of the displayed day. calculated using the slider index
  const currentDate = useMemo(() => dates[sliderIndex], [dates, sliderIndex]);

  // holds the field we are currently viewing
  const [currentField, setCurrentField] = useState("positive");

  const [playing, setPlaying] = useState(false);

  // the data is joined to the stateJson in the Map child component and
  // updated using setJoinedData.
  // this is because we need access to the d3 Path used for calculating
  // the centroid of each state
  const [joinedData, setJoinedData] = useState(null);

  const getValue = useMemo(
    () => (d, field = currentField, normalized = false) =>
      ((d.properties.dailyData[currentDate] &&
        d.properties.dailyData[currentDate][field]) ||
        0) / (normalized ? d.properties.population / 1000000 : 1),
    [currentDate, currentField]
  );

  const sumTotalTestResults = useMemo(
    () =>
      joinedData &&
      sum(joinedData.features, (d) => getValue(d, "totalTestResults")),
    [joinedData, currentDate]
  );

  const sumPositive = useMemo(
    () =>
      joinedData && sum(joinedData.features, (d) => getValue(d, "positive")),
    [joinedData, currentDate]
  );

  const start = () => {
    if (sliderIndex === dates.length - 1) {
      setSliderIndex(0);
    }
    setSliderInterval(setInterval(() => setSliderIndex((i) => i + 1), 500));
  };

  const stop = () => {
    clearInterval(sliderInterval);
    setPlaying(false);
    setSliderInterval(null);
  };

  useEffect(() => {
    if (sliderIndex === dates.length - 1) {
      stop();
    }
  }, [sliderIndex]);

  useEffect(() => {
    if (playing && !sliderInterval) {
      start();
    } else {
      stop();
    }
  }, [playing]);

  const togglePlaying = () => setPlaying((p) => !p);

  return (
    <PageContainer>
      <div className="w-full">
        <h3 className="text-xs uppercase text-gray-400 mb-1 font-semibold">
          The Spread of COVID-19 in the US
        </h3>
        <div className="map-dek">
          <h2>{formatDate(parseDate(currentDate))}</h2>
          <div>
            <div>
              <span>{formatNumber(sumTotalTestResults)}</span>{" "}
              <span>total tests</span>
            </div>
            <div>
              <span>{formatNumber(sumPositive)}</span>{" "}
              <span>positive tests</span>
            </div>
          </div>
          <div className="map-time-scrubber">
            <div className="map-start-stop-controls">
              <div
                className={`map-start-stop ${playing ? "stop" : "start"}`}
                onClick={() => togglePlaying()}
                onKeyDown={() => togglePlaying()}
                role="switch"
                label={playing ? "stop" : "start"}
                aria-checked={playing}
                tabIndex={0}
              />
              <input
                onChange={(event) =>
                  setSliderIndex(parseInt(event.target.value, 10))
                }
                min={0}
                max={dates.length - 1}
                value={sliderIndex}
                type="range"
              />
            </div>
            <div className="map-start-stop-label">
              <div className="column">{formatDate(parseDate(dates[0]))}</div>
              <div className="column">
                {formatDate(parseDate(dates[dates.length - 1]))}
              </div>
            </div>
          </div>
        </div>
        {isLoading ? (
          <Loader width="100%" height="600">
            <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
          </Loader>
        ) : (
          <Map
            rawStateData={raw}
            setJoinedData={setJoinedData}
            getValue={getValue}
            currentDate={currentDate}
            currentField={currentField}
            useChoropleth={false}
          />
        )}
      </div>
    </PageContainer>
  );
};
