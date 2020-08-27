import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllLamps, setAllGroups } from './hueSlice';
import { flashHueLightGroup, getHueBridge, getHueLightGroups } from './hue-api';

export default function BridgeInfoPage() {
    const [activeBridge, setActiveBridge] = useState();
    const [selectedGroup, setSelectedGroup] = useState(0);
    const dispatch = useDispatch();

    // Get all needed data from the store from the store
    const allLamps = useSelector(state => state.hue.lamps);
    const allGroups = useSelector(state => state.hue.groups);
    useEffect(() => {
        const loadBridge = async () => {
            console.log('No bridge info loaded yet, loading bridge info now');
            const hueBridge = await getHueBridge();
            setActiveBridge(hueBridge);
        }
        if (!activeBridge) {
            loadBridge();
        }
    }, [activeBridge]);

    if (!activeBridge) {
        return (
            <div className="page container">
                <div className="card">
                    <div className="card-content has-text-centered">
                        <h1 className="title">Loading...</h1>
                    </div>
                </div>
            </div>
        );
    }

    const syncBridgeLights = async () => {
        const lamps = await activeBridge.getLamps();
        dispatch(setAllLamps(lamps));
    }

    const syncBridgeGroups = async () => {
        const groups = await getHueLightGroups();
        dispatch(setAllGroups(groups));
    }

    const testBridgeConnection = async () => {
        flashHueLightGroup(selectedGroup);
    }

    const numGroups = Object.keys(allGroups).length;

    const groupSelectOptions = Object.keys(allGroups).map(key => <option value={key} key={key}>{allGroups[key].name}</option>)
    return (
        <div className="page container">
            <div className="panel is-info">
                <div className="panel-heading has-text-centered">
                    <h3 className="title">Hue Bridge Info</h3>
                </div>
                <div className="panel-block">
                    <div className="column has-text-centered">
                        <p><strong>Bridge API URL:</strong>&nbsp;{activeBridge.baseApiUrl}</p>
                    </div>
                </div>
                <div className="my-4">
                    <div className="columns has-text-centered">
                        <div className="column column">
                            Total # of Lamps: <strong>{allLamps.length}</strong><br />
                            <button name="test-group"
                                onClick={syncBridgeLights}
                                disabled={allLamps.length > 0}
                                className="button is-primary mt-2">
                                Sync Lamps
                        </button>
                        </div>
                        <div className="column column">
                            Total # of Groups: <strong>{numGroups}</strong><br />
                            <button name="test-group"
                                onClick={syncBridgeGroups}
                                disabled={numGroups > 0}
                                className="button is-primary mt-2">
                                Sync Groups
                        </button>
                        </div>
                    </div>
                </div>
                {numGroups === 0 &&
                    <div className="columns">
                        <div className="column has-text-centered">
                            <small>Please click "Sync Groups" above to sync all light groups!</small>
                        </div>
                    </div>
                }
                <div className="panel-block">
                    <div className="select mx-3 my-3 is-fullwidth">
                        <select
                            value={selectedGroup}
                            onChange={e => setSelectedGroup(e.target.value)}
                            disabled={numGroups === 0}>
                            <option>Select a group to test with</option>
                            {groupSelectOptions}
                        </select>
                    </div>
                </div>
                <div className="panel-block">
                    <button type="button"
                        className="button is-warning is-large is-fullwidth"
                        name="test-all"
                        onClick={testBridgeConnection}
                        disabled={selectedGroup === 0}>
                        Test Bridge Connection
                    </button>
                </div>
            </div>
        </div>
    );
}
