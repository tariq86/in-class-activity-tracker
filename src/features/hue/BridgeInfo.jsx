import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHueLights,
  fetchHueHubInfo,
  fetchHueLightGroups,
} from "./hueSlice";
import HueHub from "./hue-hub";
import { showToast } from "../../global/alertFunctions";

export default function BridgeInfoPage() {
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [selectedLight, setSelectedLight] = useState(0);
  const dispatch = useDispatch();

  // Get all needed data from the store from the store
  const allLights = useSelector((state) => state.hue.lights);
  const allGroups = useSelector((state) => state.hue.groups);
  const bridgeConfig = useSelector((state) => state.hue.config);
  const bridgeApiUrl = useSelector((state) => state.hue.apiUrl);

  let isLoaded = false;
  if (Object.keys(bridgeConfig).length > 0) {
    isLoaded = true;
  }

  if (!isLoaded) {
    dispatch(fetchHueHubInfo());
    return (
      <div className="page container">
        <div className="card">
          <div className="card-content has-text-centered">
            <h1 className="title">Connecting...</h1>
          </div>
        </div>
      </div>
    );
  }

  const syncBridgeLights = async () => {
    dispatch(fetchHueLights());
  };

  const syncBridgeGroups = async () => {
    dispatch(fetchHueLightGroups());
  };

  const testBridgeConnection = async () => {
    if (selectedLight) {
      showToast("info", `I can't communicate with specific lights...yet :)`);
    }
    await new HueHub().flashLightGroup(selectedGroup);
  };

  const numGroups = Object.keys(allGroups).length;
  const numLights = Object.keys(allLights).length;

  const groupSelectOptions = Object.keys(allGroups).map((key) => (
    <option value={key} key={key}>
      {allGroups[key].name}
    </option>
  ));
  const lightSelectOptions = Object.keys(allLights).map((key) => (
    <option value={key} key={key}>
      {allLights[key].name}
    </option>
  ));
  return (
    <div className="page container">
      <div className="panel is-info">
        <div className="panel-heading has-text-centered">
          <h3>Hue Bridge Info</h3>
        </div>
        <div className="panel-block">
          <div className="column has-text-centered">
            <p>
              <strong>Bridge API URL:</strong>&nbsp;{bridgeApiUrl}
            </p>
          </div>
        </div>
        <div className="my-4">
          <div className="columns has-text-centered">
            <div className="column column">
              Total # of Lamps: <strong>{numLights}</strong>
              <br />
              <button
                name="test-group"
                onClick={syncBridgeLights}
                disabled={numLights > 0}
                className="button is-primary mt-2 is-large"
              >
                Sync Lamps
              </button>
            </div>
            <div className="column column">
              Total # of Groups: <strong>{numGroups}</strong>
              <br />
              <button
                name="test-group"
                onClick={syncBridgeGroups}
                disabled={numGroups > 0}
                className="button is-primary mt-2 is-large"
              >
                Sync Groups
              </button>
            </div>
          </div>
        </div>
        {numGroups === 0 && numLights === 0 && (
          <div className="columns">
            <div className="column has-text-centered">
              <small>
                Please click "Sync Groups" or "Sync Lamps" above to sync!
              </small>
            </div>
          </div>
        )}
        <div className="panel-block columns">
          {numLights > 0 && (
            <div className="column">
              <div className="select my-3 is-fullwidth is-large">
                <select
                  value={selectedLight}
                  onChange={(e) => setSelectedLight(e.target.value)}
                >
                  <option>Select a light to test with</option>
                  {lightSelectOptions}
                </select>
              </div>
            </div>
          )}
          {numGroups > 0 && (
            <div className="column">
              <div className="select my-3 is-fullwidth is-large">
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  disabled={numGroups === 0}
                >
                  <option>Select a group to test with</option>
                  {groupSelectOptions}
                </select>
              </div>
            </div>
          )}
        </div>
        <div className="panel-block">
          <button
            type="button"
            className="button is-warning is-large is-fullwidth"
            name="test-all"
            onClick={testBridgeConnection}
            disabled={selectedGroup === 0}
          >
            Test Bridge Connection
          </button>
        </div>
      </div>
    </div>
  );
}
