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
            console.log('Hue bridge:', hueBridge);
            setActiveBridge(hueBridge);
        }
        if (!activeBridge) {
            loadBridge();
        }
    }, [activeBridge]);

    if (!activeBridge) {
        return (
            <div className="page container">
                <div className="jumbotron text-center">
                    <h1>Loading...</h1>
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
            <div className="jumbotron text-center">
                <h3 className="display-4">Hue Bridge Info</h3>
                <hr className="my-4" />
                <p><strong>Bridge API URL:</strong>&nbsp;{activeBridge.baseApiUrl}</p>
                <hr className="my-4" />
                <div className="row text-center">
                    <div className="col-sm-12 col-md-6">
                        Total # of Lamps: <strong>{allLamps.length}</strong><br />
                        <button name="test-group"
                            onClick={syncBridgeLights}
                            disabled={allLamps.length > 0}
                            className="btn btn-primary mt-2">
                            Sync Lamps
                        </button>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        Total # of Groups: <strong>{numGroups}</strong><br />
                        <button name="test-group"
                            onClick={syncBridgeGroups}
                            disabled={numGroups > 0}
                            className="btn btn-primary mt-2">
                            Sync Groups
                        </button>
                    </div>
                </div>
                <hr className="my-4" />
                {numGroups === 0 &&
                    <div className="row">
                        <div className="col-sm-12">
                            <small>Please click "Sync Groups" above to sync all light groups!</small>
                        </div>
                    </div>
                }
                <div className="row">
                    <div className="col-sm-12">
                        <select className="custom-select custom-select-lg mb-3"
                            value={selectedGroup}
                            onChange={e => setSelectedGroup(e.target.value)}
                            disabled={numGroups === 0}>
                            <option>Select a group to test with</option>
                            {groupSelectOptions}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <button type="button"
                            className="btn btn-info btn-block"
                            name="test-all"
                            onClick={testBridgeConnection}
                            disabled={selectedGroup === 0}>
                            Test Bridge Connection
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
