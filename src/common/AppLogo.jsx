import React from 'react';
import FontIcon from './FontIcon';
import { faClock } from '@fortawesome/free-solid-svg-icons';

export default function AppLogo(props) {
    return (
        <FontIcon className="app-logo has-text-primary"
            {...props}
            icon={faClock} />
    );
}